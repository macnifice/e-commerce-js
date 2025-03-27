'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Camiseta Básica Blanca',
        description: 'Camiseta de algodón 100% en color blanco.',
        price: 129.00,
        stock: 50,
        image: 'https://ss261.liverpool.com.mx/xl/1150642261.jpg',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Jeans Azul',
        description: 'Jeans corte recto, azul clásico.',
        price: 699.00,
        stock: 30,
        image: 'https://pieers.com/media/catalog/product/cache/334416996b13b45056f516cf8b55981c/p/r/prp0axq0ffs_1.jpg',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sudadera con Capucha Negra',
        description: 'Sudadera unisex con capucha y bolsillo frontal.',
        price: 449.00,
        stock: 20,
        image: 'https://ss555.liverpool.com.mx/xl/1153792735.jpg',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vestido Floral Verano',
        description: 'Vestido corto con estampado floral, ideal para el verano.',
        price: 499.00,
        stock: 15,
        image: 'https://i.etsystatic.com/9635813/r/il/517951/5207947485/il_570xN.5207947485_sr2y.jpg',
        businessId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camisa de Cuadros',
        description: 'Camisa casual de cuadros, manga larga.',
        price: 479.00,
        stock: 25,
        image: 'https://i.pinimg.com/736x/da/e0/54/dae0547c3f841899f4fcc7412432af44.jpg',
        businessId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Falda Plisada Negra',
        description: 'Falda plisada elegante en color negro.',
        price: 319.00,
        stock: 18,
        image: 'https://i.etsystatic.com/7544128/r/il/208c8c/2116137697/il_570xN.2116137697_5swh.jpg',
        businessId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chamarra de Mezclilla',
        description: 'Chamarra clásica de mezclilla azul.',
        price: 799.00,
        stock: 10,
        image: 'https://ss223.liverpool.com.mx/xl/1154203946.jpg',
        businessId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Short Deportivo',
        description: 'Short cómodo para entrenamientos y uso casual.',
        price: 289.00,
        stock: 40,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f071730650844e65a7a3ac72003b42c9_9366/Shorts_Deportivos_Primeblue_Designed_To_Move_2_en_1_Negro_GL4033_01_laydown.jpg',
        businessId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Blusa de Encaje',
        description: 'Blusa femenina con detalles en encaje.',
        price: 359.00,
        stock: 12,
        image: 'https://i.ebayimg.com/images/g/jasAAOSw7OZfZdj2/s-l1200.jpg',
        businessId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalón Jogger Beige',
        description: 'Joggers cómodos de tela suave, estilo casual.',
        price: 429.00,
        stock: 22,
        image: 'https://static.lefties.com/assets/public/69ee/c724/60c14e8cab82/37a7da26cb06/05921531737-A5/05921531737-A5.jpg?ts=1730827219024&w=800&f=auto',
        businessId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
