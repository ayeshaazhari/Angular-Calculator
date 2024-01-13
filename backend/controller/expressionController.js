const ExpressionModel = require("../models/index");
 
// exports.getAllExpression = async () => {
//   return await ExpressionModel.find();
// };

exports.getAllExpression = async (req, res) => {
    console.log("a")
    try {
      const expressions =  await ExpressionModel.find();
      res.status(200).send({ data: expressions, status: "success" });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

exports.createExpression = async (req,res) => {
    try {
        console.log("req.body", req.body)
        const exp = await ExpressionModel.create(req.body);
        res.json({ data: exp, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  exports.deleteExpression = async (req,res) => {
    try {
        console.log("req.param", req.param);
        let id = req.param;
        const exp = await ExpressionModel.deleteOne({id});
        res.json({ data: exp, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };