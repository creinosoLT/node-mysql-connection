const API_URI = "http://localhost:3000";

getMunicipios()

function SendMunicipio() {
    const municipio = document.querySelector("#municipio").value;
    const departamento = document.querySelector('#departamento').value

    const data = {
        municipio,
        departamento
    }
    
    if(municipio && departamento) {
        fetch(`${API_URI}/municipio`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((resp) => resp.json().then(res => console.log(res)))
        .catch((err) => console.log(err));

        setTimeout(() => {
            getMunicipios()
            window.location.reload()
        }, 500);
    }
}

function getMunicipios() {
    const municipios = document.querySelector('#municipios')

    fetch(`${API_URI}/municipios`, {
        method: 'GET'
    }).then(res => {
        res.json().then(({data}) => {
            data.map(mun => {
                const { Id, Nombre, Departamento } = mun
                
                let tr = document.createElement('tr')
                let thId = document.createElement('th')
                let thNombre = document.createElement('th')
                let thDepart = document.createElement('th')

                thId.innerText = Id
                thNombre.innerText = Nombre
                thDepart.innerText = Departamento

                thNombre.classList.add('font-weight-normal')
                thDepart.classList.add('font-weight-normal')

                tr.appendChild(thId)
                tr.appendChild(thNombre)
                tr.appendChild(thDepart)

                municipios.appendChild(tr)
            })
        })
    })
}
