import { displayMessage, displayErrorBorder, removeMessage } from './validationDisplay'; 

export let emailValid = false;

export const emailValidation = () => {
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const email = document.forms[0]["email"].value;
    const emailInput = document.querySelector("#email");
    const msgEmail = document.querySelector("#msgEmail");
    if(!email.match(emailRegex)) {
      emailValid = false;
      removeMessage( msgEmail );
      displayMessage( msgEmail, "Email address not valid")
    }
    else{
      emailValid = true;
      removeMessage( msgEmail );
    }
    displayErrorBorder( emailValid, emailInput );
  }