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

           
       });
});
