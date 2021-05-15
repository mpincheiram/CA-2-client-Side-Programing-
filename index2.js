//event listener to add a food item to the food lists
$("#add-food").click(function(){

    //Checks if input data meets all requirements
    if(validateData($("#foodprice").val(), $("#foodname").val(), $("#fooddesc").val())){
        //Create elements with the data and appropriate classes
        let menuItem = $("<div></div>").addClass("menu-item");
        let foodItem = $("<div></div>").addClass("food-item");
        let itemTitle = $("<span></span>").text($("#foodname").val()).addClass("item-title");
        let itemDescription = $("<span></span>").text($("#fooddesc").val()).addClass("item-description");
        let itemPrice = $("<span></span>").text($("#foodprice").val()).addClass("item-price");
        let removeFood = $("<button></button>").text("Remove").addClass("remove-food");
        let breakTag = $("<br>");

        //append elements to the DOM
        foodItem.append(itemTitle);
        foodItem.append(breakTag);
        foodItem.append(itemDescription);
        menuItem.append(foodItem);
        menuItem.append(itemPrice);
        menuItem.append(removeFood);
        $(".foods").append(menuItem);

        //display message for success
        $("#add-info").text("Added Successully");
        $("#add-info").css("color", "green");

        //clear input boxes
        $("#foodname").val("");
        $("#foodprice").val("");
        $("#fooddesc").val("");
        
    }


    refreshEvent();
});

//refresh events and adds events for newly added items
function refreshEvent(){
    $(".remove-food").click(function(event){
        event.target.parentNode.remove();

        refreshEvent();
    });


    //Display suitable message if list is empty
    let myInfo = $("<h2></h2>").text("No Food Item Available").css({"text-align" : "center", "color" : "green"});
    if($(".foods").children().length < 1){
        $(".foods").append(myInfo);
    }
}


//validate data and returns true if all requirements are met
function validateData(txt1, txt2, txt3){
    if(isEmpty(txt1) || !isTitle(txt2) || !isDescription(txt3)){
        $("#add-info").text("");
        if(isEmpty(txt1)){
            $("#add-info").text(function(i, oldText){
                return oldText + "Price cannot be empty or zero (0), "; 
            });
        }
        if(!isTitle(txt2)){
            $("#add-info").text(function(i, oldText){
                return oldText + "Title must be between length of 3 to 20 characters, "; 
            });
        }
        if(!isDescription(txt3)){
            $("#add-info").text(function(i, oldText){
                return oldText + "Description must be greater than 10 characters, "; 
            });
        }
        $("#add-info").css("color", "red");

        return false;
    }
    else return true;
}


//Check if input is empty or of zero value
function isEmpty(param){
    return(param.length == "" || param == 0);
}

//Check if title is within length range
function isTitle(param){
    return(param.length > 2 && param.length < 21);
}

//Check if description is long enough
function isDescription(param){
    return(param.length > 10);
}



//event listener to remove food item from the list
$(".remove-food").click(function(event){
    event.target.parentNode.remove();

    refreshEvent();
});
