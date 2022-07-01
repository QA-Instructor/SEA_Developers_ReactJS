import { displayMessage, displayErrorBorder, removeMessage } from './validationDisplay'; 

export let firstNameValid = false;
export let lastNameValid = false;

export const firstNameValidation = () => {
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
      displayMessage(msgFirstName, "The First Name entered is either too short or too long.")
    }
    displayErrorBorder(firstNameValid, firstNameInput );
 }

export const lastNameValidation = () => {
    const lastNameRegex = /^[a-zA-Z\'\-]+$/g;
    const lastName = document.forms[0]["lastName"].value;
    const lastNameInput = document.querySelector("#lastName");
    const msgLastName = document.querySelector("#msgLastName");
    if (lastName.length>1 && lastName.length < 25){
      if(!lastName.match(lastNameRegex)) {
        lastNameValid = false;
        displayMessage(msgLastName, "Only letters, hyphen and apostrohe are allowed.")
      }
      else{
        lastNameValid = true;
        removeMessage(msgLastName );
      }
    }
    else{
      lastNameValid = false;
      displayMessage(msgLastName, "The Last Name entered is either too short or too long.")
    }
    displayErrorBorder(lastNameValid, lastNameInput );
 }