//Document ready
$(document).ready(function () {

    //Create an initial array of wordsToSearch
    var wordsToSearch = ["dogs", "Frozen", "Baby Shark", "Peppa Pig", "Taylor Swift", "Spiderman", "panda", "Elmo", "Happy Birthday", "Lego Movie", "yay", "Fortnite", "Minecraft"];

    //Create a button for each element of the array and show it in the buttons-go-here div
    function createButtons() {
        $("#buttons-go-here").empty();
        for (i = 0; i < wordsToSearch.length; i++) {
            var buttonWord = $("<button>");
            buttonWord.text(wordsToSearch[i]);
            buttonWord.addClass("btn btn-word-to-search btn-success");
            buttonWord.attr("data-name", wordsToSearch[i]);
            $("#buttons-go-here").append(buttonWord);
        }
    }

    createButtons();

    //Create a button for each new word the user inputs and show it with the rest of the buttons. 
    //Remember to add the code to prevent the page from reloading if the user clicks the button 
    $(document.body).on("click", ".add-word", function () {
        event.preventDefault();
        var newWord = $("#keyword").val();
        wordsToSearch.push(newWord);
        //console.log(newWord);
        createButtons();
        $("#keyword").val("");
    })

    //Create a var to catch the selected rating
    var rating = "g";
    $(document.body).on("click", ".form-check-input", function () {
        if ($("input[type='radio'].form-check-input").is(':checked')) {
            rating = $("input[type='radio'].form-check-input:checked").val();
            console.log(rating);

        }
    })

    //Create a .ajax to call the gifs with the selected rating and the word from the button. Show 10 in the gifs-go-here div
    //Make the gifs appear static the first time, move when clicked and stop when clicked again
    $(document.body).on("click", ".btn-word-to-search", function () {

        var searcht = $(this).attr("data-name")
        var searchterm = searcht.replace(" ", "%20");
        var limit = 10;

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Q0tY5PqO7bjFtAhhEM4rRK0fvzUa8pp5&q=" + searchterm + "&rating=" + rating + "&limit=" + limit;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;
            var jumboWord = $("<div>")
            jumboWord.html("<h2>" + searcht + "</h2>");
            jumboWord.addClass("jumbotron gifsContainer clearfix text-info");
            $("#gifs-go-here").prepend(jumboWord);

            for (var i = 0; i < results.length; i++) {

                var Card = $("<div>");
                Card.addClass("card border-info mb-3 clearfix");
                (jumboWord).append(Card);
                //Call src for stills and animates of each gif
                Card.html("<img src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still' class='gif'>")
                Card.append("<p>" + results[i].title + "</p>");
                Card.append("<p>Rating: " + results[i].rating + "</p>");
            }

            //Click to animate and stop each gif function
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");


                if (state === "still") {
                    $(this).attr("src", ($(this).attr("data-animate")));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", ($(this).attr("data-still")));
                    $(this).attr("data-state", "still");
                }
            });

        });

    })
  

}); //closing of document ready
