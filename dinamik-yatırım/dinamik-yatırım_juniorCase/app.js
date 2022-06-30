let words = [];
const wordItemsLS = localStorage.getItem("wordItemsLS");
if (wordItemsLS) {
  words = JSON.parse(wordItemsLS);
}

let Word = {
  id: 0,
  text: "",
  length: 0,
};

const tBodyEl = document.getElementsByTagName("tbody")[0];

function getUserInput() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = "";
  let userNumber = document.getElementById("user-number").value;
  formValidation(userNumber, errorMessage);
}

const idGenerator = () => {
  return Math.floor(Math.random() * 100000 + 1);
};

formValidation = (userInput, messageEl) => {
  const max = 50;
  const min = 1;
  try {
    if (userInput == "") {
      throw "empty";
    } else if (isNaN(userInput)) {
      throw "not a number";
    } else if (userInput < min) {
      userInput = Number(userInput);
      throw "too low";
    } else if (userInput > max) {
      userInput = Number(userInput);
      throw "too high";
    } else {
      textGenerator(userInput, 100);
      document.getElementById("user-number").value = "";
    }
  } catch (err) {
    messageEl.innerHTML = "Input is " + err;
  }
};

textGenerator = (textLength, quantity) => {
  var characters = "abcçdefgğhıijklmnoöprsştuüvyz";
  var charactersLength = characters.length;
  var result = "";
  for (let j = 0; j < quantity; j++) {
    var result = "";
    for (var i = 0; i < textLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    wordItem = {
      ...Word,
      id: idGenerator(),
      text: result,
      length: textLength,
    };
    words = [...words, wordItem];
  }
  saveWordsToLS();
};

const saveWordsToLS = () => {
  localStorage.setItem("wordItemsLS", JSON.stringify(words));
};

const insertWordItemsToList = (wordList) => {
  for (let i = 0; i < wordList.length; i++) {
    let addedItem = ` <tr>
    <th scope="row">${wordList[i].id}</th>
    <td>${wordList[i].text}</td>
    <td>${wordList[i].length}</td>
  </tr>`;

    tBodyEl.insertAdjacentHTML("afterbegin", addedItem);
  }
};

document.getElementById("getir-btn").addEventListener("click", function () {
  insertWordItemsToList(words);
});
