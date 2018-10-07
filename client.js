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

let moviesArray = [];

class Movie{
    constructor(title, year, dir){
        this.title=title;
        this.year=year;
        this.dir=dir;
    }
}

$(document).ready(readyNow);

function readyNow() {
    console.log(`cool w/ jQuery`);

    $('#submitNewEmployee').on(`click`, addEmployee);
    $('#tableBodyOfEmployees').on(`click`, '.deleteEmployee', deleteEmployee);
 //  switch color to red 


    $('#addNewMovie').on(`click`, addMovie);
    $(`#movieList`).on(`click`, '.lendMovie', lendMovie);
    $(`#movieList`).on(`click`, '.deleteMovie', deleteMovie);

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
//    $('input').val('');
    let newEmployee = new Employee(firstNameIn, lastNameIn, ID, titleIn, annualSalaryIn);
    employeeArray.push(newEmployee);
    console.log("employee being added, here is the new array after the push:" );
    console.log(employeeArray);
    refreshEmployeeTable();
    //  Update monthy cost
    console.log("new employee is", newEmployee)
    addToMonthlyCost(newEmployee);
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

function addToMonthlyCost(employee){
    console.log("entering function addToMonthlyCost");

    //  This function adds to the monthly cost when an employee is added 
    //  and updates the table
    totalMonthlyCost += employee.annualSalary/12;
    console.log('new total monthly cost:', totalMonthlyCost);
    let totalMonthlyCostElement = $('#totalMonthlyCost');
    totalMonthlyCostElement.empty();
    totalMonthlyCostElement.append(`<p ALIGN=RIGHT>Total Monthly: ` + totalMonthlyCost + `</p>`)
}

function deleteEmployee(){
    console.log("entering delete employee");
    let htmlElementTagNumber = $(this).parent().parent().data("htmlElementTagNumber");
    console.log(htmlElementTagNumber);
    deleteFromMonthlyCost(htmlElementTagNumber);
    employeeArray.splice(htmlElementTagNumber, 1);
    //  This refreshes the html table to reflect the new employeeArray
    refreshEmployeeTable();
}
function deleteFromMonthlyCost(employeeArrayNumber){
    console.log(`deleting from monthly cost employee number ${employeeArrayNumber}`)
    //  This function deletes an employee's cost from the totalMonthlyCost
    //  and updates the monthly cost element
    totalMonthlyCost = totalMonthlyCost - employeeArray[employeeArrayNumber].annualSalary/12;
    let totalMonthlyCostElement = $('#totalMonthlyCost');
    totalMonthlyCostElement.empty();
    totalMonthlyCostElement.append(`<p ALIGN=RIGHT>Total Monthly: ` + totalMonthlyCost + `</p>`)

}


//  GET RID OF THIS STUFF AT THE END

function addMovie(){
    event.preventDefault();
    console.log('button clicked!')
    let titleIn = $('#title').val();
    let yearIn = $('#year').val();
    let dirIn = $('#dir').val();
    let newMovie = new Movie(titleIn, yearIn, dirIn)
    moviesArray.push(newMovie);
    console.log(moviesArray);
    appendMovieList();
}

// appending
function appendMovieList() {
    let element = $(`#movieList`);
    element.empty();
    for(let movie of moviesArray){
        console.log(movie);
        element.append(`<li>` + movie.title + ` ` + movie.year + movie.title +
        `<button class="lendMovie">Lend</button><button class="deleteMovie">Delete</button> </li>`);

    }
}

//lending
function lendMovie(){
    console.log('lend clicked');
    $(this).parent().toggleClass('yellow');
}

//delete
function deleteMovie(){
    console.log('delete!');
    let selectedItem = $(this).parent().text();
    console.log(selectedItem);
    for(let i=0; i< moviesArray.length; i++){
        if(selectedItem.includes(moviesArray[i].title)){
            console.log('delete me');
            moviesArray.splice(i, 1);
            $(this).parent().remove();
            return;

        }
    }

}