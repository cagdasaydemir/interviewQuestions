let words = [];
let Word = {
  id: 0,
  text: "",
  length: 0,
};

const wordItemsLS = localStorage.getItem("wordItemsLS");
const tBodyEl = document.getElementsByTagName("tbody")[0];
const alertIcon = `<i class="align-self-center mx-2 fa-solid fa-triangle-exclamation"></i>`;

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
      throw "boş";
    } else if (isNaN(userInput)) {
      throw "bir sayı değil";
    } else if (userInput < min) {
      userInput = Number(userInput);
      throw "çok küçük";
    } else if (userInput > max) {
      userInput = Number(userInput);
      throw "çok büyük";
    } else {
      textGenerator(userInput, 100);
      document.getElementById("user-number").value = "";
    }
  } catch (err) {
    messageEl.innerHTML = "Girdi " + err;
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

$(document).ready(function () {
  var initialEmpty = [];
  var message = " ";

  var table = $("#text-table").DataTable({
    data: initialEmpty,
    columns: [
      {
        data: "id",
        title: "#ID",
      },
      {
        data: "text",
        title: "Metin",
      },
      {
        data: "length",
        title: "Uzunluk",
      },
    ],
    language: {
      emptyTable: '<span class="datatables-empty-message"></span>',
    },
    drawCallback: function (settings) {
      $(".datatables-empty-message").text(message);
    },
    paging: false,
    searching: false,
    info: false,
    bInfo: false,
  });
  $("#getir-btn").click(function () {
    message =
      "Veritabanında Hiç bir Metin Bulunmuyor, Lütfen Yukardan Metin Ekleyiniz";
    table.clear().rows.add(words).draw();
  });
  $("#clear-btn").click(function () {
    if (words.length === 0) {
      message = "Veritabanında Zaten Hiçbir Metin Yok";
    } else {
      message = "Bütün Metinleri Sildiniz !";
      words = [];
      saveWordsToLS();
    }
    table.clear().rows.add(words).draw();
  });
});

const saveWordsToLS = () => {
  localStorage.setItem("wordItemsLS", JSON.stringify(words));
};
