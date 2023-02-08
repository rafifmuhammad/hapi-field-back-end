const {
  getAllUserDataHandler,
  getUserByIdHandler,
  addUserHandler,
  updateUserHandler,
  deleteUserByIdHandler,
} = require('./handler/userHandler');

const {
  getAllOwnersHandler,
  getOwnerByIdHandler,
  addOwnerHandler,
  updateOwnerByIdHandler,
  deleteOwnerByIdHandler,
} = require('./handler/ownerHandler');

const {
  getAllFieldsHandler,
  getFieldByIdHandler,
  addFieldHandler,
  updateFieldByIdHandler,
  deleteFieldByIdHandler,
} = require('./handler/fieldHandler');

const {
  getAllChatsHandler,
  addChatHandler,
  deleteChatByIdHandler,
} = require('./handler/chatHandler');

const {
  getAllReviewsHandler,
  getReviewByIdHandler,
  addReviewHandler,
  updateReviewByIdHandler,
  deleteReviewByIdHandler,
} = require('./handler/reviewHandler');

const {
  getAllRentsHandler,
  getRentByIdHandler,
  addRentHandler,
  deleteRentByIdHandler,
} = require('./handler/rentHandler');

const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: getAllUserDataHandler,
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: getUserByIdHandler,
  },
  {
    method: 'POST',
    path: '/users',
    handler: addUserHandler,
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    handler: updateUserHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: deleteUserByIdHandler,
  },
  {
    method: 'GET',
    path: '/owner',
    handler: getAllOwnersHandler,
  },
  {
    method: 'GET',
    path: '/owner/{ownerId}',
    handler: getOwnerByIdHandler,
  },
  {
    method: 'POST',
    path: '/owner',
    handler: addOwnerHandler,
  },
  {
    method: 'PUT',
    path: '/owner/{ownerId}',
    handler: updateOwnerByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/owner/{ownerId}',
    handler: deleteOwnerByIdHandler,
  },
  {
    method: 'GET',
    path: '/field',
    handler: getAllFieldsHandler,
  },
  {
    method: 'GET',
    path: '/field/{fieldId}',
    handler: getFieldByIdHandler,
  },
  {
    method: 'POST',
    path: '/field',
    handler: addFieldHandler,
  },
  {
    method: 'PUT',
    path: '/field/{fieldId}',
    handler: updateFieldByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/field/{fieldId}',
    handler: deleteFieldByIdHandler,
  },
  {
    method: 'GET',
    path: '/chat',
    handler: getAllChatsHandler,
  },
  {
    method: 'POST',
    path: '/chat',
    handler: addChatHandler,
  },
  {
    method: 'DELETE',
    path: '/chat/{messageId}',
    handler: deleteChatByIdHandler,
  },
  {
    method: 'GET',
    path: '/reviews',
    handler: getAllReviewsHandler,
  },
  {
    method: 'GET',
    path: '/reviews/{reviewId}',
    handler: getReviewByIdHandler,
  },
  {
    method: 'POST',
    path: '/reviews',
    handler: addReviewHandler,
  },
  {
    method: 'PUT',
    path: '/reviews/{reviewId}',
    handler: updateReviewByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/reviews/{reviewId}',
    handler: deleteReviewByIdHandler,
  },
  {
    method: 'GET',
    path: '/rents',
    handler: getAllRentsHandler,
  },
  {
    method: 'GET',
    path: '/rents/{rentId}',
    handler: getRentByIdHandler,
  },
  {
    method: 'POST',
    path: '/rents',
    handler: addRentHandler,
  },
  {
    method: 'DELETE',
    path: '/rents/{rentId}',
    handler: deleteRentByIdHandler,
  },
];

module.exports = routes;
