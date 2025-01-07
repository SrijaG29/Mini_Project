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
        newele = document.createElement("textarea");
        newele.setAttribute("id","otherinput")
        // This is to take only aphabelts in otherinput textarea element
        container.addEventListener("input", function(event) {
            // Remove any non-alphabet characters
        event.target.value = event.target.value.replace(/[^A-Za-z ]+/g, '');
        });
        container.appendChild(newele);
    }
};

function getdetails(event){
    // event.preventDefault()
    let category
    if(document.getElementById("options").value === "Other"){
        category = document.getElementById("otherInputContainer").querySelector("textarea").value
    }
    else{
        category = document.getElementById("options").value
    }
    console.log(category)
    let details = {
        expenseName: document.getElementById("expenseName").value,
        category: category,
        totalAmount: document.getElementById("totalAmount").value
    };
    console.log(details)
    localStorage.setItem("detail", JSON.stringify(details));
}




