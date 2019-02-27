$( document ).ready(function() {
    var topics = ["golden retriever", "black lab", "beagle", "irish setter", "german shepherd", "doberman", "chihuahua", "dachshund", "collie"];

    function makeButtons() { 

    for (var i = 0; i < topics.length; i++) {
        var dogButton = $("<button>");
        dogButton.addClass("dog");
        dogButton.attr("data-breed", topics[i]);
        dogButton.text(topics[i]);
        dogButton.css({"background-color": 	"#6495ED", "color": "white", "padding": "10px", "margin": "10px"});
        $("#buttonDiv").append(dogButton);
    } //closes for loop

    $("button").on("click", function() {
        var breed = $(this).attr("data-breed");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed +  "&api_key=aDLhH1g6V8UK4p4fXcLv8AqFoN8yE7V0&limit=10&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              var results = response.data;

              for (var i = 0; i < results.length; i++) {

                var dogDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                p.css("margin", "20px");
                dogDiv.css("float", "left");
                var dogImage = $("<img>");
                dogImage.css("margin", "5px 20px 20px 20px");

                dogImage.attr({"src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url});
                dogImage.attr("data-state", "still");
                dogImage.addClass("dogimage");
    
                dogDiv.append(p);
                dogDiv.append(dogImage);
    
                $("#gifField").prepend(dogDiv);             
              } //closes for loop

              $(".dogimage").on("click", function() {  
                var state = $(this).attr("data-state");   
                console.log("click");         
               
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));                    
                    $(this).attr("data-state", "animate");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));                    
                    $(this).attr("data-state", "still");
                  }         
            }); // closes dogimage on click

        }); //closes ajax call

    }); //closes dogbutton on click 

} // closes makeButtons function

makeButtons();

    $("#submit").on("click", function() {  
        var newDog = $("#inputBox").val();
        topics.push(newDog);
        remakeButtons();
    }); //closes submit on click

    function remakeButtons() {
        $("#buttonDiv").empty();
        makeButtons();        
    } //closes remakeButtons
   
}); // closes doc ready