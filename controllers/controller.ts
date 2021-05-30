const reg:RegExp =/^(\b\d{4}\w{3})$/igm;
const reg1:RegExp =/^(\w{3,10})$/igm;
let car: Car;
let listCars: Array<Car> = []
let placaOk : boolean = false;
let colorOk : boolean = false;
let marcaOk : boolean = false;
let EmptyInput: boolean=false;
let Diametro: boolean=false;
let ValidateSignWheelSForm: boolean = false;
function ValidarPlaca() {
    const plate:string = (<HTMLInputElement>document.getElementById('placa')).value;

    if(plate.match(reg)){
        (<HTMLInputElement>document.getElementById('placa')).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('placa')).classList.remove('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-placa')).classList.add('hide');
        return placaOk=true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-placa')).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById('placa')).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-placa')).innerText = "La matrícula debe comenzar con 4 números y terminar con 3 letras. ";
        (<HTMLInputElement>document.getElementById('msg-placa')).classList.remove('hide'); 
        return placaOk=false;
    }
}
function ValidarColor() {
    const color:string = (<HTMLInputElement>document.getElementById('color')).value;
    if(color.match(reg1) ){
        (<HTMLInputElement>document.getElementById('color')).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('color')).classList.remove('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-color')).classList.add('hide');
        return colorOk=true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-color')).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById('color')).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-color')).innerText = "Agregue un  color";
        (<HTMLInputElement>document.getElementById('msg-color')).classList.remove('hide'); 
        return colorOk=false;
    }
}
function ValidarMarca() {
    const brand:string = (<HTMLInputElement>document.getElementById('marca')).value;
    if(brand.match(reg1)){
        (<HTMLInputElement>document.getElementById('marca')).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('marca')).classList.remove('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-marca')).classList.add('hide');
        return marcaOk=true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-marca')).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById('marca')).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-marca')).innerText = "Agregue la marca";
        (<HTMLInputElement>document.getElementById('msg-marca')).classList.remove('hide'); 
        return marcaOk=false;
    }
}

function validateEmptyInput(idInput: string){
    const val:any = (<HTMLInputElement>document.getElementById(idInput)).value;
    (<HTMLInputElement>document.getElementById(idInput)).classList.remove('is-valid');
    (<HTMLInputElement>document.getElementById(idInput)).classList.remove('is-invalid');
    (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.remove('msg-error');
    if(val!==''){
        (<HTMLInputElement>document.getElementById(idInput)).classList.add('is-valid');
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('hide');
        return true;
    }else{
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('msg-error');
        (<HTMLInputElement>document.getElementById(idInput)).classList.add('is-invalid');
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).innerText = "Este campo es obligatorio";
        (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.remove('hide');
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
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('hide');
            return true;
        }else {
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.add('msg-error');
            (<HTMLInputElement>document.getElementById(idInput)).classList.add('is-invalid');
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).innerText = "Diámetro (0.4 y 2)";
            (<HTMLInputElement>document.getElementById('msg-' + idInput)).classList.remove('hide');
            return false;
        }
        
    } 

    function validteFormWheels(){
        if(!ValidateSignWheelS('ruedaUno', false)){
            return false;
        }

        if(!ValidateSignWheelS('diametroRuedaUno', true)){
            return false;
        }
        if(!ValidateSignWheelS('ruedaDos', false)){
            return false;
        }

        if(!ValidateSignWheelS('diametroRuedaDos', true)){
            return false;
        }
        if(!ValidateSignWheelS('ruedaTres', false)){
            return false;
        }

        if(!ValidateSignWheelS('diametroRuedaTres', true)){
            return false;
        }
        if(!ValidateSignWheelS('ruedaCuatro', false)){
            return false;
        }

        if(!ValidateSignWheelS('diametroRuedaCuatro', true)){
            return false;
        }
        return true;
    }

    function validateFormSignCar(){
        ValidarPlaca();
        ValidarColor();
        ValidarMarca();
        if(placaOk && colorOk && marcaOk ){
            (<HTMLInputElement>document.getElementById('Sign-car')).classList.toggle('hide');
            (<HTMLInputElement>document.getElementById('Sign-wheelS')).classList.toggle('hide');
        }
    }

