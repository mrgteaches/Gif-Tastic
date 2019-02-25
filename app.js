$( document ).ready(function() {
    var topics = ["golden retriever", "labrador retriever", "beagle", "irish setter", "german shepherd", "doberman", "chihuahua", "dachshund", "collie"];

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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed +  "&api_key=aDLhH1g6V8UK4p4fXcLv8AqFoN8yE7V0&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              var results = response.data;

              // Looping through each result item
              for (var i = 0; i < results.length; i++) {
    
                // Creating and storing a div tag
                var dogDiv = $("<div>");
    
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
    
                // Creating and storing an image tag
                var dogImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                dogImage.attr("src", results[i].images.fixed_height.url);
    
                // Appending the paragraph and image tag to the animalDiv
                dogDiv.append(p);
                dogDiv.append(dogImage);
    
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifField").prepend(dogDiv);
              }
        }); //closes .then



    }); //closes on click 






}); // closes doc ready