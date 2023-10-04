const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruits = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];
let selectedFruit;

function search(str) {
  let results = [];

  fruits.forEach((fruit) => {
    // ignore case of input and fruit
    let compareFruit = fruit.toLowerCase();
    let compareInput = input.value.toLowerCase();

    if (compareFruit.includes(compareInput)) {
      // if the fruit string contains the search string
      results.push(fruit); // add the fruit to possibleFruits
    }
  });

  if (results.length === 0) {
    results = ["No results"];
  }

  return results;
}

function searchHandler(e) {
  if (input.value != "") {
    //if there is a value input
    let results = search(input.value);
    suggestions.classList.add("has-suggestions");
    showSuggestions(results, input.value);
  } else {
    // show nothing if blank
    suggestions.classList.remove("has-suggestions");
    suggestions.innerHTML = "";
  }
}

function showSuggestions(results, inputVal) {
  //clear suggestions
  suggestions.innerHTML = "";

  //add suggestions
  results.forEach((fruit) => {
    //create lowercase versions of input and fruit to compare
    let lowerCaseFruit = fruit.toLowerCase();
    let lowerCaseInput = inputVal.toLowerCase();

    //find the start of the substring within the fruit
    const indexOfSubString = lowerCaseFruit.indexOf(lowerCaseInput);

    let formattedSuggestion = formatSuggestion(
      fruit,
      indexOfSubString,
      lowerCaseInput.length
    );

    let suggestion = document.createElement("li");
    suggestion.innerHTML = formattedSuggestion;
    suggestion.setAttribute("data-fruit", fruit); //set the fruit name for recalling on click
    suggestion.addEventListener("click", useSuggestion);
    suggestions.append(suggestion);
  });
}

function formatSuggestion(fruit, indexOfSub, subStringLength) {
  if (fruit !== "No results") {
    let suggestion;
    if (indexOfSub === 0) {
      suggestion =
        "<span class='highlite'>" +
        fruit.substring(0, subStringLength) +
        "</span>" +
        fruit.substring(subStringLength, fruit.length);
    } else {
      suggestion =
        fruit.substring(0, indexOfSub) +
        "<span class='highlite'>" +
        fruit.substring(indexOfSub, indexOfSub + subStringLength) +
        "</span>" +
        fruit.substring(indexOfSub + subStringLength, fruit.length);
    }
	return suggestion;
  } else {
	return fruit;
  }
}

function useSuggestion(e) {
  input.value = e.target.getAttribute("data-fruit"); //get the fruit name from the list
  suggestions.innerHTML = ""; // hide suggestions
}

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
//suggestions.addEventListener('onmouseout', mouseOutHandler)
