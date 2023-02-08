const { nanoid } = require('nanoid');
const chats = require('../data/chat');

const getAllChatsHandler = () => ({
  status: 'success',
  data: {
    chats,
  },
});

const addChatHandler = (request, h) => {
  const {
    message, userIdA, userIdB, text,
  } = request.payload;
  const chatId = nanoid(16);
  const date = new Date().toISOString;
  const createdAt = date;

  const newDate = {
    chatId, date, message,
  };

  chats.push(newDate);

  const index = chats.filter((chat) => chat.date === date);

  if (index) {
    const newIndex = chats.findIndex((chat) => chat.date === date);

    if (newIndex !== -1) {
      const messageId = nanoid(16);
      const newMessage = {
        messageId, senderId: `${userIdA}_${userIdB}`, text, createdAt,
      };

      chats[newIndex].message.push(newMessage);

      const response = h.response({
        status: 'success',
        message: 'chat berhasil dikirimkan',
      });

      response.code(201);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'chat tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  if (!index) {
    const newIndex = chats.findIndex((chat) => chat.date === date);

    const messageId = nanoid(16);
    const newMessage = {
      messageId, senderId: `${userIdA}_${userIdB}`, text, createdAt,
    };
    chats[newIndex].message.push(newMessage);

    const response = h.response({
      status: 'success',
      message: 'chat berhasil dikirimkan',
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'pesan gagal dikirimkan',
  });

  response.code(500);
  return response;
};

const deleteChatByIdHandler = (request, h) => {
  const { messageId } = request.params;

  const index = chats.message.findIndex((msg) => msg.messageId === messageId);

  if (index !== -1) {
    chats.message.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'pesan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'pesan gagal dihapus',
  });

  response.code(200);
  return response;
};

module.exports = {
  getAllChatsHandler,
  addChatHandler,
  deleteChatByIdHandler,
};
