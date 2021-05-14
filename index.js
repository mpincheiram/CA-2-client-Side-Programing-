//PASSWORD SECTION

let password = document.querySelector("#password");
let checkPassword = document.querySelector("#check-password");
let passwordInfo = document.querySelector("#password-info");

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


//Checks if a condition is met
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






//CUSTOMERS SECTION

let customers = document.querySelector(".customers");

var imgClass = ['portrait', 'profile', 'figure', 'face', 'head', 'profile'];

for(var i = 0; i < 5; i++){
    // GET Request.
    fetch('https://randomuser.me/api/')
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => generateImage(json))
    .catch(err => console.log('Request Failed', err)); // Catch errors

}

function generateImage(json){
    // GET Request.
    fetch('https://source.unsplash.com/800x600/?' + imgClass[Math.floor(Math.random()*6)] + "," + imgClass[Math.floor(Math.random()*6)])
    // Handle success
    .then(response => addCustomer(response.url, json))
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function addCustomer(im, info){
    let data = info.results[0];
    console.log(data);

    let cust = document.createElement("div");
    cust.classList.add("customer");

    let name = document.createElement("p");
    name.classList.add("customer-name");
    name.textContent = "Name : " + data.name.first;
    cust.appendChild(name);

    let image = document.createElement("div");
    image.classList.add("image-container");
    image.innerHTML = `<img class="gallery-image" src="${im}" alt="gallery image"/>`;
    cust.appendChild(image);

    let phone = document.createElement("p");
    phone.textContent = "Phone number : " +  data.phone;
    cust.appendChild(phone);

    let dob = document.createElement("p");
    dob.textContent = "DOB : " +  data.dob.date;
    cust.appendChild(dob);

    let age = document.createElement("p");
    age.textContent = "Age : " +  data.dob.age;
    cust.appendChild(age);

    let email = document.createElement("p");
    email.textContent = "Email : " +  data.email;
    cust.appendChild(email);

    let gender = document.createElement("p");
    gender.textContent = "Gender : " +  data.gender;
    cust.appendChild(gender);

    let city = document.createElement("p");
    city.textContent = "City : " +  data.location.city;
    cust.appendChild(city);

    let country = document.createElement("p");
    country.textContent = "Country : " +  data.location.state;
    cust.appendChild(country);

    let postcode = document.createElement("p");
    postcode.textContent = "PostCode : " +  data.location.postcode;
    cust.appendChild(postcode);

    customers.appendChild(cust);
}









//MENU SECTION



let calc = document.querySelector("#calculate");

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


//method to calculate and get summary for selected items
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


//event listener for calculate button
calc.addEventListener('click', function(){
    calculate();
})