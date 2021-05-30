"use strict";
var reg = /^(\b\d{4}\w{3})$/igm;
var reg1 = /^(\w{3,10})$/igm;
var car;
var listCars = [];
var placaOk = false;
var colorOk = false;
var marcaOk = false;
var EmptyInput = false;
var Diametro = false;
var ValidateSignWheelSForm = false;
function ValidarPlaca() {
    var plate = document.getElementById('placa').value;
    if (plate.match(reg)) {
        document.getElementById('placa').classList.add('is-valid');
        document.getElementById('placa').classList.remove('is-invalid');
        document.getElementById('msg-placa').classList.add('hide');
        return placaOk = true;
    }
    else {
        document.getElementById('msg-placa').classList.add('msg-error');
        document.getElementById('placa').classList.add('is-invalid');
        document.getElementById('msg-placa').innerText = "La matrícula debe comenzar con 4 números y terminar con 3 letras. ";
        document.getElementById('msg-placa').classList.remove('hide');
        return placaOk = false;
    }
}
function ValidarColor() {
    var color = document.getElementById('color').value;
    if (color.match(reg1)) {
        document.getElementById('color').classList.add('is-valid');
        document.getElementById('color').classList.remove('is-invalid');
        document.getElementById('msg-color').classList.add('hide');
        return colorOk = true;
    }
    else {
        document.getElementById('msg-color').classList.add('msg-error');
        document.getElementById('color').classList.add('is-invalid');
        document.getElementById('msg-color').innerText = "Agregue un  color";
        document.getElementById('msg-color').classList.remove('hide');
        return colorOk = false;
    }
}
function ValidarMarca() {
    var brand = document.getElementById('marca').value;
    if (brand.match(reg1)) {
        document.getElementById('marca').classList.add('is-valid');
        document.getElementById('marca').classList.remove('is-invalid');
        document.getElementById('msg-marca').classList.add('hide');
        return marcaOk = true;
    }
    else {
        document.getElementById('msg-marca').classList.add('msg-error');
        document.getElementById('marca').classList.add('is-invalid');
        document.getElementById('msg-marca').innerText = "Agregue la marca";
        document.getElementById('msg-marca').classList.remove('hide');
        return marcaOk = false;
    }
}
function validateEmptyInput(idInput) {
    var val = document.getElementById(idInput).value;
    document.getElementById(idInput).classList.remove('is-valid');
    document.getElementById(idInput).classList.remove('is-invalid');
    document.getElementById('msg-' + idInput).classList.remove('msg-error');
    if (val !== '') {
        document.getElementById(idInput).classList.add('is-valid');
        document.getElementById('msg-' + idInput).classList.add('hide');
        return true;
    }
    else {
        document.getElementById('msg-' + idInput).classList.add('msg-error');
        document.getElementById(idInput).classList.add('is-invalid');
        document.getElementById('msg-' + idInput).innerText = "Este campo es obligatorio";
        document.getElementById('msg-' + idInput).classList.remove('hide');
        return false;
    }
}
function ValidateSignWheelS(idInput, validateDiametro) {
    var valid = validateEmptyInput(idInput);
    if (valid && validateDiametro) {
        return ValidateSignWheelSForm = ValidarDiametro(idInput);
    }
    else if (valid && !validateDiametro) {
        return ValidateSignWheelSForm = true;
    }
    return ValidateSignWheelSForm = false;
}
function ValidarDiametro(idInput) {
    var val = parseFloat(document.getElementById(idInput).value);
    document.getElementById(idInput).classList.remove('is-valid');
    document.getElementById(idInput).classList.remove('is-invalid');
    document.getElementById('msg-' + idInput).classList.remove('msg-error');
    if (val >= 0.4 && val <= 2) {
        document.getElementById(idInput).classList.add('is-valid');
        document.getElementById('msg-' + idInput).classList.add('hide');
        return true;
    }
    else {
        document.getElementById('msg-' + idInput).classList.add('msg-error');
        document.getElementById(idInput).classList.add('is-invalid');
        document.getElementById('msg-' + idInput).innerText = "Diámetro (0.4 y 2)";
        document.getElementById('msg-' + idInput).classList.remove('hide');
        return false;
    }
}
function validteFormWheels() {
    if (!ValidateSignWheelS('ruedaUno', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRuedaUno', true)) {
        return false;
    }
    if (!ValidateSignWheelS('ruedaDos', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRuedaDos', true)) {
        return false;
    }
    if (!ValidateSignWheelS('ruedaTres', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRuedaTres', true)) {
        return false;
    }
    if (!ValidateSignWheelS('ruedaCuatro', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRuedaCuatro', true)) {
        return false;
    }
    return true;
}
function validateFormSignCar() {
    ValidarPlaca();
    ValidarColor();
    ValidarMarca();
    if (placaOk && colorOk && marcaOk) {
        document.getElementById('Sign-car').classList.toggle('hide');
        document.getElementById('Sign-wheelS').classList.toggle('hide');
    }
}
function createCar() {
    if (validteFormWheels()) {
        var plate = document.getElementById('placa').value;
        var color = document.getElementById('color').value;
        var brand = document.getElementById('marca').value;
        var diametroRuedaUno = parseFloat(document.getElementById('diametroRuedaUno').value);
        var ruedaUno = document.getElementById('ruedaUno').value;
        var diametroRuedaDos = parseFloat(document.getElementById('diametroRuedaDos').value);
        var ruedaDos = document.getElementById('ruedaDos').value;
        var diametroRuedaTres = parseFloat(document.getElementById('diametroRuedaTres').value);
        var ruedaTres = document.getElementById('ruedaTres').value;
        var diametroRuedaCuatro = parseFloat(document.getElementById('diametroRuedaCuatro').value);
        var ruedaCuatro = document.getElementById('ruedaCuatro').value;
        car = new Car(plate, color, brand);
        car.addWheel(new Wheel(diametroRuedaUno, ruedaUno));
        car.addWheel(new Wheel(diametroRuedaDos, ruedaDos));
        car.addWheel(new Wheel(diametroRuedaTres, ruedaTres));
        car.addWheel(new Wheel(diametroRuedaCuatro, ruedaCuatro));
        document.getElementById('Sign-car').classList.toggle('hide');
        document.getElementById('Sign-wheelS').classList.toggle('hide');
        document.getElementById('placa').classList.remove('is-valid');
        document.getElementById('color').classList.remove('is-valid');
        document.getElementById('marca').classList.remove('is-valid');
        document.getElementById('ruedaUno').classList.remove('is-valid');
        document.getElementById('ruedaDos').classList.remove('is-valid');
        document.getElementById('ruedaTres').classList.remove('is-valid');
        document.getElementById('ruedaCuatro').classList.remove('is-valid');
        document.getElementById('diametroRuedaUno').classList.remove('is-valid');
        document.getElementById('diametroRuedaDos').classList.remove('is-valid');
        document.getElementById('diametroRuedaTres').classList.remove('is-valid');
        document.getElementById('diametroRuedaCuatro').classList.remove('is-valid');
        listCars.push(car);
        /*     (<HTMLInputElement>document.getElementById('carInfo')).innerHTML+=`<p>
            ${car.brand} <br>
            PLATE: ${car.plate} <br>
            COLOR: ${car.color}  <br>
            </p>`;
            
            car.getWheels().forEach(element => {
            (<HTMLInputElement>document.getElementById('carInfo')).innerHTML+=`<p> Marca de la rueda:${element.brand} Diametro de la rueda${element.diameter}</p>`;
        });  */
        document.getElementById('placa').value = "";
        document.getElementById('color').value = "";
        document.getElementById('marca').value = "";
        document.getElementById('ruedaUno').value = "";
        document.getElementById('ruedaDos').value = "";
        document.getElementById('ruedaTres').value = "";
        document.getElementById('ruedaCuatro').value = "";
        document.getElementById('diametroRuedaUno').value = '';
        document.getElementById('diametroRuedaDos').value = '';
        document.getElementById('diametroRuedaTres').value = '';
        document.getElementById('diametroRuedaCuatro').value = '';
        alert('Coche agregado');
    }
    else {
        alert('formulario no válido');
    }
}
function showCars() {
    var count = 0;
    if (listCars.length === 0) {
        document.getElementById('carInfo').innerHTML = '';
        document.getElementById('carInfo').innerHTML = '<p class="px-2 pt-2"> No tenemos coches  para mostrar</p>';
    }
    else {
        document.getElementById('carInfo').innerHTML = '';
        listCars.forEach(function (element) {
            document.getElementById('carInfo').innerHTML += '<p class="px-2 pt-2"> Marca:' + " " + element.brand + " " + "Color:" + " " + element.color + " " + "Placa:" + " " + element.plate;
            element.wheels.forEach(function (element2) {
                if (count < 4) {
                    count++;
                }
                else {
                    count = 1;
                }
                document.getElementById('carInfo').innerHTML += "<p class=\"px-2 pt-2\">Rueda (" + count + ") Marca: " + element2.brand + "  Di\u00E1metro: " + element2.diameter + "  </p>";
            });
            document.getElementById('carInfo').innerHTML += "<hr/>";
        });
    }
}
