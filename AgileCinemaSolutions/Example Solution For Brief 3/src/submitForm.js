import { validateForm } from "./validateForm";

const newUserUrl = `http://localhost:3000/users`;

export const submitForm = event => {
    event.preventDefault();
    let user = validateForm();
    if(user) {
        sendForm(user)
            .then(response => {
                response.ok ? alert(`Data submitted`) : alert(`There was a problem submitting the data`);
            });
    }
}

async function sendForm(user) {
    let userToSubmit = JSON.stringify(user);

    let response = await fetch(newUserUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: userToSubmit
    });
    return response;
}