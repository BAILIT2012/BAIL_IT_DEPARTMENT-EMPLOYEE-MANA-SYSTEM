function LoginValidation(values){
    let error={}

    const employee_code_pattern= /^BAIL\d{4}$/ //$ end of the string ^ start of string
    const password_pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    const emCode= values.employee_code?.trim()||"";
    const emPassword = values.password?.trim()||"";

    if(emCode=== ""){
        error.employee_code = "Employee code should not be empty";
    }else if(!employee_code_pattern.test(values.employee_code)){
        error.employee_code= "Employee Code Did not Match"
    }else{
        error.employee_code= ""
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

export default LoginValidation;