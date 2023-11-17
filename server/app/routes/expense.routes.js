const { authJwt } = require("../middleware");

module.exports = app => {
    const controller = require("../controllers/expense.controller.js");

    var expenseRouter = require("express").Router();

    // Create a new expense
    expenseRouter.post("/", [authJwt.verifyToken], controller.createExpense);

    // Retrieve all expenses
    expenseRouter.get("/", [authJwt.verifyToken], controller.findAllExpenses);

    // Retrieve all published expenses
    expenseRouter.get("/published", [authJwt.verifyToken], controller.findAllPublished);

    // Retrieve a single expense with id
    expenseRouter.get("/:id", [authJwt.verifyToken], controller.findOne);

    // Update a expense with id
    expenseRouter.put("/:id", [authJwt.verifyToken], controller.updateExpense);

    // Delete a expense with id
    expenseRouter.delete("/:id", [authJwt.verifyToken], controller.deleteExpense);

    // Create a new expense
    expenseRouter.delete("/", [authJwt.verifyToken], controller.deleteAll);

    app.use('/api/expenses', expenseRouter);
};
