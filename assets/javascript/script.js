$("#submit-button").on("click", function(e){
    e.preventDefault();
    var foodItem = $("#my-food").val();
    var foodParagraph = $("<p>");
    foodParagraph.text(foodItem);
    foodParagraph.addClass("food-text-style");
    $("#pantry-div").prepend(foodParagraph);

    console.log(foodParagraph);
});

$("#reset-button").on("click",function(e) {
    e.preventDefault();
    $("#pantry-div").empty();
});








