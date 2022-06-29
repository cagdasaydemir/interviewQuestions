function getUserInput() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = "";
  let userNumber = document.getElementById("user-number").value;
  console.log(textGenerator(formValidation(userNumber, errorMessage)))
  document.getElementById("user-number").value = "";
}

formValidation = (userInput, messageEl) => {
 const max = 50;
 const  min = 0;
  try {
    if (userInput == "") throw "empty";
    if (isNaN(userInput)) throw "not a number";
    userInput = Number(userInput);
    if (userInput < min) throw "too low";
    if (userInput > max) throw "too high";
    else return userInput;
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


