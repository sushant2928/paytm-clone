// backend/api/index.js
const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.all("/user", userRouter);
router.all("/account", accountRouter);

module.exports = router;
