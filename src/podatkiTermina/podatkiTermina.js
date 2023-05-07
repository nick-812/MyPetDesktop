
const main = document.getElementById("content");
const back_btn = document.getElementById("back");
const edit_btn = document.getElementById("edit");
const delete_btn = document.getElementById("delete");
const vet = document.getElementById("vet_value");
const ime = document.getElementById("ime_value");
const opis = document.getElementById("opis_value");
const date = document.getElementById("date_value");
let id = "";
let counter = 0;

//ko je stran naložena
document.addEventListener('DOMContentLoaded', async () => {

    //prejememo id iz parametrov url
    let params = (new URL(document.location)).searchParams;
    id = params.get("id");

    //nalaganje seznama appointmentov
    //nalaganje seznama psov
    const oldappointments = JSON.parse(localStorage.getItem("appointments"));
    const newappointments = JSON.parse(localStorage.getItem("newAppointments"));
    const appointments = oldappointments.concat(newappointments);


    //poiščemo appointment po id-ju
    const appointment = appointments.find(x => x.id === id);

    console.log(appointment);

    //vnos podatkov o psu v vnosna polja
    vet.value = appointment.vet;
    date.value = appointment.date;
    opis.value = appointment.data;


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

    //trenutni izbrani je pes vpisan v appointment z id-jem 
    ime.value = appointment.dog;
    
});

//gumb za preusmeritev nazaj
back_btn.addEventListener('click', async () => {
	window.location.href="../veterinar/veterinar.html";
})

//gumb za urejanje
edit_btn.addEventListener('click', async () => {

    //če je urejanje omogočeno
    if(edit_btn.innerHTML === 'Uredi'){

        //spremenimo gumb v shrani
        edit_btn.innerHTML = 'Shrani'

        //omogočimo urejanje in označimo polja z belo obrobo
	    ime.disabled = false;
        ime.style.border = "solid #FFFFFF";

        vet.readOnly = false;
        vet.style.border = "solid #FFFFFF";

        date.readOnly = false;
        date.style.border = "solid #FFFFFF";

        opis.readOnly = false;
        opis.style.border = "solid #FFFFFF";
    }
    else{
        //če je gumb v funkciji shranjevanja
        //preverimo ali so vsa polja izpolnjena
        if(opis.value != "" && vet.value != "" && date.value != "" && ime.value != ""){

            //spremenimo gumb nazaj v uredi
            edit_btn.innerHTML = 'Uredi'

            //zaklenemo polja za urejanje in odstranimo obrobo
            ime.disabled = true;
            ime.style.border = "solid #073a63";

            opis.readOnly = true;
            opis.style.border = "solid #073a63";

            date.readOnly = true;
            date.style.border = "solid #073a63";

            vet.readOnly = true;
            vet.style.border = "solid #073a63";

            //pridobimo seznam appointmentov
            const appointments = JSON.parse(localStorage.getItem("appointments"));

            //poiščemo index trenutnega appointmenta
            const index = appointments.findIndex(x => x.id === id);


            //popravimo vrednosti appointmenta
            appointments[index].vet = vet.value;
            appointments[index].date = date.value;
            appointments[index].data = opis.value;
            appointments[index].dog = ime.value;

            //update appointment
            await api.appointments.updateAppointment(appointments);

            //shranimo seznam psov nazaj v localstorage
            localStorage.setItem("appointments", JSON.stringify(appointments));

            //povrnemo container na prvotne barve iz rdeče
            document.getElementById("vet_container").style.backgroundColor = "#073a63";
            document.getElementById("opis_container").style.backgroundColor = "#073a63";
            document.getElementById("date_container").style.backgroundColor = "#073a63";
            document.getElementById("ime_container").style.backgroundColor = "#073a63";
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

    }
})

//gumb za izbris
delete_btn.addEventListener('click', async () => {

    //če še ni bil kliknjen
    if(counter === 0){

        //nastavimo barvo na rdečo in povečamo števec
        delete_btn.style.backgroundColor = "#88031d";
        counter = 1;
    }

    //če je že bil 1x kliknjen
    else {

        //pridobimo seznam appointments
        const appointments = JSON.parse(localStorage.getItem("appointments"));

        //poiščemo index in izbrišemo appointment
        const index = appointments.findIndex(x => x.id === id);
        appointments.splice(index, 1);

        //delete appointment na serverju
        await api.appointments.deleteAppointment(id);

        //shranimo seznam appointmentov nazaj
        localStorage.setItem("appointments", JSON.stringify(appointments));

        //se vrnemo na prejšnjo stran
        window.location.href="../veterinar/veterinar.html";
    }
    
})