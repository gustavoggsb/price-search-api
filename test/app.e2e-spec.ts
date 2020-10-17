import ProductsTest from './products.e2e';
import ShopsTest from './shops.e2e';
const mongoose = require('mongoose');




ProductsTest();
ShopsTest();
afterAll(() => mongoose.disconnect());

