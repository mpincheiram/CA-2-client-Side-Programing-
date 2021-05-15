
$("#add-food").click(function(){


    if(validateData($("#foodprice").val(), $("#foodname").val(), $("#fooddesc").val())){
        let menuItem = $("<div></div>").addClass("menu-item");
        let foodItem = $("<div></div>").addClass("food-item");
        let itemTitle = $("<span></span>").text($("#foodname").val()).addClass("item-title");
        let itemDescription = $("<span></span>").text($("#fooddesc").val()).addClass("item-description");
        let itemPrice = $("<span></span>").text($("#foodprice").val()).addClass("item-price");
        let removeFood = $("<button></button>").text("Remove").addClass("remove-food");

        foodItem.append(itemTitle);
        foodItem.append(itemDescription);
        menuItem.append(foodItem);
        menuItem.append(itemPrice);
        menuItem.append(removeFood);
        $(".foods").append(menuItem);

        $("#add-info").text("Added Successully");
        $("#add-info").css("color", "green");

        //clear input boxes
        $("#foodname").val("");
        $("#foodprice").val("");
        $("#fooddesc").val("");
    }

    refreshEvent();
});

function refreshEvent(){
    $(".remove-food").click(function(event){
        event.target.parentNode.remove();
    });

    let myInfo = $("<h2></h2>").text("No Food Item Available").css({"text-align" : "center", "color" : "green"});
    if($(".foods").children().length < 1){
        $(".foods").append(myInfo);
    }
}

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

function isEmpty(param){
    return(param.length == "" || param == 0);
}

function isTitle(param){
    return(param.length > 2 && param.length < 21);
}

function isDescription(param){
    return(param.length > 10);
}









$(".remove-food").click(function(event){
    event.target.parentNode.remove();

    refreshEvent();
});
