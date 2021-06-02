const reg:RegExp =/^(\b\d{4}\w{3})$/igm;
const reg1:RegExp =/^(\w{3,10})$/igm;
let car: Car;
let listCars: Array<Car> = []
let ValidateSignWheelSForm: boolean = false;
let numWheels = 4;



function ValidarPlaca() {
    const plate:string = (<HTMLInputElement>document.getElementById('placa')).value;

    if(plate.match(reg)){
        (<HTMLInputElement>document.getElementById('placa')).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('placa')).classList.remove('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-placa')).classList.add('d-none');
        return true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-placa')).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById('placa')).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-placa')).innerText = "La matrícula debe comenzar con 4 números y terminar con 3 letras. ";
        (<HTMLInputElement>document.getElementById('msg-placa')).classList.remove('d-none'); 
        return false;
    }
}  

function ValidarColor() {
    const color:string = (<HTMLInputElement>document.getElementById('color')).value;
    if(color.match(reg1) ){
        (<HTMLInputElement>document.getElementById('color')).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('color')).classList.remove('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-color')).classList.add('d-none');
        return true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-color')).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById('color')).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-color')).innerText = "Agregue un color (+ de 3 y menos de 11 caracters)";
        (<HTMLInputElement>document.getElementById('msg-color')).classList.remove('d-none'); 
        return false;
    }
}
function ValidarMarca() {
    const brand:string = (<HTMLInputElement>document.getElementById('marca')).value;
    if(brand.match(reg1)){
        (<HTMLInputElement>document.getElementById('marca')).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('marca')).classList.remove('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-marca')).classList.add('d-none');
        return true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-marca')).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById('marca')).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-marca')).innerText = "Agregue la marca (+ de 3 y menos de 11 caracters)";
        (<HTMLInputElement>document.getElementById('msg-marca')).classList.remove('d-none'); 
        return false;
    }
}

function validateEmptyInput(idInput: string){
    const val:any = (<HTMLInputElement>document.getElementById(idInput)).value;
    (<HTMLInputElement>document.getElementById(idInput)).classList.remove('is-valid');
    (<HTMLInputElement>document.getElementById(idInput)).classList.remove('is-invalid');
    (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.remove('msg-error');
    if(val!==''){
        (<HTMLInputElement>document.getElementById(idInput)).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('d-none');
        return true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById(idInput)).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).innerText = "Este campo es obligatorio";
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.remove('d-none');
        return false;
    }
}

function ValidateSignWheelS(idInput: string, validateDiametro: boolean){
    
    const valid = validateEmptyInput(idInput);
    if(valid && validateDiametro){
        return ValidateSignWheelSForm = ValidarDiametro(idInput);
    }else if(valid && !validateDiametro){
        return ValidateSignWheelSForm = true;
    }
    return ValidateSignWheelSForm = false;
}


    function ValidarDiametro(idInput: string) {
        const val:number = parseFloat((<HTMLInputElement>document.getElementById(idInput)).value);
        (<HTMLInputElement>document.getElementById(idInput)).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById(idInput)).classList.remove('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.remove('msg-error');
        if(val >= 0.4  && val <= 2 ){
            (<HTMLInputElement>document.getElementById(idInput)).classList.add('is-valid');
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('d-none');
            return true;
        }else {
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('msg-error');
            (<HTMLInputElement>document.getElementById(idInput)).classList.add('is-invalid');
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).innerText = "Diámetro (0.4 y 2)";
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.remove('d-none');
            return false;
        }
        
    } 

    function validteFormWheels(){
        let count = 0;
        for (let i = 1; i <= numWheels; i++) {
        ValidateSignWheelS(("rueda" + i), false);
        ValidateSignWheelS(("diametroRueda" + i), true);
        if( ValidateSignWheelS(("diametroRueda" + i), true) && ValidateSignWheelS(("diametroRueda" + i), true)){
            count++;
            if (i==numWheels) {
                return true;
            }
            
        }
    }

    }


    function validateFormSignCar(){
    
        if(ValidarPlaca() && ValidarColor() && ValidarMarca() ){
            (<HTMLInputElement>document.getElementById('container')).classList.add('d-none');
            (<HTMLInputElement>document.getElementById('Sign-wheelS')).classList.remove('d-none');
        }else{
            ValidarPlaca();ValidarColor();ValidarMarca();
        }
        
    } 

function createCar(){
    if(validteFormWheels()){
        const plate:string = (<HTMLInputElement>document.getElementById('placa')).value;
        const color:string = (<HTMLInputElement>document.getElementById('color')).value;
        const brand:string = (<HTMLInputElement>document.getElementById('marca')).value;
        (<HTMLInputElement>document.getElementById('container')).classList.remove('d-none');
        (<HTMLInputElement>document.getElementById('Sign-wheelS')).classList.add('d-none');
        
        (<HTMLInputElement>document.getElementById('placa')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('color')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('marca')).classList.remove('is-valid');
        car = new Car(plate,color,brand);
        for (let i = 1; i <= numWheels; i++) {
            let brand = (<HTMLInputElement> document.getElementById("rueda" + i)).value;
            let diameter = parseFloat((<HTMLInputElement> document.getElementById("diametroRueda" + i)).value);

            car.addWheel(new Wheel(diameter, brand));
            (<HTMLInputElement>document.getElementById('rueda'+i)).classList.remove('is-valid');
            (<HTMLInputElement>document.getElementById('diametroRueda'+i)).classList.remove('is-valid');

            (<HTMLInputElement>document.getElementById("rueda" + i)).value="";
            (<HTMLInputElement>document.getElementById("diametroRueda" + i)).value='';
        };
        listCars.push(car);
        
        (<HTMLInputElement>document.getElementById('placa')).value="";
        (<HTMLInputElement>document.getElementById('color')).value="";
        (<HTMLInputElement>document.getElementById('marca')).value="";
        
        alert('Coche agregado');
    }else{
        
        alert('formulario no válido');
    }
}

function showCars() { 
    let count:number=0;
    (<HTMLInputElement>document.getElementById('carInfo')).innerHTML='';
        if (listCars.length===0) {
            (<HTMLInputElement>document.getElementById('carInfo')).innerHTML='<p class="px-2 pt-2"> No tenemos coches  para mostrar</p>'
        } else {

            listCars.forEach(element => { 
                (<HTMLInputElement>document.getElementById('carInfo')).classList.remove('d-none');
                (<HTMLInputElement>document.getElementById('carInfo')).innerHTML+='<p class="px-2 pt-2"> Marca:'+ " " + element.brand + " " + "Color:" + " " + element.color + " " + "Placa:" + " " + element.plate;
                element.wheels.forEach(element2 => {
                    if (count<4) {
                        count++
                    }else{
                        count=1;
                    }
                    
                    (<HTMLInputElement>document.getElementById('carInfo')).innerHTML+= `<p class="px-2 pt-2">Rueda (${count}) Marca: ${element2.brand}  Diámetro: ${element2.diameter}  </p>`;
                });
                (<HTMLInputElement>document.getElementById('carInfo')).innerHTML+=`<hr/>`
            });
        }
        
}

function hidecars() {
    (<HTMLInputElement>document.getElementById('carInfo')).classList.add('d-none');
}