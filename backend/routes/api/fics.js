const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Fic, FicShelf, ReadStatus, ReadJoin, Author, Review, AuthorList, FicList, ListJoin, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
        const { user } = req;

        const fetchFics = await Fic.findAll({
            include: [Author, LinkList, Review, ListJoin]
         });
         return res.json(fetchFics);


    // if (user !== undefined ) {
    //     const userId = user.id;
    //     const fetchFics = await Fic.findAll({
    //         include: [Author, LinkList, Review]
    //      });
    //      return res.json(fetchFics);
    // }
    // const fetchFics = await Fic.findAll({
    //     include: [Author, LinkList, Review]
    //  });

    //  return res.json(fetchFics);
}))

router.delete('/:id', restoreUser, asyncHandler(async(req, res) => {
    const {ficId, listId} = req.body;

    const fetchFicToRemove = await ListJoin.findOne({
        where: {
                ficListId: listId,
                ficId },
    });
    await fetchFicToRemove.destroy();
    return res.json("Fic removed");
}))

router.get('/:id', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const { user } = req;
    const userId = user.id;
    const fetchFicToFind = await Fic.findOne({
        where: { id },
       include: [ LinkList, Review, Author, ListJoin ]
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

    // console.log('FETCHFICTORETURN*****', fetchFicToReturn)
    // return res.json(fetchFicToReturn);
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
            userId
        });

        await newListJoin.save();

        const ficListId = newListEntry.id;
        const updatedList = await FicList.findAll({
        where: {
            ficShelfId
        }
    });
    res.json(updatedList);
    }

}));

router.post('/create', asyncHandler(async(req, res) => {
    const { authorName, link, title, synopsis } = req.body;
    const ficToAddToDatabase = await Fic.build({link, title, synopsis,
    Authors: { authorName },
    LinkLists: { link },
    }, {
        include: [ Author, LinkList ]
      });
      await ficToAddToDatabase.save();
      res.json(ficToAddToDatabase);
}));





module.exports = router;
