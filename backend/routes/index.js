const express = require("express");
const {
    getAllExpression,
    createExpression,
} = require("../controller/expressionController");

let router = express.Router();

router.get('/allExpressions', getAllExpression)

router.post('/createExpression', createExpression)

router.delete('/createExpression/:id', createExpression)

module.exports = router;
