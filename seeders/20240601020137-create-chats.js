"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "chats",
      [
        {
          id: 1,
          id_person_1: 2,
          id_person_2: 3,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          id_person_1: 2,
          id_person_2: 4,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          id_person_1: 2,
          id_person_2: 5,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          id_person_1: 3,
          id_person_2: 4,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          id_person_1: 3,
          id_person_2: 5,
          messages: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
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
