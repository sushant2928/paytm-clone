const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signUpBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const userUpdateBody = zod.union([
  zod.pick({ password: zod.string().optional() }),
  zod.pick({ firstName: zod.string().optional() }),
  zod.pick({ lastName: zod.string().optional() }),
]);

route.post("/signup", async (req, res) => {
  try {
    signUpBody.parse(req.body);
    // if (!success) {
    //   return res.status(411).json({
    //     message: "Invalid Input",
    //   });
    // }
    const existingUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.status(411).json({
        message: "Email already in use!",
      });
    }
    const { username, password, firstName, lastName } = req.body;

    const newUser = new User({
      username,
      firstName,
      lastName,
    });
    const hashedPassword = newUser.createHash(password);
    newUser.password = hashedPassword;
    const user = await newUser.save();
    const userId = user._id;
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.status(200).json({
      message: "User created successfully!",
      token,
    });
  } catch (e) {
    res.status(400).json({
      message: e?.message || "Something went wrong!",
    });
  }
});

route.get("/signin", async (req, res) => {
  try {
    signinBody.parse(req.body);
    // if (!success) {
    //   return res.status(411).json({
    //     message: "Invalid Input!",
    //   });
    // }
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }
    if (!(await user?.validatePassword(password))) {
      return res.json(401).json({
        message: "Incorrect Password!",
      });
    }
    const userId = user._id;
    res.status(200).json({
      token: jwt.sign({ userId }),
    });
  } catch (e) {
    res.status(400).json({
      message: e?.message || "Something went wrong!",
    });
  }
});

route.put("/user", authMiddleware, async (req, res) => {
  try {
    userUpdateBody.parse(req.body);
    const user = await User.findOneAndUpdate({ _id: req.userId }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "User successfully updated!",
      user,
    });
  } catch (e) {
    res.status(400).json({
      message: e?.message || "Something went wrong!",
    });
  }
});

route.get("/user/bulk", async (req, res) => {
  try {
    const searchText = req?.params?.filter || "";
    const users = User.find({
      $or: [
        { firstName: { $regex: searchText } },
        { lastName: { $regex: searchText } },
      ],
    });
    if (!Array.isArray(users) || !users?.length) {
      return res.status(400).json({
        message: e?.message || "Something went wrong!",
      });
    }
    res.json(200).json({
      result: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (e) {
    res.status(400).json({
      message: e?.message || "Something went wrong!",
    });
  }
});

module.exports = router;
