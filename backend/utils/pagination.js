const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * size : 0;
    return { limit, offset };
  };

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
  };

  module.exports = { getPagination, getPagingData }
