const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Fic, Author, Website, AuthorList, FicList, ListJoin, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');

const router = express.Router();

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.get('/', asyncHandler(async(req, res) => {
    const fetchFics = await Fic.findAll({
       include: [Author, Website]
    });
    console.log(fetchFics);
    return res.json(fetchFics);
}))

router.delete('/:id', asyncHandler(async(req, res) => {
    const {ficId, listId} = req.body;
    console.log('ficId', ficId)
    const fetchFicToRemove = await ListJoin.findOne({
        where: { ficId,
                ficListId: listId },
    });
    await fetchFicToRemove.destroy();
    return res.json("Fic removed");
}))

router.delete('/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const fetchSingleFic = await Fic.findOne({
        where: { id },
       include: [Author, Website]
    });
    console.log(fetchSingleFic);
    return res.json(fetchSingleFic);
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
        console.log(listToUpdate.id);
    const ficListId = listToUpdate.id;
    console.log('*******listid*******', ficListId)
    const ficToAdd = await Fic.findByPk(ficId);

    if (ficListId && ficToAdd) {
       const newListEntry =  await ListJoin.build({
                ficId,
                ficListId,
        });
        await newListEntry.save();
    }

    const updatedList = await FicList.findOne({
        where: {
            id: ficListId
        }
    });
    res.json(updatedList);
}))





module.exports = router;
