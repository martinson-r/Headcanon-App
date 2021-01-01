const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Op } = require("sequelize");

const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { User, Fic, FicShelf, Author, Review, AuthorList, FicList, ListJoin, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');

const router = express.Router();


router.post('/', asyncHandler(async(req, res) => {
const { query } = req.body;
const searchFics = await Fic.findAll({
    where: {
        [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { synopsis: { [Op.iLike]: `%${query}%` } }
          ]
    },
    include: [Author]
  });
  res.json(searchFics);
  console.log('SEARCHFICS', searchFics);
}));

  module.exports = router;
