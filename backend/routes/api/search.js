const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../../utils/pagination");

const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { User, Fic, FicShelf, Author, Review, AuthorList, FicList, ListJoin, LinkList } = require('../../db/models');
const authorlist = require('../../db/models/authorlist');

const router = express.Router();


router.post('/', asyncHandler(async(req, res) => {
const { query, page, size } = req.body;
const { limit, offset } = getPagination(page, size);
const searchFics = await Fic.findAndCountAll({

  where: {
        [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { synopsis: { [Op.iLike]: `%${query}%` } },
             { '$Authors.authorName$': { [Op.iLike]: `%${query}%` } },
             limit,
            offset,
          ]
    },
     include: [
       {
        model: Author,
        required: false,
    },
  { model: Review,
  required: false}],
  });
  res.json(searchFics);
  console.log('SEARCHFICS', searchFics);
}));

  module.exports = router;
