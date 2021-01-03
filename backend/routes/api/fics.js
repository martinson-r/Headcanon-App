const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { User, Fic, FicShelf, Author, Review, AuthorList, FicList, ListJoin, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');
const { getPagination, getPagingData } = require("../../utils/pagination");

const router = express.Router();

const validateSubmission = [
    check("authorName")
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Please provide an author name."),
    check("link")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a link to the fanfic."),
      check("link")
      .contains('http', { ignoreCase: true})
      .withMessage("Please provide a valid link format. Example: http://fanfiction.net/afanfic"),
      check("title")
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Please provide a title."),
    check("synopsis")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a short synopsis."),
    check("synopsis")
      .isLength({ max: 1000 })
      .withMessage("Please provide a synopsis of less than 1000 characters."),
    check("synopsis")
      .isLength({ min: 25 })
      .withMessage("Please provide a synopsis of at least 25 characters."),
    handleValidationErrors,
  ];

router.get('/', asyncHandler(async(req, res) => {
        const fetchFics = await Fic.findAll({
            order: [['updatedAt', 'DESC']],
            include: [Author, LinkList, {model: Review, include:
                User
             }, ListJoin]
         });
         return res.json(fetchFics);
}))

router.delete('/:id', asyncHandler(async(req, res) => {
    const {ficId, listId} = req.body;

    const fetchFicToRemove = await ListJoin.findOne({
        where: {
                ficListId: listId,
                ficId },
    });
    await fetchFicToRemove.destroy();
    return res.json("Fic removed");
}))

router.get('/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const fetchFicToFind = await Fic.findOne({
        where: { id },
       include: [ LinkList, {model: Review, include:
           User
        }, Author, ListJoin ]
    });
    return res.json(fetchFicToFind);
}))

router.put('/:id/edit', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const { user } = req;
    const userId = user.id;
    const { readStatus } = req.body;
    const fetchFicToUpdate = await ListJoin.findOne({
        where: { ficId: id },
    });

    if (fetchFicToUpdate) {
        await fetchFicToUpdate.update({
            readStatus
        });
    }

    const fetchFicToFind = await Fic.findOne({
        where: { id },
       include: [ LinkList, Review, Author, ListJoin ]
    });
    return res.json(fetchFicToFind);
}))

router.post('/:id/addtoshelf', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const {shelfName, ficId } = req.body;
    const { user } = req;
    const userId = user.id;
    const shelfToUpdate = await FicShelf.findOne( {
        where: {
            shelfName,
            userId,
        }
        });
    const ficShelfId = shelfToUpdate.id;
    const ficToAdd = await Fic.findByPk(ficId);

    if (ficShelfId && ficToAdd ) {
        const newListEntry =  await FicList.build({
            ficShelfId: ficShelfId,
            ficId: ficId,
            readStatus: false,
            privateStatus: false
    });
        await newListEntry.save();

        const getListId = await FicList.findOne({
            where: {
                ficShelfId: ficShelfId
            }
        });


        const newFicListId = getListId.id;

        const newListJoin = await ListJoin.build({
            ficListId: newFicListId,
            ficShelfId,
            ficId,
            userId,
            readStatus: false,
            privateStatus: false,
        });

        await newListJoin.save();

        const updatedList = await FicList.findAll({
            where: { ficShelfId },
            include: { model: Fic, through: [ListJoin], include: [Review, { model: Author, through: [AuthorList]}]},
        })
        return res.json(updatedList);
    }
}));

router.post('/create',
validateSubmission,
asyncHandler(async(req, res) => {
    const { authorName, link, title, synopsis } = req.body;

    const ficToAddToDatabase = await Fic.build({link, title, synopsis,
    Authors: { authorName },
    LinkLists: { link },
    }, {
        include: [ Author, LinkList, ListJoin ]
      });

      await ficToAddToDatabase.save();
      return res.json(ficToAddToDatabase);

}));

// router.post('/paginated', restoreUser, asyncHandler(async(req, res) => {
//     const { page, size } = req.body;
//     const { limit, offset } = getPagination(page, size);

//     const fetchPaginatedFics = await Fic.findAndCountAll({
//         limit,
//         offset,
//         order: [['updatedAt', 'DESC']],
//         include: [Author, LinkList, {model: Review, include:
//             User
//          }, ListJoin]
//      });
//      return res.json(fetchPaginatedFics);
// }))




module.exports = router;
