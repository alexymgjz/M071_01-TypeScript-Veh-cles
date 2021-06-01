"use strict";
var reg = /^(\b\d{4}\w{3})$/igm;
var reg1 = /^(\w{3,10})$/igm;
var car;
var listCars = [];
var ValidateSignWheelSForm = false;
var numWheels = 4;
function ValidarPlaca() {
    var plate = document.getElementById('placa').value;
    if (plate.match(reg)) {
        document.getElementById('placa').classList.add('is-valid');
        document.getElementById('placa').classList.remove('is-invalid');
        document.getElementById('msg-placa').classList.add('d-none');
        return true;
    }
    else {
        document.getElementById('msg-placa').classList.add('msg-error');
        document.getElementById('placa').classList.add('is-invalid');
        document.getElementById('msg-placa').innerText = "La matrícula debe comenzar con 4 números y terminar con 3 letras. ";
        document.getElementById('msg-placa').classList.remove('d-none');
        return false;
    }
}
function ValidarColor() {
    var color = document.getElementById('color').value;
    if (color.match(reg1)) {
        document.getElementById('color').classList.add('is-valid');
        document.getElementById('color').classList.remove('is-invalid');
        document.getElementById('msg-color').classList.add('d-none');
        return true;
    }
    else {
        document.getElementById('msg-color').classList.add('msg-error');
        document.getElementById('color').classList.add('is-invalid');
        document.getElementById('msg-color').innerText = "Agregue un color (+ de 3 y menos de 11 caracters)";
        document.getElementById('msg-color').classList.remove('d-none');
        return false;
    }
}
function ValidarMarca() {
    var brand = document.getElementById('marca').value;
    if (brand.match(reg1)) {
        document.getElementById('marca').classList.add('is-valid');
        document.getElementById('marca').classList.remove('is-invalid');
        document.getElementById('msg-marca').classList.add('d-none');
        return true;
    }
    else {
        document.getElementById('msg-marca').classList.add('msg-error');
        document.getElementById('marca').classList.add('is-invalid');
        document.getElementById('msg-marca').innerText = "Agregue la marca (+ de 3 y menos de 11 caracters)";
        document.getElementById('msg-marca').classList.remove('d-none');
        return false;
    }
}
function validateEmptyInput(idInput) {
    var val = document.getElementById(idInput).value;
    document.getElementById(idInput).classList.remove('is-valid');
    document.getElementById(idInput).classList.remove('is-invalid');
    document.getElementById('msg-' + idInput).classList.remove('msg-error');
    if (val !== '') {
        document.getElementById(idInput).classList.add('is-valid');
        document.getElementById('msg-' + idInput).classList.add('d-none');
        return true;
    }
    else {
        document.getElementById('msg-' + idInput).classList.add('msg-error');
        document.getElementById(idInput).classList.add('is-invalid');
        document.getElementById('msg-' + idInput).innerText = "Este campo es obligatorio";
        document.getElementById('msg-' + idInput).classList.remove('d-none');
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
        document.getElementById('msg-' + idInput).classList.add('d-none');
        return true;
    }
    else {
        document.getElementById('msg-' + idInput).classList.add('msg-error');
        document.getElementById(idInput).classList.add('is-invalid');
        document.getElementById('msg-' + idInput).innerText = "Diámetro (0.4 y 2)";
        document.getElementById('msg-' + idInput).classList.remove('d-none');
        return false;
    }
}
function validteFormWheels() {
    if (!ValidateSignWheelS('rueda1', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRueda1', true)) {
        return false;
    }
    if (!ValidateSignWheelS('rueda2', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRueda2', true)) {
        return false;
    }
    if (!ValidateSignWheelS('rueda3', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRueda3', true)) {
        return false;
    }
    if (!ValidateSignWheelS('rueda4', false)) {
        return false;
    }
    if (!ValidateSignWheelS('diametroRueda4', true)) {
        return false;
    }
    return true;
}
function validateFormSignCar() {
    if (ValidarPlaca() && ValidarColor() && ValidarMarca()) {
        document.getElementById('Sign-car').classList.add('d-none');
        document.getElementById('Sign-wheelS').classList.remove('d-none');
    }
    else {
        ValidarPlaca();
        ValidarColor();
        ValidarMarca();
    }
}
function createCar() {
    if (validteFormWheels()) {
        var plate = document.getElementById('placa').value;
        var color = document.getElementById('color').value;
        var brand = document.getElementById('marca').value;
        document.getElementById('Sign-car').classList.remove('d-none');
        document.getElementById('Sign-wheelS').classList.add('d-none');
        document.getElementById('placa').classList.remove('is-valid');
        document.getElementById('color').classList.remove('is-valid');
        document.getElementById('marca').classList.remove('is-valid');
        car = new Car(plate, color, brand);
        for (var i = 1; i <= numWheels; i++) {
            var brand_1 = document.getElementById("rueda" + i).value;
            var diameter = parseFloat(document.getElementById("diametroRueda" + i).value);
            car.addWheel(new Wheel(diameter, brand_1));
            document.getElementById('rueda' + i).classList.remove('is-valid');
            document.getElementById('diametroRueda' + i).classList.remove('is-valid');
            document.getElementById("rueda" + i).value = "";
            document.getElementById("diametroRueda" + i).value = '';
        }
        ;
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
        alert('Coche agregado');
    }
    else {
        alert('formulario no válido');
    }
}
function showCars() {
    var count = 0;
    document.getElementById('carInfo').innerHTML = '';
    if (listCars.length === 0) {
        document.getElementById('carInfo').innerHTML = '<p class="px-2 pt-2"> No tenemos coches  para mostrar</p>';
    }
    else {
        listCars.forEach(function (element) {
            document.getElementById('carInfo').classList.remove('d-none');
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
function hidecars() {
    document.getElementById('carInfo').classList.add('d-none');
}
