
const myDogs = document.getElementById("myDogs");
const search = document.getElementById("search");
const bolezen1 = document.getElementById("bolezen1");
const bolezen2 = document.getElementById("bolezen2");
const bolezen3 = document.getElementById("bolezen3");
const percentage1 = document.getElementById("percentage1");
const percentage2 = document.getElementById("percentage2");
const percentage3 = document.getElementById("percentage3");
const outputFields = document.getElementById("outputFields");

//ko je stran naložena
document.addEventListener('DOMContentLoaded', async () => {

    //pridobitev seznama psov
    const oldpets = JSON.parse(localStorage.getItem("oldPets"));
    const newPets = JSON.parse(localStorage.getItem("newPets"));
    const dogs = oldpets.concat(newPets);

    //prazen selector
	myDogs.innerHTML = "";

    for (const pes of dogs) {

        //napolnjenje selectorja z imenom in idjem
        const dog = document.createElement("option");
        dog.className = "dog";
        dog.value = pes._id;

        dog.innerHTML = pes.name;

        if (myDogs) myDogs.appendChild (dog);

    }
    
})

//gumb za pridobitev napovedi
search.addEventListener('click', async () => {

    //id izbranega psa
    const idPsa = myDogs.value;

    //rojstni dan iz seznama psov
    const pets = JSON.parse(localStorage.getItem("oldPets"));
    const dateOfBirth = pets.find(x => x._id === idPsa).date_of_birth;





    //ko bodo datumi psov v pravilni obliki se spodaj vnese dateOfBirth namesto placeholderja






    //pridobitev starosti
    var datumRojstva = new Date('2014-04-03');
    var month_diff = Date.now() - datumRojstva.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var starost = Math.abs(year - 1970);  






    //pridobitev teže psa
    //const weight = pets.find(x => x._id === idPsa).weight;
    //dodajanje teže psa v spodnjo zahtevo






    //oblikovanje zahteve za strežnik
    const zahteva = {
        starost: starost,
        teza: 34,
        //teza: weight,
        bolecineTaca: (document.querySelector('#bolecineTaca:checked')!=null),
        otezenaHoja: (document.querySelector('#otezenaHoja:checked')!=null)
    }

    //odgovor zahteve
    const pridobljena_vrednost = await api.diagnose.getDiagnose(zahteva);

    //prikaz odseka z rezultati
    outputFields.style.display = "block";

    //zelena barva labela nad 75% verjetnosti, nato rumena in rdeča
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

    //nastavitev vrednosti % v polje z rezultatom
    percentage1.innerHTML = `${pridobljena_vrednost.verjetnost1}%`;
    percentage2.innerHTML = `${pridobljena_vrednost.verjetnost2}%`;
    percentage3.innerHTML = `${pridobljena_vrednost.verjetnost3}%`;

    //vpis bolezni med rezultate
    bolezen1.innerHTML = pridobljena_vrednost.opcija1;
    bolezen2.innerHTML = pridobljena_vrednost.opcija2;
    bolezen3.innerHTML = pridobljena_vrednost.opcija3;
})