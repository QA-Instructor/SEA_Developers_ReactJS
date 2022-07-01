import User from './user';

const getFormData = () => {
    let title = document.querySelector("#title").value;
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let phoneNumber = document.querySelector("#phoneNumber").value;
    let dob = document.querySelector("#dob").value;
    let gender = document.querySelector('input[name="genderRadios"]:checked').value;

    let newUser = new User(title, firstName, lastName, email, phoneNumber, dob, gender);
    return newUser;
}

export default getFormData;