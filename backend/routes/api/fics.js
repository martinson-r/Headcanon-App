const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Fic, Author, AuthorList } = require('../../db/models');
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
       include: Author, through: { AuthorList, attributes: ['authorName'] }
    });
    console.log(fetchFics);
    return res.json(fetchFics);
}))




module.exports = router;
