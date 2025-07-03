const express = require("express");
const TransactionController = require("../controllers/transactionCtrl");
const isAuth = require("../middleware/isAuth");
const transactionRouter = express.Router();

transactionRouter.post("/create", isAuth)

transactionRouter.post("/create", isAuth,transactionController.create);
transactionRouter.get("/lists", isAuth,transactionController.getFilteredTransactions)
transactionRouter.put("/update/:id", isAuth,transactionController.update)
transactionRouter.delete("/delete/:id", isAuth,transactionController.delete)