let words = [];
let Word = {
    id: 0,
    text: "",
    length: 0,
};

const wordItemsLS = localStorage.getItem("wordItemsLS");
const tBodyEl = document.getElementsByTagName("tbody")[0];
const alertIcon = `<i class="align-self-center mx-1 fa-solid fa-triangle-exclamation"></i>`;

if (wordItemsLS) {
    words = JSON.parse(wordItemsLS);
}

const idGenerator = () => {
    return Math.floor(Math.random() * 100000 + 1);
};

const getUserInput = () => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";
    let userNumber = document.getElementById("user-number").value;
    formValidation(userNumber, errorMessage);
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
        messageEl.insertAdjacentHTML("afterbegin", alertIcon);
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