const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;



// ===============================
// Generate Pagination Query
// ===============================
const getPagination = (
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT
) => {


  const currentPage =
    Number(page) > 0
      ? Number(page)
      : DEFAULT_PAGE;



  const perPage =
    Number(limit) > 0
      ? Number(limit)
      : DEFAULT_LIMIT;



  return {

    page: currentPage,

    limit: perPage,

    skip:
      (currentPage - 1) * perPage

  };

};





// ===============================
// Generate Pagination Metadata
// ===============================
const getPaginationMeta = (
  total,
  page,
  limit
) => {


  return {

    total,

    page,

    limit,

    pages:
      Math.ceil(total / limit)

  };

};





module.exports = {
  getPagination,
  getPaginationMeta
};