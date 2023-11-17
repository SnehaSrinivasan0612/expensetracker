const db = require("../models");
const Expenses = db.tables.Expenses;
const Users = db.tables.Users;
const Op = db.Sequelize.Op;

// Create and Save a new Expense
exports.createExpense = (req, res) => {
    // Validate request
    if (!req.body.Amount) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log(req.body);
        return;
    }
    // Create a Expense
    const expense = {
        UserID: req.body.UserID,
        CategoryID: req.body.CategoryID,
        Amount: req.body.Amount,
        ExpenseDescription: req.body.ExpenseDescription,
        ExpenseDate: req.body.ExpenseDate,
        CategoryName: req.body.CategoryName
    };

    // Save Expense in the database
    Expenses.create(expense)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Expense."
            });
        });
};
exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.UserName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a User
    const user = {
        UserName: req.body.UserName,
        UserEmail: req.body.UserEmail,
        PasswordHash: req.body.PasswordHash,
    };

    // Save User in the database
    Users.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};


// Retrieve all Expenses from the database.
exports.findAll = (req, res, table) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    table.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving expenses."
            });
        });
};
exports.findAllExpenses = (res, req) => { this.findAll(res, req, Expenses) };

exports.findAllUsers = (res, req) => { this.findAll(res, req, Users) };

// Find a single Expense with an id
exports.findOne = (req, res) => {

};

// Update a table by the id in the request
exports.update = (req, res, table,) => {
    const id = req.params.id;

    table.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Table was updated successfully.`
                });
            } else {
                res.send({
                    message: `Cannot update row with id=${id}. Maybe table was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating row with id=` + id
            });
        });

};

exports.updateExpense = (req, res) => { this.update(req, res, Expenses) };
exports.updateUser = (req, res) => { this.update(req, res, Users) };

// Delete a Expense with the specified id in the request
exports.delete = (req, res, table) => {
    const id = req.params.id;

    table.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Row was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Row with id=${id}. Maybe row was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete row with id=" + id
            });
        });
};

exports.deleteUser = (req, res) => { this.delete(req, res, Users) };
exports.deleteExpense = (req, res) => { this.delete(req, res, Expenses) };
// Delete all Expenses from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Expenses
exports.findAllPublished = (req, res) => {

};
