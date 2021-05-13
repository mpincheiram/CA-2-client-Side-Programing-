let password = document.querySelector("#password");
let checkPassword = document.querySelector("#check-password");
let passwordInfo = document.querySelector("#password-info");

let calc = document.querySelector("#calculate");

var errors = new Array();

checkPassword.addEventListener('click', function(){
    checkValidity(password.value);
});

function checkValidity(txt){
    //empty the errors array
    errors = new Array();

    //validates the password
    if(txt === ""){
        errors.push("Password cannot be empty")
    }
    else {
        if(!isLong(txt)){
            errors.push("Text is shorter than eight letters");
        }
        if(!containsLowerCase(txt)) {
            errors.push("Text must contain Lowercase letter");
        }
        if(!containsUpperCase(txt)) {
            errors.push("Text must contain Uppercase letter");
        }
        if(!containsSymbol(txt)) {
            errors.push("Text must contain symbol");
        }
        if(!containsNumber(txt)){
            errors.push("Text must contain number");
        }
    }

    //print out error pleasant or error message
    if(errors.length < 1){
        passwordInfo.textContent = "Valid password";
        passwordInfo.style.color = "green";
    }
    else {
        passwordInfo.textContent = errors;
        passwordInfo.style.color = "red";
    }
}

function containsLowerCase(text){
    return /['a-z']/.test(text);
}

function containsUpperCase(text){
    return /['A-Z']/.test(text);
}

function containsNumber(text){
    return /\d/.test(text);
}

function containsSymbol(text){
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(text);
}

function isLong(text){
    return text.length > 7;
}







//store the list of menu items categories
var menu = [document.querySelectorAll(".starter-option"), document.querySelectorAll(".main-option"),
 document.querySelectorAll(".desert-option"), document.querySelectorAll(".drink-option")];

//Disables input boxes for unchecked items
menu.forEach(element => {
    element.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                this.parentNode.parentNode.childNodes[5].removeAttribute("disabled");
            } else {
                this.parentNode.parentNode.childNodes[5].setAttribute("disabled", "disabled");
            }
        });
    });
});









//store the list of result boxes
var results = document.querySelectorAll("input[name=result]");

function calculate(){
    var vegetarian = 0;
    var nonVegetarian = 0;
    var grandTotal = 0;
    var menuTotals = [];

    menu.forEach(element => {
        eachTotal = 0;
        element.forEach(function(option) {
            if(option.checked){
                var tot = option.parentNode.parentNode.childNodes[3].textContent*option.parentNode.parentNode.childNodes[5].value;

                if(option.nextSibling.nextSibling.childNodes[1].textContent.includes("(vegetarian)")){
                    vegetarian += tot;
                }
                else {
                    nonVegetarian += tot;
                }

                eachTotal += tot;
            }
        });

        grandTotal += eachTotal;
        menuTotals.push(eachTotal);
    });

    results[0].value = grandTotal;

    for(var i = 0; i < menuTotals.length; i++){
        results[i+1].value = menuTotals[i];
    }

    results[5].value = vegetarian;
    results[6].value = nonVegetarian;
}

calc.addEventListener('click', function(){
    calculate();
})