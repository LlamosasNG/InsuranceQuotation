/* Constructores */
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}

Insurance.prototype.quotationInsurance = function () {

    /*
        Incrementos de cada seguro:
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35 
    */

    let quantity;
    const base = 2000;

    switch (this.brand) {
        case '1':
            quantity = base * 1.15;
            break;
        case '2':
            quantity = base * 1.05;
            break;
        case '3':
            quantity = base * 1.35;
            break;
        default:
            break;
    }

    //Leer el año
    const difference = new Date().getFullYear() - this.year;

    //Cada año que la diferencia es mayor, el costo va a reducirse un 3%
    quantity -= ((difference * 3) * quantity) / 100;

    /* 
        Si el seguro es básico se multiplica por un 30% más
        Si el seguro es completo se multiplica por un 50% más
    */

    if (this.type === 'basico') {
        quantity *= 1.30;
    } else {
        quantity *= 1.50;
    }

    return quantity;
}

function UI() { }

//Llenar las opciones de los años 
UI.prototype.FillingOptions = () => {
    const max = new Date().getFullYear()
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Mostrar alertas en pantalla
UI.prototype.showMessage = (mensaje, type) => {
    const div = document.createElement('div');

    if (type === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Se inserta en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.showResults = (insurance, total) => {
    //Crear resultado
    const div = document.createElement('div');
    const { brand, year, type } = insurance;

    let textBrand;

    switch (brand) {
        case '1':
            textBrand = 'Americano';
            break;
        case '2':
            textBrand = 'Asiático';
            break;
        case '3':
            textBrand = 'Europeo';
            break;
        default:
            break;
    }
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class = "header">Tu resumen</p>
        <p class = "font-bold">Marca: <span class = "font-normal">${textBrand}<span></p>
        <p class = "font-bold">Año: <span class = "font-normal">${year}<span></p>
        <p class = "font-bold">Tipo: <span class = "font-normal capitalize">$ ${type}<span></p>
        <p class = "font-bold">Total: <span class = "font-normal">$ ${total}<span></p>
    `;

    resultDiv = document.querySelector('#resultado');

    //Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //Se borra el spinner
        resultDiv.appendChild(div); //Se muestra el resultado
    }, 3000);
}

//Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.FillingOptions(); //Rellenar el select con años
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', insurenceQuotation);
})

function insurenceQuotation(e) {
    e.preventDefault();

    const brand = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const type = document.querySelector('input[name="tipo"]:checked').value;

    if (brand === '' || year === '' || type === '') {
        ui.showMessage('Todos los campos son obligatorios', 'error')
        return;
    }

    ui.showMessage('Cotizando', 'correcto')

    //Ocultar las cotizaciones previas
    const results = document.querySelector('#resultado div')

    if (results != null) {
        results.remove();
    }

    //Instanciar el seguro
    const insurance = new Insurance(brand, year, type);
    const total = insurance.quotationInsurance();

    ui.showResults(insurance, total);

}   
