function SignupValidation(values){
        let error={}

    const employee_code_pattern= /^BAIL\d{4}$/ //$ end of the string ^ start of string
    const employee_department_pattern= /^[A-Za-z]+$/ //all cases are required
    const employee_name_pattern= /^[A-Za-z]+$/ //all cases are required
    const employee_designation_pattern= /^[A-Za-z]+$/
    const employee_mobile_pattern= /^[6-9]\d{9}$/ //only numbers allowed and allowed india numbers
    const password_pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    
    
    const emCode= values.employee_code?.trim()||"";
    const emName= values.employee_name?.trim()||"";
    const emDepartment= values.employee_department?.trim()||"";
    const emDesignation= values.employee_designation?.trim()||"";
    const emMobile= values.employee_mobile?.trim()||"";
    const emPassword = values.password?.trim()||"";
    

     if(emCode=== ""){
        error.employee_code = "Employee code should not be empty";
    }else if(!employee_code_pattern.test(values.employee_code)){
        error.employee_code= "Employee Code Did not Match"
    }else{
        error.employee_code= ""
    }
     if(emName=== ""){
        error.employee_name = "Employee Name should not be empty";
    }else if(!employee_name_pattern.test(values.name_code)){
        error.employee_name= "Employee Name Did not Match"
    }else{
        error.employee_name= ""
    }
    if(emDepartment=== ""){
        error.employee_department= "Employee Department Should not be empty"
    }else if(!employee_department_pattern.test(values.employee_department)){
        error.employee_department= "Employee Department Did Not Match"
    }
    else{
        error.employee_department= ""
    }
     if(emDesignation=== ""){
        error.employee_designation= "Employee Designation Should not be empty"
    }else if(!employee_designation_pattern.test(values.employee_designation)){
        error.employee_designation= "Employee Designation Did Not Match"
    }
    else{
        error.employee_designation= ""
    }
     if(emMobile=== ""){
        error.employee_mobile= "Employee Mobile Number Should not be empty"
    }else if(!employee_mobile_pattern.test(values.employee_mobile)){
        error.employee_mobile= "Employee Mobile Number Did Not Match"
    }
    else{
        error.employee_mobile= ""
    }
    if(emPassword=== ""){
        error.password= "Password Should not be empty"
    }else if(!password_pattern.test(values.password)){
        error.password= "Password Did not Match"
    }else{
        error.password= ""
    }
    return error;

}

export default SignupValidation;

