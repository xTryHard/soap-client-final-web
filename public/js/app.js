
const inputName = document.getElementById('inputName');
const inputLastName = document.getElementById('inputLastName');
const inputArea = document.getElementById('inputArea');
const selectSchoolLevel = document.getElementById('selectSchoolLevel');
const inputLatitude = document.getElementById('inputLatitude');
const inputLongitude = document.getElementById('inputLongitude');
const inputPhoto = document.getElementById('inputPhoto');

const sendForm = document.getElementById('sendForm');
const cancelForm = document.getElementById('cancelForm');


function checkSendForm() {

    if (inputName.value != '' && inputLastName.value != '' && inputArea.value != '' && selectSchoolLevel.value != 'Seleccione'
    && inputPhoto.value != '') {
        sendForm.disabled = false;
    }
}