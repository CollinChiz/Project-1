$(document).ready(function () {

    var ingredients = [];
    var addIngredients = "";



    $("#submit-button").on("click", function(e) {

        e.preventDefault();
        addIngredients = $("#my-food").val().trim();
        addIngredients = addIngredients.replace(/\s+/g, "").toLowerCase();
        addIngredients = addIngredients.split(",");

        for (i = 0; i < addIngredients.length; i++) {
            ingredients.push(addIngredients[i]);
        }

        for (i = 0; i < addIngredients.length; i++) {
            var newP = $("<p>");
            newP.text(addIngredients[i]);
            newP.addClass("food-text-style");
            $("#pantry-div").append(newP);
        }

        $("#my-food").val("");
    });



    $("#submit").on("click", function (event) {
        
        addRecipeRow();
        event.preventDefault();
        $("#container-4").empty();
        edamamApi();
        recipePuppyApi();
    });







    $("#reset-button").on("click",function(e) {
        e.preventDefault();
        $("#pantry-div").empty();
        $("#container-4").empty();
        ingredients = [];
        addIngredients = "";
    });
    


    

    function edamamApi() {
        var appKey = "c31de725535780190b9ff532d8eb8706";
        var appId = "d0ac8702";

        var ingredientString = ingredients.join(" ");

        var queryURL = "https://api.edamam.com/search?q=" + ingredientString + "&app_id=" + appId + "&app_key=" + appKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (i = 0; i < response.hits.length; i++) {


                var recipeName = response.hits[i].recipe.label;
                var recipeImage = response.hits[i].recipe.image;
                var recipeCals = response.hits[i].recipe.calories;
                recipeCals = Math.floor(recipeCals);
                var recipeURL = response.hits[i].recipe.url;
                var recipeIngredients = response.hits[i].recipe.ingredientLines;
                addRecipeRow(recipeName, recipeImage, recipeURL, recipeCals, recipeIngredients)
            }
        })
    }
    function recipePuppyApi() {
        console.log(ingredients);
        var ingredientString = ingredients.join(",");
        var queryURL = "https://recipe-puppy.p.rapidapi.com/?p=1&i=" + ingredientString;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
                "x-rapidapi-key": "e9f470e923msh1d7aabd0ff0db38p18efc3jsnc8efd1593048"

            }
        }
        $.ajax(settings).done(function (response) {
            var json = JSON.parse(response);
            console.log(json);





            for (i = 0; i < json.results.length; i++) {
                var recipeName = json.results[i].title;
                var recipeImage = json.results[i].thumbnail;
                var recipeURL = json.results[i].href;
                var recipeCals = "No information available";
                var recipeIngredients = json.results[i].ingredients.split(", ");
                addRecipeRow(recipeName, recipeImage, recipeURL, recipeCals, recipeIngredients)
            }
        });
    };
    function addRecipeRow(recipeName, recipeImage, recipeURL, recipeCals, recipeIngredients) {
      
        
        var newDiv = $("<div>");
        newDiv.addClass("card");

        var newImg = $("<img>");
        newImg.attr("src", recipeImage);
        newImg.attr("height", "400px");
        newImg.attr("width", "400px");
        newDiv.append(newImg);

        var cardTitle = $("<h5>");
        cardTitle.addClass("card-title");

        var cardLink = $("<a>");
        cardLink.attr("href", recipeURL);
        cardLink.text(recipeName);

        cardTitle.append(cardLink);
        newDiv.append(cardTitle);




                var colOne = $("<div>");
                colOne.addClass("col-md-6");
                colOne.addClass("green");
                colOne.append("<h3>You have:</h3>")

                var colTwo = $("<div>");
                colTwo.addClass("col-md-6");
                colTwo.addClass("red");
                colTwo.append("<h3>You need:</h3>")


        var cardBody = $("<div>");
        cardBody.addClass("col-sm-12");
        cardBody.addClass("card-body");

        var newRow = $("<div>");
        newRow.addClass("row");

        var colOne = $("<div>");
        colOne.addClass("col-md-6");
        colOne.addClass("green");

        var colTwo = $("<div>");
        colTwo.addClass("col-md-6");
        colTwo.addClass("red");

        for(k = 0; k < ingredients.length; k++) {
            colOne.append("<p>" + ingredients[k] + "</p>")
        }

        var ingredientsNeeded = _.difference(recipeIngredients, ingredients);
        console.log(ingredientsNeeded);


               


   
        for(j = 0; j < ingredientsNeeded.length; j++) {
            colTwo.append("<p>" + ingredientsNeeded[j] + "</p>");
        }
       

        newRow.append(colOne);
        newRow.append(colTwo);


        cardBody.append(newRow);

        cardBody.append("<p>Calories: " + recipeCals + "</p>");


        newDiv.append(cardBody);

        $("#container-4").append(newDiv);
    };

});
