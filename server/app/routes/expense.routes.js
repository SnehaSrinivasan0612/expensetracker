module.exports = app => {
    const controller = require("../controllers/expense.controller.js");

    var expenseRouter = require("express").Router();

    // Create a new expense
    expenseRouter.post("/", controller.createExpense);

    // Retrieve all expenses
    expenseRouter.get("/", controller.findAllExpenses);

    // Retrieve all published expenses
    expenseRouter.get("/published", controller.findAllPublished);

    // Retrieve a single expense with id
    expenseRouter.get("/:id", controller.findOne);

    // Update a expense with id
    expenseRouter.put("/:id", controller.updateExpense);

    // Delete a expense with id
    expenseRouter.delete("/:id", controller.delete);

    // Create a new expense
    expenseRouter.delete("/", controller.deleteAll);

    var categoryRouter = require("express").Router();

    // Create a new category
    categoryRouter.post("/", controller.createCategory);

    // Retrieve all categories
    categoryRouter.get("/", controller.findAllCategories);

    // Update a category with id
    categoryRouter.put("/:id", controller.updateCategory);

    var userRouter = require("express").Router();

    // Create a new user
    userRouter.post("/", controller.createUser);

    // Retrieve all users
    userRouter.get("/", controller.findAllUsers);

    // Update a user with id
    userRouter.put("/:id", controller.updateUser);

    app.use('/api/expenses', expenseRouter);
    app.use('/api/categories', categoryRouter);
    app.use('/api/users', userRouter);
};
