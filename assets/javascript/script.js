$("#generate").on("click", function() {

    
    var card = $("<div>");
    card.attr("class", "card");
    card.attr("style", "width: 18rem;");
    
    $(card).append(`
    <img src="https://assets3.thrillist.com/v1/image/2797371/size/tmg-article_default_mobile.jpg" class="card-img-top" alt="hamburger">
    <div class="card-body"></div>
    <h4 class="card-title">Hamburger</h4>
    <p class="card-text">The hamburger is an amazing way to eat a cow!</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
    `)
    
    $("#recipe").append(card);
})