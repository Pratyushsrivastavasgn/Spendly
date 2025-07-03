const express = require("express");
const categoryController = require("../controllers/categoryCtrl");
const isAuth = require("../middleware/isAuth");
const categoryRouter = express.Router();

categoryRouter.post("/create", isAuth,categoryController.create);
categoryRouter.get("/lists", isAuth,categoryController.lists);
categoryRouter.put("/update/:id", isAuth,categoryController.update);
categoryRouter.delete("/delete/:id", isAuth,categoryController.delete);