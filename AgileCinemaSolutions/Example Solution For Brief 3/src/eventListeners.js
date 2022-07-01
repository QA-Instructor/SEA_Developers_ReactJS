import { submitForm } from './submitForm';
import { firstNameValidation, lastNameValidation} from './validateNames';
import { emailValidation } from './validateEmail';

const activateEventListeners = () => {
    document.querySelector('#signUpForm').addEventListener('submit', submitForm);
    document.querySelector('#firstName').addEventListener('change', firstNameValidation);
    document.querySelector('#lastName').addEventListener('change', lastNameValidation);
    document.querySelector('#email').addEventListener('change', emailValidation);
}

export default activateEventListeners;
