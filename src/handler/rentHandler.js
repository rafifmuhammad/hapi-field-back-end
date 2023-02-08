const { nanoid } = require('nanoid');
const rents = require('../data/rent');

const getAllRentsHandler = () => ({
  status: 'success',
  data: {
    rents,
  },
});

const getRentByIdHandler = (request, h) => {
  const { rentId } = request.params;
  const index = rents.findIndex((rent) => rent.rentId === rentId);

  if (index !== -1) {
    return {
      status: 'success',
      data: rents[index],
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'data tidak ditemukan',
  });

  response.code(404);
  return response;
};

const addRentHandler = (request, h) => {
  const {
    ownerId,
    fieldId,
    rentOver,
    totalBill,
  } = request.payload;
  const rentId = nanoid(16);
  const rentDate = new Date().toISOString();

  const newRent = {
    rentId,
    ownerId,
    fieldId,
    rentDate,
    rentOver,
    totalBill,
  };

  rents.push(newRent);

  const isSuccess = rents.filter((rent) => rent.rentId === rentId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'data berhasil ditambahkan',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'data gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const deleteRentByIdHandler = (request, h) => {
  const { rentId } = request.params;
  const index = rents.findIndex((rent) => rent.rentId === rentId);

  if (index !== -1) {
    rents.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'data berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'data gagal dihapus',
  });

  response.code(404);
  return response;
};

module.exports = {
  getAllRentsHandler,
  getRentByIdHandler,
  addRentHandler,
  deleteRentByIdHandler,
};
