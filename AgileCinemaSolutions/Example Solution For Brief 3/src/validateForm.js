import { firstNameValid, lastNameValid } from './validateNames';
import { emailValid } from './validateEmail';
import submitForm from './submitForm';
import getFormData from './getFormData';

export const validateForm = () => {
    let user = {};
    if ( firstNameValid && lastNameValid && emailValid ){
        return user = getFormData();
    }
    else{
      alert("The form contains errors!");
    }
}