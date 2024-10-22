const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const zod = require("zod");
const { startSession } = require("mongoose");

const router = express.Router();

const transferBalanceBody = zod.object({
  to: zod.string(),
  balance: zod.number(),
});

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const account = await Account.findOne({
      userId,
    });
    res.status(200).json({
      balance: account.balance,
    });
  } catch (e) {
    res.status(400).json({ message: e?.message });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await startSession();
    session.startTransaction();
    const { to, amount } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (e) {
    res.status(400).json({ message: e?.message });
  }
});

module.exports = router;