function createCar(){
    if(validteFormWheels()){
    const plate:string = (<HTMLInputElement>document.getElementById('placa')).value;
    const color:string = (<HTMLInputElement>document.getElementById('color')).value;
    const brand:string = (<HTMLInputElement>document.getElementById('marca')).value;
    const diametroRuedaUno:number = parseFloat((<HTMLInputElement>document.getElementById('diametroRuedaUno')).value);
    const ruedaUno:string = (<HTMLInputElement>document.getElementById('ruedaUno')).value;
    const diametroRuedaDos:number = parseFloat((<HTMLInputElement>document.getElementById('diametroRuedaDos')).value);
    const ruedaDos:string = (<HTMLInputElement>document.getElementById('ruedaDos')).value;
    const diametroRuedaTres:number = parseFloat((<HTMLInputElement>document.getElementById('diametroRuedaTres')).value);
    const ruedaTres:string = (<HTMLInputElement>document.getElementById('ruedaTres')).value;
    const diametroRuedaCuatro:number = parseFloat((<HTMLInputElement>document.getElementById('diametroRuedaCuatro')).value);
    const ruedaCuatro:string = (<HTMLInputElement>document.getElementById('ruedaCuatro')).value;

    car = new Car(plate,color,brand);
    car.addWheel(new Wheel(diametroRuedaUno, ruedaUno));
    car.addWheel(new Wheel(diametroRuedaDos, ruedaDos));
    car.addWheel(new Wheel(diametroRuedaTres,ruedaTres));
    car.addWheel(new Wheel(diametroRuedaCuatro,ruedaCuatro));
        
        (<HTMLInputElement>document.getElementById('Sign-car')).classList.toggle('hide');
        (<HTMLInputElement>document.getElementById('Sign-wheelS')).classList.toggle('hide');

        (<HTMLInputElement>document.getElementById('placa')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('color')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('marca')).classList.remove('is-valid');

        (<HTMLInputElement>document.getElementById('ruedaUno')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('ruedaDos')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('ruedaTres')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('ruedaCuatro')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('diametroRuedaUno')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('diametroRuedaDos')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('diametroRuedaTres')).classList.remove('is-valid');
        (<HTMLInputElement>document.getElementById('diametroRuedaCuatro')).classList.remove('is-valid');
        
        listCars.push(car);
    
    /*     (<HTMLInputElement>document.getElementById('carInfo')).innerHTML+=`<p>
        ${car.brand} <br>
        PLATE: ${car.plate} <br>
        COLOR: ${car.color}  <br> 
        </p>`; 
        
        car.getWheels().forEach(element => {
        (<HTMLInputElement>document.getElementById('carInfo')).innerHTML+=`<p> Marca de la rueda:${element.brand} Diametro de la rueda${element.diameter}</p>`; 
    });  */


        (<HTMLInputElement>document.getElementById('placa')).value="";
        (<HTMLInputElement>document.getElementById('color')).value="";
        (<HTMLInputElement>document.getElementById('marca')).value="";

        (<HTMLInputElement>document.getElementById('ruedaUno')).value="";
        (<HTMLInputElement>document.getElementById('ruedaDos')).value="";
        (<HTMLInputElement>document.getElementById('ruedaTres')).value="";
        (<HTMLInputElement>document.getElementById('ruedaCuatro')).value="";
        (<HTMLInputElement>document.getElementById('diametroRuedaUno')).value='';
        (<HTMLInputElement>document.getElementById('diametroRuedaDos')).value='';
        (<HTMLInputElement>document.getElementById('diametroRuedaTres')).value='';
        (<HTMLInputElement>document.getElementById('diametroRuedaCuatro')).value='';
        
        alert('Coche agregado');
    }else{
        
        alert('formulario no válido');
    }
}

function showCars() { 
    let count:number=0;

        if (listCars.length===0) {
            (<HTMLInputElement>document.getElementById('carInfo')).innerHTML='';
            (<HTMLInputElement>document.getElementById('carInfo')).innerHTML='<p class="px-2 pt-2"> No tenemos coches  para mostrar</p>'
        } else {
            (<HTMLInputElement>document.getElementById('carInfo')).innerHTML='';
            listCars.forEach(element => {  
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