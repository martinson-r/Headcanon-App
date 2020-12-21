const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Fic, Author, Website, FicShelf, FicList, ListJoin, AuthorList, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');
//const user = require('../../db/models/user');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async(req, res) => {
    console.log('USER NOW', req.user);
    const {user} = req;
    const userId = user.id;
    console.log('USER OBJECT NOW', userId);
    const fetchShelves = await FicList.findAll({
        where: { userId },
    });

    console.log('FETCH SHELVES', fetchShelves);
    return res.json(fetchShelves);
}));

router.get('/:id', requireAuth, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const fetchSingleShelf = await FicList.findOne({
        where: { id },
        include: [Fic]
    });
    console.log(fetchSingleShelf);
    return res.json(fetchSingleShelf);
}))

router.post('/create', requireAuth, asyncHandler(async(req, res) => {
    const {listName } = req.body;
    const { user } = req;
    const userId = user.id;
    const newList = await FicList.build( {
        listName,
        userId,
        privateStatus: false,
        readStatus: false,
        });
    await newList.save();
    return res.json(newList);
}))

module.exports = router;
