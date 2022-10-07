const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isemail");

const studentSchema = new mongoose.Schema({  // creating a new schema for the student database which defines what type of data is acceptable //
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already exists"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});


const Student = new mongoose.model("Student", studentSchema)  // creating a new collection named student( shud be singular & shud follow pascal convention) 

module.exports = Student // exporting student module to express app