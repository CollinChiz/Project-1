$(document).ready(function () {

    $("#submit").on("click", function (e) {
        e.preventDefault();

        /*var ingredients = $("#ingredients").val().trim();
        ingredients = ingredients.replace(/\s+/g, "").toLowerCase();
        console.log(ingredients);



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
        });*/

        var ingredients = $("#ingredients").val().trim();
        ingredients = ingredients.replace(/\s+/g, "").toLowerCase();
        ingredients = ingredients.split(",");


        var appKey = "c31de725535780190b9ff532d8eb8706";
        var appId = "d0ac8702";

        // var queryURL = "https://api.edamam.com/search?q=" + ingredients[0] + " " + ingredients[1] + "&app_id=" + appId + "&app_key=" + appKey;

        var queryURL = "https://api.edamam.com/search?q=";

        for (i = 0; i < ingredients.length; i++) {
            queryURL += ingredients[i];
            queryURL += " ";
        }

        queryURL = queryURL + "&app_id=" + appId + "&app_key=" + appKey;

        console.log(queryURL);

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