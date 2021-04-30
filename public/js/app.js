const inputName = document.getElementById('inputName');
const inputLastName = document.getElementById('inputLastName');
const inputArea = document.getElementById('inputArea');
const selectSchoolLevel = document.getElementById('selectSchoolLevel');
const inputLatitude = document.getElementById('inputLatitude');
const inputLongitude = document.getElementById('inputLongitude');
const inputPhoto = document.getElementById('inputPhoto');

const savePic = document.getElementById('savePic');

const sendForm = document.getElementById('sendForm');
const cancelForm = document.getElementById('cancelForm');


function checkSendForm() {

    if (inputName.value != "" && inputLastName.value != "" && inputArea.value != "" && selectSchoolLevel.value != "Seleccione" &&
        inputPhoto.value != "") {
        sendForm.disabled = false;
    } else {
        console.log(".....")
        console.log(inputPhoto.value);

        sendForm.disabled = true;
    }
}

inputName.addEventListener('keyup', checkSendForm);
inputLastName.addEventListener('keyup', checkSendForm);
inputArea.addEventListener('keyup', checkSendForm);
selectSchoolLevel.addEventListener('change', checkSendForm);
savePic.addEventListener('click', checkSendForm);


sendForm.addEventListener('click', () => {
    const form = {
        name: inputName.value,
        lastName: inputLastName.value,
        area: inputArea.value,
        schoolLevel: selectSchoolLevel.value,
        latitude: inputLatitude.value,
        longitude: inputLongitude.value,
        user: 'admin',
        photoBase64: 'prueba' /*inputPhoto.value*/
    }
    fetch('https://final-soap.theitshop.ninja/forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
});