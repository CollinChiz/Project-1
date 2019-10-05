
$("#submit").on("click", function(event){
    event.preventDefault();
    var ingredients = $("#ingredients").val().trim();
       ingredients = ingredients.replace(/\s+/g, "").toLowerCase();
       console.log(ingredients);
       var ingredientsArray = ingredients.split(",");
       console.log(ingredientsArray);
       var queryURL = "https://recipe-puppy.p.rapidapi.com/?p=1&i=" + ingredients;
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
           

           
      

           for(i = 0; i < json.results.length; i++) {
               var recipeName = json.results[i].title;
               var recipeImage = json.results[i].thumbnail;
               var recipeUrl = json.results[i].href;
               var recipeCals = "No information available";

               var newDiv = $("<div>");
               newDiv.addClass("card");

               var newImg = $("<img>");
               newImg.attr("src", recipeImage);
               newDiv.append(newImg);

               var cardTitle = $("<h5>");
               cardTitle.addClass("card-title");

               var cardLink = $("<a>");
               cardLink.attr("href", recipeUrl);
               cardLink.text(recipeName);

               cardTitle.append(cardLink);
               newDiv.append(cardTitle);

               var cardBody = $("<div>");
               cardBody.addClass("card-body");

               cardBody.append("<p>Calories: " + recipeCals + "</p>");

               newDiv.append(cardBody);

               $(".recipes").append(newDiv);
               $(".recipes").append(newDiv);





           };
       });


           
       });
});

$(document).ready(function () {

    var ingredients = [];
    var addIngredients = "";

    $("#addIngredient").on("click", function() {
        addIngredients = $("#ingredientInput").val().trim();
        addIngredients = addIngredients.replace(/\s+/g, "").toLowerCase();
        addIngredients = addIngredients.split(",");

        for (i = 0; i < addIngredients.length; i++) {
            ingredients.push(addIngredients[i]);
        }

        for (i = 0; i < addIngredients.length; i++) {
            $(".ingredients").append(addIngredients[i] + " ");
        }

        $("#ingredientInput").val("");
    });

    $("#submit").on("click", function (e) {
        e.preventDefault();

        var appKey = "c31de725535780190b9ff532d8eb8706";
        var appId = "d0ac8702";

        ingredients = ingredients.join(" ");

        var queryURL = "https://api.edamam.com/search?q=" + ingredients + "&app_id=" + appId + "&app_key=" + appKey;

        /*var queryURL = "https://api.edamam.com/search?q=";

        for (i = 0; i < ingredients.length; i++) {
            queryURL += ingredients[i];
            queryURL += " ";
        }

        queryURL = queryURL + "&app_id=" + appId + "&app_key=" + appKey;

        console.log(queryURL);*/

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

                var newDiv = $("<div>");
                newDiv.addClass("card");

                var newImg = $("<img>");
                newImg.attr("src", recipeImage);
                newDiv.append(newImg);

                var cardTitle = $("<h5>");
                cardTitle.addClass("card-title");

                var cardLink = $("<a>");
                cardLink.attr("href", recipeURL);
                cardLink.text(recipeName);

                cardTitle.append(cardLink);
                newDiv.append(cardTitle);



                var cardBody = $("<div>");
                cardBody.addClass("card-body");

                cardBody.append("<p>Calories: " + recipeCals + "</p>");

                newDiv.append(cardBody);

                $(".recipes").append(newDiv);


            };

        });

    });

});

