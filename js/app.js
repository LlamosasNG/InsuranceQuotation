/* Constructores */
function Insurance(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}

Insurance.prototype.quotationInsurance = function () {

    /*  Incrementos de cada seguro:
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35 */

    let quantity;
    const base = 2000;

    switch (this.brand) {
        case '1':
            quantity = base * 1.15;
        case '2':

        case '3':


        default:
            break;
    }
}

function UI() { }


/* Llenar las opciones de los años */
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

/* Mostrar alertas en pantalla */
UI.prototype.showMessage = (mensaje, type) => {
    const div = document.createElement('div');

    if (type === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    /* Se inserta en el HTML */
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

/* Instanciar UI */
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.FillingOptions(); /* LLena el select con años */
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
    }

    ui.showMessage('Cotizando...', 'correcto')

    /* Instanciar el seguro */
    const insurance = new Insurance(brand, year, type);
    insurance.quotationInsurance();

}   