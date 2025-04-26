require("dotenv").config();
const express = require("express");
const mongoose = require("./db");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());



const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  level: String,
  address: String,
});

const doctorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
});

const Students = mongoose.model("Students", studentSchema);
const Doctors = mongoose.model("Doctors", doctorSchema);

// add a new student (hardcoded)
app.post("/students", async (req, res) => {
  try {
    const student = await Students.create({
      name: "Ziad Abbas",
      age: 20,
      level: "2nd",
      address: "Neptune",
    });

    res.status(201).json({ message: "student added successfully", student });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add student", error: error.message });
  }
});

// add a new student (from request body)
app.post("/students-req", async (req, res) => {
  try {
    const { name, age, level, address } = req.body;

    if (!name || !age || !level || !address) {
      return res.status(400).json({ message: "Missing data in request body" });
    }

    const student = await Students.create({ name, age, level, address });
    res.status(201).json({ message: "Student Added Successfully", student });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add student", error: error.message });
  }
});

// add a new doctor (Query Parameters)
app.post("/doctors", async (req, res) => {
  try {
    const { name, age, phone } = req.query;

    if (!name || !age || !phone) {
      return res
        .status(400)
        .json({ message: "Missing data in query parameters" });
    }

    const doctor = await Doctors.create({ name, age, phone });
    res.status(201).json({ message: "Doctor Added Successfully", doctor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add doctor", error: error.message });
  }
});

// Fetch All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Students.find();
    res.status(200);
    console.log("Total students fetched:", students.length);
    res.json({ message: "All students fetched from the database", students });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch students", error: error.message });
  }
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Students.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete student", error: error.message });
  }
});

// update doctor name (query params)
app.put("/doctors", async (req, res) => {
  try {
    const { oldName, newName } = req.query;
    if (!oldName || !newName) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const updatedDoctor = await Doctors.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: `Doctor name updated from '${oldName}' to '${newName}'`,
      updatedDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update doctor name", error: error.message });
  }
});

// Fetch Both modules (Students and Doctors)
app.get("/all", async (req, res) => {
  try {
    const students = await Students.find();
    const doctors = await Doctors.find();
    res.status(200).json({ students, doctors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch modules", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Ahlan Ma Sahlan BEEEEEEK😊");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
