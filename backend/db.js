const { Schema, connect, model } = require("mongoose");
const bcrypt = require("bcrypt");
connect(
  "mongodb+srv://sbbhutani12:2928811Ss@cluster0.on0du6g.mongodb.net/paytm"
);

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
  },
  password: { type: String, required: true, minLength: 6, trim: true },
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: { type: String, required: true, trim: true, maxLength: 50 },
});

// Method to generate a hash from plain text
userSchema.methods.createHash = async function (plainTextPassword) {
  // Hashing user's salt and password with 10 iterations,
  const saltRounds = 10;

  // First method to generate a salt and then create hash
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);

  // Second mehtod - Or we can create salt and hash in a single method also
  // return await bcrypt.hash(plainTextPassword, saltRounds);
};

// Validating the candidate password with stored hash and hash function
userSchema.methods.validatePassword = async function (
  candidatePassword,
  password_hash
) {
  return await bcrypt.compare(candidatePassword, password_hash);
};

const accountSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    required: true,
  },
});

const User = model("User", userSchema);
const Account = model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
