const { nanoid } = require('nanoid');
const owners = require('../data/owner');

const getAllOwnersHandler = () => ({
  status: 'success',
  data: {
    owners,
  },
});

const getOwnerByIdHandler = (request, h) => {
  const { ownerId } = request.params;
  const index = owners.findIndex((owner) => owner.ownerId === ownerId);

  if (index !== -1) {
    return ({
      status: 'success',
      data: owners[index],
    });
  }

  const response = h.response({
    status: 'fail',
    message: 'owner tidak ditemukan',
  });

  response.code(404);
  return response;
};

const addOwnerHandler = (request, h) => {
  const {
    username, fullName, email, password, dateOfBirth, address, phoneNumber, isVerif,
  } = request.payload;
  const ownerId = nanoid(16);

  const newOwner = {
    username, fullName, email, password, dateOfBirth, address, phoneNumber, isVerif, ownerId,
  };

  owners.push(newOwner);

  const isSuccess = owners.filter((owner) => owner.ownerId === ownerId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'owner berhasil ditambahkan',
      data: newOwner,
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'owner gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const updateOwnerByIdHandler = (request, h) => {
  const { ownerId } = request.params;
  const {
    fullName, password, address, phoneNumber, isVerif,
  } = request.payload;
  const index = owners.findIndex((owner) => owner.ownerId === ownerId);

  if (index !== -1) {
    owners[index] = {
      ...owners[index],
      fullName,
      password,
      address,
      phoneNumber,
      isVerif,
    };

    const response = h.response({
      status: 'success',
      message: 'owner berhasil diubah',
      data: owners[index],
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'owner gagal diubah',
  });

  response.code(404);
  return response;
};

const deleteOwnerByIdHandler = (request, h) => {
  const { ownerId } = request.params;
  const index = owners.findIndex((owner) => owner.ownerId === ownerId);

  if (index !== -1) {
    owners.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'owner berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'user gagal dihapus',
  });

  response.code(404);
  return response;
};

module.exports = {
  getAllOwnersHandler,
  getOwnerByIdHandler,
  addOwnerHandler,
  updateOwnerByIdHandler,
  deleteOwnerByIdHandler,
};
