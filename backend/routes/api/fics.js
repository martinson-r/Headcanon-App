const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Fic, ReadStatus, ReadJoin, Author, Review, AuthorList, FicList, ListJoin, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');

const router = express.Router();

router.get('/', restoreUser, asyncHandler(async(req, res) => {
    // const { user } = req;
    // if (user) {
    //     const userId = user.id;
    //     const fetchFics = await Fic.findAll({
    //         include: [Author, {model: ReadStatus, where: {userId} }, LinkList, Review]
    //      });
    //      console.log(fetchFics);
    //      return res.json(fetchFics);
    // }

    const { user } = req;

    if (user !== undefined ) {
        const userId = user.id;
        console.log("HIT USER PATH");
        const fetchFics = await Fic.findAll({
            include: [Author, LinkList, Review]
         });
         console.log(fetchFics);
         return res.json(fetchFics);
    }
    const fetchFics = await Fic.findAll({
        include: [Author, LinkList, Review]
     });
     console.log(fetchFics);
     return res.json(fetchFics);
}))

router.delete('/:id', requireAuth, asyncHandler(async(req, res) => {
    const {ficId, listId} = req.body;
    const fetchFicToRemove = await ListJoin.findOne({
        where: { ficId,
                ficListId: listId },
    });
    await fetchFicToRemove.destroy();
    return res.json("Fic removed");
}))

router.get('/:id', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const { user } = req;
    console.log('USER', user)
    const userId = user.id;
    console.log('USERID', userId)
    const fetchFicToFind = await Fic.findOne({
        where: { id },
       include: [Author, LinkList, Review, { model: ReadStatus, through: { model: ReadJoin, where: {userId}}}]
    });
    return res.json(fetchFicToFind);
}))

router.put('/:id/edit', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const { user } = req;
    const userId = user.id;
    const { readStatus } = req.body;
    const fetchFicToUpdate = await Fic.findOne({
        where: { id },
       include: [Author, LinkList, ReadStatus]
    });
    console.log(fetchFicToUpdate);

    if (fetchFicToUpdate) {
        await fetchFicToUpdate.update({
            readStatus
        });
    }
    return res.json(fetchFicToUpdate);
}))

router.post('/:id/addtoshelf', requireAuth, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const {listName, ficId } = req.body;
    console.log(listName);
    const { user } = req;
    const userId = user.id;
    const listToUpdate = await FicList.findOne( {
        where: {
            listName,
            userId,
        }
        });
    const ficListId = listToUpdate.id;
    const ficToAdd = await Fic.findByPk(ficId);

    if (ficListId && ficToAdd) {
       const newListEntry =  await ListJoin.build({
                ficId,
                ficListId,
        });
        await newListEntry.save();
    }

    const addReadStatus = await ReadStatus.build({
        readStatus: false,
        privateStatus: false,
     });
     await addReadStatus.save();

     const addReadJoin = await ReadJoin.build({
         userId,
         listId,
         ficId
     });
     await addReadJoin.save();

    const updatedList = await FicList.findOne({
        where: {
            id: ficListId
        }
    });
    res.json(updatedList);
}));

router.post('/create', requireAuth, asyncHandler(async(req, res) => {
    const { user } = req;
    const userId = user.id;
    const { authorName, link, title, synopsis } = req.body;
    const ficToAddToDatabase = await Fic.build({link, title, synopsis,
    Authors: {authorName},
    LinkLists: { link },
    }, {
        include: [ Author, LinkList ]
      });
      await ficToAddToDatabase.save();
}));





module.exports = router;
