//Document ready

//Create an array of wordsToSearch

var wordsToSearch = ["dogs","Frozen","Baby Shark","Peppa Pig"];

//Create a button for each element of the array and show it in the buttons-go-here div


function createButtons () {
$("#buttons-go-here").empty();
for (i=0; i<wordsToSearch.length; i++) {
var buttonWord = $("<button>");
buttonWord.text(wordsToSearch[i]);
buttonWord.addClass("btn-word-to-search btn-success");
buttonWord.attr("data-name",wordsToSearch[i]);
$("#buttons-go-here").append(buttonWord);
}
}

createButtons();

//Create a button for each new word the user inputs and show it with the rest of the buttons. 
//Remember to add the code to prevent the page from reloading if the user clicks the button 

$(document.body).on("click", ".add-word", function() {
event.preventDefault();
var newWord = $("#keyword").val();
wordsToSearch.push(newWord);
//console.log(newWord);
createButtons();
$("#keyword").val("");
})

//Create a var to catch the selected rating
var selectedRating = [];
$(document.body).on("click", ".rating", function() {

if($("input[type='checkbox'].rating").is(':checked')) {
     	selectedRating = selectedRating+$("input[type='checkbox'].rating:checked").val();
    alert(selectedRating);

}
console.log(selectedRating);

})

//Create a .ajax to call the gifs with the selected rating and the word from the button. Show 10 in the gifs-go-here div

//Make the gifs appear static the first time, move when clicked and stop when clicked again

//Show extra info about the gifs


