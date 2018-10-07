console.log(`javascript being read`);

let employeeArray = [];    //  Array of employees
let totalMonthlyCost = 0;  //  Total monthly cost of employee salaries

class Employee{
    //  Constructor to use when creating employee objects to put in employeeArray
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
    //  Event handler for clicking on submit employee button
    $('#submitNewEmployee').on(`click`, addEmployee);
    //  Event handler for clicking on delete employee button
    $('#tableBodyOfEmployees').on(`click`, '.deleteEmployee', deleteEmployee);
}

function addEmployee(){
    //  Function pulls submitted employee stats from entry fields, uses them to create
    //  a new employee object, pushes the employee object to the array, recalculates the monthly 
    //  salary cost and refreshes the employee info and monthly salary cost  

    event.preventDefault();
    let firstNameIn = $(`#FirstName`).val();
    let lastNameIn = $(`#LastName`).val();
    let ID = $(`#ID`).val();
    let titleIn = $(`#Title`).val();
    let annualSalaryIn = $(`#AnnualSalary`).val();
    //  Empties input fields
//$('input').val('');
    let newEmployee = new Employee(firstNameIn, lastNameIn, ID, titleIn, annualSalaryIn);
    employeeArray.push(newEmployee);
    refreshEmployeeTable();
    updateTotalMonthlyCost(newEmployee, true);  //  True indicates to add to TotalMonthlyCost
}



function deleteEmployee(){
    //  Function checks the htmlElementTagNumber of the clicked button's row on the table
    //  which is always the associated employees index in the array and uses is to update 
    //  totalmonthlycost, splice the associated employee out of employeeArray then refreshes
    //  the table

    let htmlElementTagNumber = $(this).parent().parent().data("htmlElementTagNumber");  //Grabbing the tag number of the delete buton's row
    updateTotalMonthlyCost(employeeArray[htmlElementTagNumber], false);           //  false indicates to reduce TotalMonthlyCost
    employeeArray.splice(htmlElementTagNumber, 1);
    refreshEmployeeTable();
}

function refreshEmployeeTable(){
    //  Clears the employee table elements and then recreates the table from the 
    //  recently updated employeeArray

 
    let tableBodyOfEmployees = $("#tableBodyOfEmployees");
    tableBodyOfEmployees.empty();  //  The current table is removed 
    let i=0; 
    for(let employee of employeeArray){
        //  This loop reinserts all employees from employeeArray into the table
        //  Each table row is ID'd with the index of it's associated employee
        //  and a delete button is added to the last column

        tableBodyOfEmployees.append(`<tr id=` + i + `>  
        <td>` + employee.firstName + `</td>
        <td>` + employee.lastName + `</td>
        <td>` + employee.ID + `</td>
        <td>` + employee.title + `</td>
        <td>` + employee.annualSalary + `</td>
        <td><button class="deleteEmployee">Delete Employee</button> </td>
        </tr>`);
        
        let hashStringi = "#" + i.toString();  // i is converted to the string '#i' due to jquery 
        $(hashStringi).data("htmlElementTagNumber", i);     // jquery gives the new row (<tr>) a "tag number" i.
                                                            // each <tr> element's "tag number" matches the
                                                            // associated employee's index in employeeArray
        i++;
    }

}

function updateTotalMonthlyCost(employee, boolean){
    //  This function adds to the monthly cost when an employee is added
    //  or subtracts from the monthly cost when an employee is deleted
    //  then updates the table
    if(boolean === true){  
        if(totalMonthlyCost <= 20000 && totalMonthlyCost + employee.annualSalary/12 > 20000){
            //  If we went over 20000 per month toggle the class to red
            $('#totalMonthlyCost').toggleClass('inTheRed');
        }
        totalMonthlyCost += employee.annualSalary/12;
        
    }
    else if(boolean === false){
        if(totalMonthlyCost > 20000 && totalMonthlyCost - employee.annualSalary/12 <= 20000){
            //  If we went under 20000 per month toggle the class to not red
            $('#totalMonthlyCost').toggleClass('inTheRed');
        }
        totalMonthlyCost = totalMonthlyCost - employee.annualSalary/12;
    }

    //  Update the totalMonthlyCostElement on the website
    let totalMonthlyCostElement = $('#totalMonthlyCost');
    totalMonthlyCostElement.empty();
    totalMonthlyCostElement.append(`<p ALIGN=RIGHT>Total Monthly: ` + totalMonthlyCost + `</p>`)

}

