console.log(`js`);

let employeeArray = [];
let totalMonthlyCost = 0;

class Employee{
    constructor(FirstName, LastName, ID, Title, AnnualSalary){
        this.firstName=FirstName;
        this.lastName=LastName;
        this.ID=ID;
        this.title=Title;
        this.annualSalary=AnnualSalary;
    }
}

$(document).ready(readyNow);

function readyNow() {

    $('#submitNewEmployee').on(`click`, addEmployee);
    $('#tableBodyOfEmployees').on(`click`, '.deleteEmployee', deleteEmployee);
}

function addEmployee(){
    event.preventDefault();
    console.log('Submit Button Has Been Clicked');
    let firstNameIn = $(`#FirstName`).val();
    let lastNameIn = $(`#LastName`).val();
    let ID = $(`#ID`).val();
    let titleIn = $(`#Title`).val();
    let annualSalaryIn = $(`#AnnualSalary`).val();
    //  Empties input fields
//$('input').val('');
    let newEmployee = new Employee(firstNameIn, lastNameIn, ID, titleIn, annualSalaryIn);
    employeeArray.push(newEmployee);
    console.log("employee being added, here is the new array after the push:" );
    console.log(employeeArray);
    refreshEmployeeTable();
    //  Update monthy cost
    console.log("new employee is", newEmployee)
    updateMonthlyCost(newEmployee, true);
}



function deleteEmployee(){
    console.log("entering delete employee");
    let htmlElementTagNumber = $(this).parent().parent().data("htmlElementTagNumber");
    console.log(htmlElementTagNumber);
    updateMonthlyCost(employeeArray[htmlElementTagNumber], false);
    employeeArray.splice(htmlElementTagNumber, 1);
    //  This refreshes the html table to reflect the new employeeArray
    refreshEmployeeTable();
}

function refreshEmployeeTable(){
    console.log("entering refreshEmployeeTable function");
    let tableBodyOfEmployees = $("#tableBodyOfEmployees");
    console.log(tableBodyOfEmployees);
    tableBodyOfEmployees.empty();
    console.log(tableBodyOfEmployees); 
    let i=0; 
    for(let employee of employeeArray){
        
        tableBodyOfEmployees.append(`<tr id=` + i + `>
        <td>` + employee.firstName + `</td>
        <td>` + employee.lastName + `</td>
        <td>` + employee.ID + `</td>
        <td>` + employee.title + `</td>
        <td>` + employee.annualSalary + `</td>
        <td><button class="deleteEmployee">Delete Employee</button> </td>
        </tr>`);

        let hashStringi = "#" + i.toString();
        console.log(hashStringi);
        $(hashStringi).data("htmlElementTagNumber", i);
        i++;
    }

}

function updateMonthlyCost(employee, boolean){
    console.log("entering function updateMonthlyCost");

    //  This function adds to the monthly cost when an employee is added
    //  or subtracts from the monthly cost when an employee is deleted
    //  then updates the table
    if(boolean === true){
        if(totalMonthlyCost <= 20000 && totalMonthlyCost + employee.annualSalary/12 > 20000){
            $('#totalMonthlyCost').toggleClass('inTheRed');
        }
        totalMonthlyCost += employee.annualSalary/12;
        
    }
    else if(boolean === false){
        if(totalMonthlyCost > 20000 && totalMonthlyCost - employee.annualSalary/12 <= 20000){
            $('#totalMonthlyCost').toggleClass('inTheRed');
        }
        totalMonthlyCost = totalMonthlyCost - employee.annualSalary/12;
    }
    console.log('new total monthly cost:', totalMonthlyCost);
    let totalMonthlyCostElement = $('#totalMonthlyCost');
    totalMonthlyCostElement.empty();
    totalMonthlyCostElement.append(`<p ALIGN=RIGHT>Total Monthly: ` + totalMonthlyCost + `</p>`)

}

