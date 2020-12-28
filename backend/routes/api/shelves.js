const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, Fic, Author, Website, FicShelf, FicList, ListJoin, AuthorList, LinkList } = require('../../db/models');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async(req, res) => {
    const {user} = req;
    const userId = user.id;
    console.log('USER OBJECT NOW', userId);
    if (user) {
        const fetchShelves = await FicList.findAll({
            where: { userId },
        });

        console.log('FETCH SHELVES', fetchShelves);
        return res.json(fetchShelves);
    }

}));

router.get('/:id', requireAuth, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const fetchSingleShelf = await FicList.findOne({
        where: { id },
        include: [
            {
                model: Fic,
                include: [Review]
            }
        ]
    });
    return res.json(fetchSingleShelf);
}))

router.delete('/:id', requireAuth, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const fetchListJoin = await ListJoin.findOne({
        where: { ficListId: id },
    });
    const fetchSingleShelf = await FicList.findByPk(id);

    if (fetchListJoin) {
        await fetchListJoin.destroy();
    }
    await fetchSingleShelf.destroy();
    return res.json('ListJoin and shelf deleted');
}))

router.post('/create', requireAuth, asyncHandler(async(req, res) => {
    const {listName } = req.body;
    const { user } = req;
    const userId = user.id;
    const newList = await FicList.build( {
        listName,
        userId,
        });
    await newList.save();
    return res.json(newList);
}))



module.exports = router;
