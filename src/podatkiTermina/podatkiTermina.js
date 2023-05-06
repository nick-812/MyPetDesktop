
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
    const appointments = JSON.parse(localStorage.getItem("appointments"));

    console.log(appointments);


    //poiščemo appointment po id-ju
    const appointment = appointments.find(x => x.id === id);

    console.log(appointment);

    //poiščemo ime psa po id-ju
    const dogs = JSON.parse(localStorage.getItem("oldPets"));
    const index = dogs.findIndex(x => x._id === appointment.dog);
	const name = dogs[index].name;

    //vnos podatkov o psu v vnosna polja
    vet.value = appointment.vet;
    ime.value = name;
    date.value = appointment.date;
    opis.value = appointment.data;
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
	    ime.readOnly = false;
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
            ime.readOnly = true;
            ime.style.border = "solid #073a63";

            opis.readOnly = true;
            opis.style.border = "solid #073a63";

            date.readOnly = true;
            date.style.border = "solid #073a63";

            vet.readOnly = true;
            vet.style.border = "solid #073a63";

            //pridobimo seznam psov
            const appointments = JSON.parse(localStorage.getItem("appointments"));

            //poiščemo index trenutnega psa
            const index = appointments.findIndex(x => x._id === id);

            //popravimo vrednosti appointmenta
            appointments[index].vet = vet.value;
            appointments[index].date = date.value;
            appointments[index].data = data.value;


            appointments[index].dog = ime.value;

            

            //update appointment





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
            if(petID.value == ""){
                document.getElementById("vet_container").style.backgroundColor = "#a81111";
            }
            else{
                document.getElementById("vet_container").style.backgroundColor = "#073a63";
            }
    
            if(userID.value == ""){
                document.getElementById("opis_container").style.backgroundColor = "#a81111";
            }else{
                document.getElementById("opis_container").style.backgroundColor = "#073a63";
            }
    
            if(birthday.value == ""){
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
        const index = appointments.findIndex(x => x._id === id);
        appointments.splice(index, 1);



        //delete appointment



        //shranimo seznam appointmentov nazaj
        localStorage.setItem("appointments", JSON.stringify(appointments));

        //se vrnemo na prejšnjo stran
        window.location.href="../veterinar/veterinar.html";
    }
    
})