const express = require('express');
const router = express.Router();
const { getEmployees, getEmployee, createEmployee, deleteEmployee, updateEmployee } = require('../controllers/employees');

router.get('/', getEmployees);
router.post('/', createEmployee);
router.put('/', updateEmployee);
router.delete('/', deleteEmployee);
router.get('/:emp_no', getEmployee);

module.exports = router;