const mongoose = require("mongoose");
const Employee = require("../models/Employee");

const employeeController = {};

// Show list of employees
employeeController.list = (req, res) => {
  Employee.find({}).exec((err, employees) => {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/index", {employees: employees});
    }
  });
};

// Show employee by id
employeeController.show = (req, res) => {
  Employee.findOne({_id: req.params.id}).exec((err, employee) => {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/show", {employee: employee});
    }
  });
};

// Create new employee
employeeController.create = (req, res) => {
  res.render("../views/employees/create");
};

// Save new employee
employeeController.save = (req, res) => {
  const employee = new Employee(req.body);

  employee.save((err) => {
    if(err) {
      console.log(err);
      res.render("../views/employees/create");
    } else {
      console.log("Successfully created an employee.");
      res.redirect("/employees/show/"+employee._id);
    }
  });
};

// Edit an employee
employeeController.edit = (req, res) => {
  Employee.findOne({_id: req.params.id}).exec((err, employee) => {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/edit", {employee: employee});
    }
  });
};

// Update an employee
employeeController.update = (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
    if (err) {
      console.log(err);
      res.render("../views/employees/edit", {employee: req.body});
    }
    res.redirect("/employees/show/"+employee._id);
  });
};

// Delete an employee
employeeController.delete = (req, res) => {
  Employee.remove({_id: req.params.id}, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Employee deleted!");
      res.redirect("/employees");
    }
  });
};

module.exports = employeeController;
