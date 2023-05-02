
const myDogs = document.getElementById("myDogs");
const search = document.getElementById("search");
const bolezen1 = document.getElementById("bolezen1");
const bolezen2 = document.getElementById("bolezen2");
const bolezen3 = document.getElementById("bolezen3");
const percentage1 = document.getElementById("percentage1");
const percentage2 = document.getElementById("percentage2");
const percentage3 = document.getElementById("percentage3");
const outputFields = document.getElementById("outputFields");


document.addEventListener('DOMContentLoaded', async () => {

    const dogs = JSON.parse(localStorage.getItem("oldPets"));

	myDogs.innerHTML = "";

    for (const pes of dogs) {

        const dog = document.createElement("option");
        dog.className = "dog";
        dog.value = pes._id;

        dog.innerHTML = pes.name;

        if (myDogs) myDogs.appendChild (dog);

    }
    
})

search.addEventListener('click', async () => {

    const idPsa = myDogs.value;

    const pets = JSON.parse(localStorage.getItem("oldPets"));
    const dateOfBirth = pets.find(x => x._id === idPsa).date_of_birth;

    //ko bodo datumi psov v pravilni obliki se spodaj vnese dateOfBirth namesto placeholderja

    var datumRojstva = new Date('2014-04-03');
    var month_diff = Date.now() - datumRojstva.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var starost = Math.abs(year - 1970);  

    console.log(starost);



    //pridobitev teže psa
    //dodajanje teže psa v spodnjo zahtevo



    const zahteva = {
        starost: starost,
        teza: 34,
        bolecineTaca: (document.querySelector('#bolecineTaca:checked')!=null),
        otezenaHoja: (document.querySelector('#otezenaHoja:checked')!=null)
    }




    //klicanje strežnika za zahtevo -> await




    //odgovor zahteve
    const pridobljena_vrednost = {
        opcija1: "Steklina",
        verjetnost1: 97.4,
        opcija2: "Odrgnina",
        verjetnost2: 26.8,
        opcija3: "Rak",
        verjetnost3: 2.9
    }



    

    outputFields.style.display = "block";

    if(pridobljena_vrednost.verjetnost1>75){
        percentage1.style.color = "#27754a"
    }
    else if(pridobljena_vrednost.verjetnost1>25){
        percentage1.style.color = "#d6b213"
    }
    else{
        percentage1.style.color = "#941818"
    }

    if(pridobljena_vrednost.verjetnost2>75){
        percentage2.style.color = "#27754a"
    }
    else if(pridobljena_vrednost.verjetnost2>25){
        percentage2.style.color = "#d6b213"
    }
    else{
        percentage2.style.color = "#941818"
    }

    if(pridobljena_vrednost.verjetnost3>75){
        percentage3.style.color = "#27754a"
    }
    else if(pridobljena_vrednost.verjetnost3>25){
        percentage3.style.color = "#d6b213"
    }
    else{
        percentage3.style.color = "#941818"
    }

    percentage1.innerHTML = `${pridobljena_vrednost.verjetnost1}%`;
    percentage2.innerHTML = `${pridobljena_vrednost.verjetnost2}%`;
    percentage3.innerHTML = `${pridobljena_vrednost.verjetnost3}%`;

    bolezen1.innerHTML = pridobljena_vrednost.opcija1;
    bolezen2.innerHTML = pridobljena_vrednost.opcija2;
    bolezen3.innerHTML = pridobljena_vrednost.opcija3;
})