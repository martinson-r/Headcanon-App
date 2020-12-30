const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Fic, FicShelf, ReadStatus, ReadJoin, Author, Review, AuthorList, FicList, ListJoin, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const fetchReviews = await Review.findAll({
        include: [Fic]
     });
     return res.json(fetchReviews);
}));

router.post('/:id/addreview', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const {review, rating } = req.body;
    const { user } = req;
    const userId = user.id;

    const reviewToAddToDatabase = await Review.build({userId, ficId: id, rating, review
        });
          await reviewToAddToDatabase.save();
          const fetchFicToFind = await Fic.findOne({
            where: { id },
           include: [ LinkList, Review, Author, ListJoin ]
        });
        return res.json(fetchFicToFind);
}));

module.exports = router;
