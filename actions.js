// This is to take only aphabelts in expensename element
let expenseNameInput = document.getElementById("expenseName");
expenseNameInput.addEventListener("input", function(event) {
    // Remove any non-alphabet characters
    event.target.value = event.target.value.replace(/[^A-Za-z ]+/g, '');
});



let options = document.getElementById("options");
let newele;
let newlabel;
options.onchange = () => {
    const container = document.getElementById("otherInputContainer");
    // Clear the container before adding new elements
    container.innerHTML = '';
    if (options.value === "Other") {
        // Create and append a label
        newlabel = document.createElement("label");
        newlabel.textContent = "Other Category:";
        container.appendChild(newlabel);
        // Create and append a textarea
        let newele = document.createElement("input");
        newele.type = "text";
        newele.setAttribute("id","otherinput")
        newele.setAttribute("required",true);
        // This is to take only aphabelts in otherinput textarea element
        container.addEventListener("input", function(event) {
            // Remove any non-alphabet characters
        event.target.value = event.target.value.replace(/[^A-Za-z ]+/g, '');
        });
        container.appendChild(newele);
    }
};

let index = 0;
let details = {}
let table = document.querySelector(".expensedetails table");
function getdetails(event){
    event.preventDefault()
    let category
    if(document.getElementById("options").value === "Other"){
        category = document.getElementById("otherinput").value
        // adding new category into options for future selection in form
        let optionselement = document.getElementById("options")
        let categoryoption = document.createElement("option")
        categoryoption.textContent = category
        categoryoption.value = category
        let optionExists = Array.from(optionselement.options).some(option => option.value === category);
        if (!optionExists) {
            // Insert the new option at the second-to-last position
            optionselement.insertBefore(categoryoption,optionselement.lastElementChild)
        }else {
            // If the option already exists, just set the dropdown value to the existing option
            optionselement.value = category;
        }


        // adding new category into options for future selection in filtering
        let optionsfilteringelement = document.getElementById("filteroptions")
        let categoryfilteringoption = document.createElement("option")
        categoryfilteringoption.textContent = category
        categoryfilteringoption.value = category
        let filteringOptionExists = Array.from(optionsfilteringelement.options).some(option => option.value === category);
        if (!filteringOptionExists) {
            // Insert the new option at the second-to-last position
            optionsfilteringelement.insertBefore(categoryfilteringoption,optionsfilteringelement.lastElementChild)
        }else {
            // If the option already exists, just set the dropdown value to the existing option
            optionsfilteringelement.value = category;
        }
    }
    else{
        category = document.getElementById("options").value
    }
    // console.log(category)
    let d = {
        expenseName: document.getElementById("expenseName").value,
        category: category,
        totalAmount: document.getElementById("totalAmount").value
    };
    details[index] = d;
    index = index + 1;
    // console.log(details)
    expensedetails(d.expenseName,d.category,d.totalAmount)
    monthwisecontent(d.category,d.totalAmount)
}

function expensedetails(expenses, category, totalAmount){ //
    // Create a new row directly inside the .expensedetails div (not inside <tbody>)
    let newRow = document.createElement("tr"); // Create a new row element
    let cell1 = document.createElement("td"); // Create the first cell
    let cell2 = document.createElement("td"); // Create the second cell
    let cell3 = document.createElement("td"); // Create the third cell

    cell1.innerHTML = expenses; // Add the expense name to the first cell
    cell2.innerHTML = category; // Add the category to the second cell
    cell3.innerHTML = totalAmount; // Add the total amount to the third cell

    // Append cells to the row
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);

    newRow.setAttribute("class","tablerows");
    // Append the new row directly to the table (the div in your case)
    table.appendChild(newRow);
}


let filtervalue = document.getElementById("filteroptions");
filtervalue.onchange = () => {
    let rows = document.querySelectorAll("tr.tablerows");
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const categoryvalue = row.querySelector("td:nth-child(2)").textContent.trim();

        if (filtervalue.value === "Select a Category") {
            row.style.display = ""; // Reset display for all rows
        } else if (categoryvalue === filtervalue.value) {
            row.style.display = ""; // Show row if category matches
        } else {
            row.style.display = "none"; // Hide row if category doesn't match
        }
    }
};


function populateYearDropdown() {
    let currentYear = new Date().getFullYear();
    let startYear = 2000;
    let yearDropdown = document.getElementById('yearDropdown');

    for (let year = startYear; year <= currentYear; year++) {
        let option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", populateYearDropdown);

let categoryTotals = {};

function monthwisecontent(categoryName,totalAmount) {
    let monthWiseContentDetails = document.getElementById("monthwisecontent");
    let listItems = monthWiseContentDetails.getElementsByTagName("li");
    let found = false;
    for(let li of listItems){
        let [currentCategory, currentAmount] = li.textContent.split(": ₹");

        if(currentCategory === categoryName){
            currentAmount = currentAmount + totalAmount;
            li.textContent = `${currentCategory}: ₹${currentAmount}`;
            categoryTotals[categoryName] = currentAmount;
            found=true;
            break;
        }
    }
    if(!found){
        let li = document.createElement("li");
        li.textContent = `${categoryName}: ₹${totalAmount}`;
        monthWiseContentDetails.appendChild(li);
        categoryTotals[category] = totalAmount;
    }

}


