const Employee = require("../models/Employee");

const addEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
    } = req.body;

    // Check required fields
    if (
      !employeeId ||
      !name ||
      !email ||
      !phone ||
      !department ||
      !designation
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

        
    // Check duplicate employee ID
    const employeeExists = await Employee.findOne({
      employeeId,
    });

    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists",
      });
    }

    // Check duplicate email
    const emailExists = await Employee.findOne({
      email,
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Save employee
    const employee = new Employee({
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
    });

    await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee Added Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};