let firstNameValid = false;
let lastNameValid = false;
let emailValid = false;

//Event handlers
document.querySelector('#form').addEventListener('submit', validateForm);
document.querySelector('#firstName').addEventListener('change', firstNameValidation);
document.querySelector('#lastName').addEventListener('change', lastNameValidation);
document.querySelector('#email').addEventListener('change', emailValidation);

function validateForm(evt){
  evt.preventDefault();
  if ( firstNameValid && lastNameValid && emailValid ){
    return true;
  }
  else{
    alert("The form contains errors!");
    return false;
  }
}

function firstNameValidation(){
   const firstNameRegex = /^[a-zA-Z]+$/;
   const firstName = document.forms[0]["firstName"].value;
   const firstNameInput = document.querySelector("#firstName");
   const msgFirstName = document.querySelector("#msgFirstName");
   if (firstName.length>1 && firstName.length < 15){
     if(!firstName.match(firstNameRegex)) {
       firstNameValid = false;
       displayMessage( msgFirstName, "Only lower and upper case letters are allowed");
     }
     else{
       firstNameValid = true;
       removeMessage( msgFirstName );
     }
   }
   else{
     firstNameValid = false;
     displayMessage( msgFirstName, "The First Name entered is either too short or too long.")
   }
   displayErrorBorder( firstNameValid, firstNameInput );
}

function lastNameValidation(){
   const lastNameRegex = /^[a-zA-Z\'\-]+$/g;
   const lastName = document.forms[0]["lastName"].value;
   const lastNameInput = document.querySelector("#lastName");
   const msgLastName = document.querySelector("#msgLastName");
   if (lastName.length>1 && lastName.length < 25){
     if(!lastName.match(lastNameRegex)) {
       lastNameValid = false;
       displayMessage( msgLastName, "Only letters, hyphen and apostrohe are allowed.")
     }
     else{
       lastNameValid = true;
       removeMessage( msgLastName );
     }
   }
   else{
     lastNameValid = false;
     displayMessage( msgLastName, "The Last Name entered is either too short or too long.")
   }
   displayErrorBorder( lastNameValid, lastNameInput );
}

function emailValidation(){
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const email = document.forms[0]["email"].value;
  const emailInput = document.querySelector("#email");
  const msgEmail = document.querySelector("#msgEmail");
  if(!email.match(emailRegex)) {
    emailValid = false;
    displayMessage( msgEmail, "Email address not valid")
  }
  else{
    emailValid = true;
    removeMessage( msgEmail );
  }
  displayErrorBorder( emailValid, emailInput );
}

function displayErrorBorder( inputValid, element ){
  if ( !inputValid ){
    if ( !element.classList.contains("invalid") ){
      element.classList.toggle("invalid");
    }
  }
  else{
    if ( element.classList.contains("invalid") ){
      element.classList.toggle("invalid");
    }
  }
}

function displayMessage( element, message ){
  const msgcontent = document.createElement("div");
  msgcontent.id = "msgcontent";
  element.appendChild(msgcontent);
  msgcontent.innerHTML = message;
}

function removeMessage( element ){
  if (element.childNodes.length > 0 ){
    const noChildren = element.childNodes.length
    for( i=0; i< noChildren ; i++){
      element.removeChild(element.firstChild);
    }
  }
}
