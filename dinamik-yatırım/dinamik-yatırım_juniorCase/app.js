
function formValidation() {

  
    let userNumber = document.getElementById("user-number").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (isNaN(userNumber) || userNumber < 1 || userNumber > 51) {
      text = "Input not valid";
    } else {
      text = "Input OK";
      document.getElementById("user-number").value = "";
    }
    document.getElementById("error-message").innerHTML = text;

    console.log(userNumber)
  }