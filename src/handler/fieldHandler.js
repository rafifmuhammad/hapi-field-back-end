const { nanoid } = require('nanoid');
const fields = require('../data/field');

const getAllFieldsHandler = () => ({
  status: 'success',
  data: {
    fields,
  },
});

const getFieldByIdHandler = (request, h) => {
  const { fieldId } = request.params;
  const index = fields.findIndex((field) => field.fieldId === fieldId);

  if (index !== -1) {
    return {
      status: 'success',
      data: fields[index],
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'lapangan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const addFieldHandler = (request, h) => {
  const {
    ownerId,
    name,
    description,
    location,
    address,
    province,
    city,
    schedule,
    price,
    ownerPhoneNumber,
  } = request.payload;
  const fieldId = nanoid(16);
  const createdAt = new Date().toISOString();

  const newField = {
    fieldId,
    ownerId,
    name,
    description,
    location,
    address,
    province,
    city,
    schedule,
    price,
    ownerPhoneNumber,
    createdAt,
  };

  fields.push(newField);

  const isSuccess = fields.filter((field) => field.fieldId === fieldId).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'lapangan berhasil ditambahkan',
      data: {
        fieldId,
        ownerId,
        name,
        description,
        location,
        address,
        province,
        city,
        schedule,
        price,
        ownerPhoneNumber,
        createdAt,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'lapangan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const updateFieldByIdHandler = (request, h) => {
  const { fieldId } = request.params;
  const {
    name, description, address, schedule, price, ownerPhoneNumber,
  } = request.payload;
  const index = fields.findIndex((field) => field.fieldId === fieldId);

  if (index !== -1) {
    fields[index] = {
      ...fields[index],
      name,
      description,
      address,
      schedule,
      price,
      ownerPhoneNumber,
    };

    const response = h.response({
      status: 'success',
      message: 'lapangan berhasil diubah',
      data: fields[index],
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'lapangan gagal diubah',
  });

  response.code(500);
  return response;
};

const deleteFieldByIdHandler = (request, h) => {
  const { fieldId } = request.params;
  const index = fields.findIndex((field) => field.fieldId === fieldId);

  if (index !== -1) {
    fields.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'lapangan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'lapangan gagal dihapus',
  });

  response.code(404);
  return response;
};

module.exports = {
  getAllFieldsHandler,
  getFieldByIdHandler,
  addFieldHandler,
  updateFieldByIdHandler,
  deleteFieldByIdHandler,
};
