const { nanoid } = require('nanoid');
const reviews = require('../data/review');

const getAllReviewsHandler = () => ({
  status: 'success',
  data: {
    reviews,
  },
});

const getReviewByIdHandler = (request, h) => {
  const { reviewId } = request.params;
  const index = reviews.findIndex((review) => review.reviewId === reviewId);

  if (index !== -1) {
    return {
      status: 'success',
      data: reviews[index],
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'review tidak ditemukan',
  });

  response.code(404);
  return response;
};

const addReviewHandler = (request, h) => {
  const { rate, description } = request.payload;
  const reviewId = nanoid(16);
  const createdAt = new Date().toISOString();

  const newReview = {
    reviewId, rate, description, createdAt,
  };

  reviews.push(newReview);

  const isSuccess = reviews.filter((review) => review.reviewId === reviewId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'review berhasil ditambahkan',
      data: newReview,
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'review gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const updateReviewByIdHandler = (request, h) => {
  const { reviewId } = request.params;
  const { rate, description } = request.payload;
  const index = reviews.findIndex((review) => review.reviewId === reviewId);

  if (index !== -1) {
    reviews[index] = {
      ...reviews[index],
      rate,
      description,
    };

    const response = h.response({
      status: 'success',
      message: 'review berhasil diubah',
      data: reviews[index],
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'review gagal diubah',
  });

  response.code(500);
  return response;
};

const deleteReviewByIdHandler = (request, h) => {
  const { reviewId } = request.params;
  const index = reviews.findIndex((review) => review.reviewId === reviewId);

  if (index !== -1) {
    reviews.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'review berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'review gagal dihapus',
  });

  response.code(404);
  return response;
};

module.exports = {
  getAllReviewsHandler,
  getReviewByIdHandler,
  addReviewHandler,
  updateReviewByIdHandler,
  deleteReviewByIdHandler,
};
