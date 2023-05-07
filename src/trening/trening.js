
const myDogs = document.getElementById("myDogs");
const tipTreninga = document.getElementById("trainingType");
const search = document.getElementById("search");
const outputValue = document.getElementById("output_value");

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
        tip: tipTreninga.value
    };

    //odgovor zahteve
    const pridobljena_vrednost = await api.train.getTraining(zahteva);

    //odstranitev blura
    outputValue.style.color = "#000000";
    outputValue.style.textShadow = "0 0 0px #000";

    //nastavitev nove vrednosti
    outputValue.innerText = pridobljena_vrednost.training;

})