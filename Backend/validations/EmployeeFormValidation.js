const EmployeeFormValidation = (data) => {
  const errors = {};

  if (!data.employee_code.trim()) {
    errors.employee_code = "Employee code is required";
  }
  if (!data.employee_name.trim()) {
    errors.employee_name = "Employee name is required";
  }
  if (!data.employee_designation.trim()) {
    errors.employee_designation = "Designation is required";
  }
  if (!data.employee_department.trim()) {
    errors.employee_department = "Department is required";
  }

  return errors;
};

export default EmployeeFormValidation