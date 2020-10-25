import ProductsTest from './products.e2e';
import ShopsTest from './shops.e2e';
import UsersTest from './users.e2e';
const mongoose = require('mongoose');

ProductsTest();
ShopsTest();
UsersTest();
afterAll(() => mongoose.disconnect());
