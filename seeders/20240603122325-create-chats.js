"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "chats",
      [
        {
          id: 112,
          id_person_1: 1,
          id_person_2: 2,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 113,
          id_person_1: 1,
          id_person_2: 3,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 114,
          id_person_1: 1,
          id_person_2: 4,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 115,
          id_person_1: 1,
          id_person_2: 5,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 123,
          id_person_1: 2,
          id_person_2: 3,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 124,
          id_person_1: 2,
          id_person_2: 4,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 125,
          id_person_1: 2,
          id_person_2: 5,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 134,
          id_person_1: 3,
          id_person_2: 4,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 135,
          id_person_1: 3,
          id_person_2: 5,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 145,
          id_person_1: 4,
          id_person_2: 5,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("chats", null, {});
  },
};
