const express = require("express");
const transactionController = require("../controllers/transactionCtrl");
const isAuth = require("../middleware/isAuth");

const transactionRouter = express.Router();

// Create a new transaction
transactionRouter.post("/create", isAuth, transactionController.create);

// Get filtered list of transactions
transactionRouter.get("/lists", isAuth, transactionController.getFilteredTransactions);

// Update a transaction by ID
transactionRouter.put("/update/:id", isAuth, transactionController.update);

// Delete a transaction by ID
transactionRouter.delete("/delete/:id", isAuth, transactionController.delete);

module.exports = transactionRouter;
