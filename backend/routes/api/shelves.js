const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Review, Fic, Author, Website, FicShelf, FicList, ListJoin, AuthorList, LinkList } = require('../../db/models');
const fic = require('../../db/models/fic');

const router = express.Router();

router.get('/', restoreUser, asyncHandler(async(req, res) => {
    const { user } = req;
    const userId = user.id;
    if (user) {
        const fetchShelves = await FicShelf.findAll({
            where: { userId }
        });
        return res.json(fetchShelves);
    }
}));

router.get('/:id', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const fetchSingleShelf = await FicList.findAll({
        where: { ficShelfId: id },
         include: { model: Fic, through: [ListJoin], include: [Review, { model: Author, through: [AuthorList]}]}},
    );
    return res.json(fetchSingleShelf);
}))

router.put('/:id/edit', restoreUser, asyncHandler(async(req, res) => {
    const { shelfName } = req.body;
    const id = req.params.id;
    const fetchSingleShelf = await FicShelf.findOne({
        where: { id },
    });
    if (fetchSingleShelf) {
        await fetchSingleShelf.update({
            shelfName
        });

        const fetchShelf = await FicList.findAll({
            where: { ficShelfId: id },
             include: { model: Fic, through: [ListJoin], include: [Review, { model: Author, through: [AuthorList]}]}},
        );
        return res.json(fetchShelf);
    }
}))

router.delete('/:id', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;

    const fetchList = await FicList.findAll({
        where: { ficShelfId: id}
    })

    const fetchShelf = await FicShelf.findOne({
        where: { id },
    });

    if (fetchShelf) {
        await fetchShelf.destroy();
    }

    return res.json('Shelf deleted');
}))

router.post('/create', restoreUser, asyncHandler(async(req, res) => {
    const { listName } = req.body;
    const { user } = req;
    const userId = user.id;
    const newShelf = await FicShelf.build({
        shelfName: listName,
        userId,
        });
    await newShelf.save();

    return res.json(newShelf);
}))



module.exports = router;
