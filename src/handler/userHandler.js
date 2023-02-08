const { nanoid } = require('nanoid');
const users = require('../data/user');

const getAllUserDataHandler = () => ({
  status: 'success',
  data: {
    users,
  },
});

const getUserByIdHandler = (request, h) => {
  const { userId } = request.params;
  const index = users.findIndex((user) => user.userId === userId);

  if (index !== -1) {
    return {
      status: 'success',
      data: users[index],
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'User tidak ditemukan',
  });

  response.code(404);
  return response;
};

const addUserHandler = (request, h) => {
  const {
    username, email, password, phoneNumber, address,
  } = request.payload;
  const userId = nanoid(16);
  const createdAt = new Date().toISOString();

  const newUser = {
    username, email, password, phoneNumber, address, userId, createdAt,
  };

  users.push(newUser);

  const isSuccess = users.filter((user) => user.userId === userId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'user berhasil ditambahkan',
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'user gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const updateUserHandler = (request, h) => {
  const { userId } = request.params;
  const {
    username, password, phoneNumber, address,
  } = request.payload;
  const index = users.findIndex((user) => user.userId === userId);

  if (index !== -1) {
    users[index] = {
      ...users[index],
      username,
      password,
      phoneNumber,
      address,
    };

    const response = h.response({
      status: 'success',
      message: 'user berhasil diubah',
      data: users[index],
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'user gagal diubah',
  });

  response.code(404);
  return response;
};

const deleteUserByIdHandler = (request, h) => {
  const { userId } = request.params;
  const index = users.findIndex((user) => user.userId === userId);

  if (index !== -1) {
    users.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'user berhasil dihapus',
      data: {
        userId,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'data gagal dihapus',
  });

  response.code(404);
  return response;
};

module.exports = {
  getAllUserDataHandler,
  getUserByIdHandler,
  addUserHandler,
  updateUserHandler,
  deleteUserByIdHandler,
};
