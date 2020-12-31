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

router.get('/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const fetchReview = await Review.findByPk(id);
     return res.json(fetchReview);
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
           include: [ LinkList, {model: Review, include:
            User
         }, Author, ListJoin ]
        });
        return res.json(fetchFicToFind);
}));

router.put('/:id/edit', restoreUser, asyncHandler(async(req, res) => {
    const id = req.params.id;
    const {review, rating } = req.body;
    const { user } = req;
    const userId = user.id;

    const reviewToEdit = await Review.findOne({
        where: {
            userId: userId,
            id
        }
    })

    if (reviewToEdit) {
        await reviewToEdit.update({rating, review
        });
        const ficId = reviewToEdit.ficId;

        const fetchFicToFind = await Fic.findOne({
            where: { id: ficId },
           include: [ LinkList, {model: Review, include:
            User
         }, Author, ListJoin ]
        });
        return res.json(fetchFicToFind);
    }

}));

module.exports = router;
