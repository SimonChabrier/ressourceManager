'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
   const tag = ['documentation', 'tutorial', 'article', 'video', 'podcast'];
    const tech = ['react', 'node', 'express', 'sequelize', 'postgresql'];
    await queryInterface.bulkInsert('Ressources', [
      // create 100 ressources with random data and user id 1 and random tag and random tech
      ...Array.from({ length: 1000 }).map((_, index) => ({
        title: `Ressource ${index + 1}`,
        content: `Description ${index + 1}`,
        userId: 1,
        tag: tag[Math.floor(Math.random() * 5)],
        tech: tech[Math.floor(Math.random() * 5)],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Ressources', null, {});
     */
    await queryInterface.bulkDelete('Ressources', null, {});
  }
};
