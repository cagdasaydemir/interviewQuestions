// const tBodyEl = document.getElementsByTagName("tbody")[0];

function getUserInput() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = "";
  let userNumber = document.getElementById("user-number").value;
  formValidation(userNumber, errorMessage);
  document.getElementById("user-number").value = "";
}

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
      console.log(textGenerator(userInput));
    }
  } catch (err) {
    messageEl.innerHTML = "Input is " + err;
  }
};

textGenerator = (length) => {
  var quantity = 100;
  var resultArr = [];
  var characters = "abcçdefgğhıijklmnoöprsştuüvyz";
  var charactersLength = characters.length;
  for (let j = 0; j < quantity; j++) {
    var result = "";
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    resultArr[j] = result;
  }
  return resultArr;
};

// addItemToHTML = () => {
//   let addedItem = ` <tr>
//   <th scope="row">1</th>
//   <td>Mark</td>
//   <td>Otto</td>
// </tr>`;
// tBodyEl.insertAdjacentHTML("beforeend", addedItem);
// };

// addItemToHTML();
