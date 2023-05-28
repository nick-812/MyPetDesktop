
const main = document.getElementById("content");
const back_btn = document.getElementById("back");
const save_btn = document.getElementById("save");
const vet = document.getElementById("vet_value");
const ime = document.getElementById("ime_value");
const opis = document.getElementById("opis_value");
const date = document.getElementById("date_value");
let id = "";
let counter = 0;

//ko je stran naložena
document.addEventListener('DOMContentLoaded', async () => {


    //array psov
    const dogs = JSON.parse(localStorage.getItem("oldPets"));

    //prazen selector imen psov
	ime.innerHTML = "";

    for (const pes of dogs) {

        //napolnjenje selectorja z imenom in idjem
        const dog = document.createElement("option");
        dog.className = "dog";
        dog.value = pes._id;

        dog.innerHTML = pes.name;

        //dodamo psa v seznam
        if (ime) ime.appendChild (dog);

    }
    
});

//gumb za preusmeritev nazaj
back_btn.addEventListener('click', async () => {
	window.location.href="../veterinar/veterinar.html";
})

window.onload = function() {
    document.getElementById('vet_value').oninput = function () {
        if (this.value.length > 128) {
            this.value = this.value.slice(0,128); 
        }
        this.value = this.value.replace(/[^a-žA-Ž ]/g,''); // Only allow numerical input
    };

    document.getElementById('opis_value').oninput = function () {
        if (this.value.length > 1024) {
            this.value = this.value.slice(0,1024); 
        }
         
    };
};

//gumb za urejanje
save_btn.addEventListener('click', async () => {

    //preverimo ali so vsa polja izpolnjena
    if(opis.value != "" && vet.value != "" && date.value != "" && ime.value != ""){

        //zaklenemo polja za urejanje in odstranimo obrobo
        ime.disabled = true;
        ime.style.border = "solid #073a63";

        opis.readOnly = true;
        opis.style.border = "solid #073a63";

        date.readOnly = true;
        date.style.border = "solid #073a63";

        vet.readOnly = true;
        vet.style.border = "solid #073a63";

        //poiščemo index trenutnega appointmenta
        const appointment = {
            _id : await api.dogs.generateUUID(),
            vet: vet.value,
            date: date.value,
            data: opis.value,
            dog: ime.value
        };

        await api.appointments.pushAppointment(appointment);

        //se vrnemo na prejšnjo stran
        window.location.href="../veterinar/veterinar.html";
    }

    //če so nekatera polja prazna
    else{
        
        //če je petID prazno ga obarvamo rdeče
        if(vet.value == ""){
            document.getElementById("vet_container").style.backgroundColor = "#a81111";
        }
        else{
            document.getElementById("vet_container").style.backgroundColor = "#073a63";
        }

        if(opis.value == ""){
            document.getElementById("opis_container").style.backgroundColor = "#a81111";
        }else{
            document.getElementById("opis_container").style.backgroundColor = "#073a63";
        }

        if(date.value == ""){
            document.getElementById("date_container").style.backgroundColor = "#a81111";
        }else{
            document.getElementById("date_container").style.backgroundColor = "#073a63";
        }

        if(ime.value == ""){
            document.getElementById("ime_container").style.backgroundColor = "#a81111";
        }else{
            document.getElementById("ime_container").style.backgroundColor = "#073a63";
        }

    }

    
})

