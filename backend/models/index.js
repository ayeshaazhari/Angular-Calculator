const mongoose = require('mongoose');
 
const ExpressionSchema = new mongoose.Schema({
    expression: String,
    result: String,
   
});
 
module.exports = mongoose.model(
    'expression', ExpressionSchema, 'Expressions');