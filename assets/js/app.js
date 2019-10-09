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

    $("#reset-button").on("click",function(e) {
        e.preventDefault();
        $("#pantry-div").empty();
        $("#container-3").empty();
        ingredients = [];
        addIngredients = "";
    });
    


    $("#submit").on("click", function (e) {
        e.preventDefault();

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

                var newRow = $("<div>");
                newRow.addClass("row");

                var colOne = $("<div>");
                colOne.addClass("col-md-6");
                colOne.addClass("green");
                colOne.append("<h3>You have:</h3>")

                var colTwo = $("<div>");
                colTwo.addClass("col-md-6");
                colTwo.addClass("red");
                colTwo.append("<h3>You need:</h3>")

                for (j = 0; j < recipeIngredients.length; j++) {
                    var isInArray = false;
                    
                    for (k = 0; k < ingredients.length; k++) {
                        if (recipeIngredients[j].includes(ingredients[k])) {
                            colOne.append("<p>" + recipeIngredients[j] + "</p><br/>");
                            isInArray = true;
                        }
                    }

                    if(!isInArray) {
                        colTwo.append("<p>" + recipeIngredients[j] + "</p><br/>");
                    }

                }

                newRow.append(colOne);
                newRow.append(colTwo);

                cardBody.append(newRow);

                cardBody.append("<p>Calories: " + recipeCals + "</p>");

                newDiv.append(cardBody);

                $("#container-3").append(newDiv);


            };

        });

    });


$("#submit").on("click", function(event){
    event.preventDefault();
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

               $("#container-3").append(newDiv);
               
           };
       });


           
       });



    /*var provider = new firebase.auth.GoogleAuthProvider();

    function signIn() {

    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    };

    signIn();*/

});

