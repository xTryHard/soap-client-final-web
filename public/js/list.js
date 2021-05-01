const searchBtn = document.getElementById('searchBtn');
const userInput = document.getElementById('userInput');

searchBtn.addEventListener('click', async (e) => {

  const forms = await fetch(`http://localhost:3000/forms/${userInput.value}`);
  const formsObj = await forms.json();
  fillTable(formsObj);

});

function fillTable(forms) {

    const body = document.getElementById("bodyForms");
    
    while(body.hasChildNodes()) {
        body.removeChild(body.firstChild);
    }

    forms.forEach((form, index) => {
        const tr = document.createElement('tr');
        let tds = '';
        tds += `
            <td>${form.name}</td>
            <td>${form.lastName}</td>
            <td>${form.area}</td>
            <td>${form.schoolLevel}</td>
            <td>${form.user}</td>
            <td><button id="btnPhoto-${form.id}" class="btn btn-success btn-sm">Foto</button></td>
            <td><button id="btnMap-${form.id}" class="btn btn-primary btn-sm">Mapa</button></td>
            <input type="hidden" value="${form.id}">
            <input name=${form.id} type="hidden" value="${form.latitude}">
            <input name=${form.id} type="hidden" value="${form.longitude}">\n
        `
        tr.innerHTML = tds;
        body.appendChild(tr);
    });
    forms.forEach((form, index) => {
        document.getElementById(`btnMap-${form.id}`).addEventListener('click', () => {
            showMap(form.id);
        });

        const btnFoto = document.getElementById(`btnPhoto-${form.id}`);
        btnFoto.addEventListener('click', () => {
            document.getElementById('imgtest').setAttribute('src', form.photoBase64);
            $("#exampleModal").modal('show');
        });
    });
}

function showMap(name) {
    let arr = document.getElementsByName(name);
    let latitude = arr[0].value;
    let longitud = arr[1].value;

    console.log(arr);
    console.log(latitude);
    console.log(longitud);

    document.getElementById("map").src = "https://maps.google.com/maps?q=" + latitude + ", " +
        longitud +
        "&z=15&output=embed";
}