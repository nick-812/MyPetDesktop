
const myDogs = document.getElementById("myDogs");
const search = document.getElementById("search");
const bolezen1 = document.getElementById("bolezen1");
const bolezen2 = document.getElementById("bolezen2");
const bolezen3 = document.getElementById("bolezen3");
const percentage1 = document.getElementById("percentage1");
const percentage2 = document.getElementById("percentage2");
const percentage3 = document.getElementById("percentage3");
const outputFields = document.getElementById("outputFields");
const outputValue = document.getElementById("output_value");
const loadingOverlay = document.getElementById('loading-overlay');
loadingOverlay.style.display = 'none';

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

    var datumRojstva = new Date(dateOfBirth);
    var month_diff = Date.now() - datumRojstva.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var starost = Math.abs(year - 1970);  






    //pridobitev teže psa
    const weight = pets.find(x => x._id === idPsa).weight;
    //dodajanje teže psa v spodnjo zahtevo






    //oblikovanje zahteve za strežnik
    const zahteva = {
        "Abdomen pain": Number((document.querySelector('#Abdomen_pain:checked')!=null)),
        "Bad breath": Number((document.querySelector('#Bad_breath:checked')!=null)),
        "Circling": Number((document.querySelector('#Circling:checked')!=null)),
        "Constipation": Number((document.querySelector('#Constipation:checked')!=null)),
        "Coughing": Number((document.querySelector('#Coughing:checked')!=null)),
        "Diarrhea": Number((document.querySelector('#Diarrhea:checked')!=null)),
        "Dizzines": Number((document.querySelector('#Dizzines:checked')!=null)),
        "Dragging bottom": Number((document.querySelector('#Dragging_bottom:checked')!=null)),
        "Drooling": Number((document.querySelector('#Drooling:checked')!=null)),
        "Eating stool": Number((document.querySelector('#Eating_stool:checked')!=null)),
        "Fever": Number((document.querySelector('#Fever:checked')!=null)),
        "Hair loss": Number((document.querySelector('#Hair_loss:checked')!=null)),
        "Losing balance": Number((document.querySelector('#Losing_balance:checked')!=null)),
        "Shivering": Number((document.querySelector('#Shivering:checked')!=null)),
        "Swollen abdomen": Number((document.querySelector('#Swollen_abdomen:checked')!=null)),
        "Vomit": Number((document.querySelector('#Vomit:checked')!=null)),
    }

    //odgovor zahteve
    //const pridobljena_vrednost = await api.diagnose.getDiagnose(zahteva);
    var data;

    try {
        loadingOverlay.style.display = 'flex';
        const response = await fetch("http://localhost:1234/diagnoza", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify(zahteva)
        });
        loadingOverlay.style.display = 'none';
      
        data = await response.json();
        // Handle the response data here
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
      }

    //prikaz odseka z rezultati
    outputFields.style.display = "block";

    //odstranitev blura
    outputValue.style.color = "#000000";
    outputValue.style.textShadow = "0 0 0px #000";

    //nastavitev nove vrednosti
    console.log(Object.values(data)[0])
    outputValue.innerText = data.opis;

    //zelena barva labela nad 75% verjetnosti, nato rumena in rdeča
    /*if(pridobljena_vrednost.verjetnost1>75){
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
    */

    //nastavitev vrednosti % v polje z rezultatom
    percentage1.innerHTML = `${Object.values(data)[0]}%`;
    percentage2.innerHTML = `${Object.values(data)[1]}%`;
    percentage3.innerHTML = `${Object.values(data)[2]}%`;

    //vpis bolezni med rezultate
    bolezen1.innerHTML = Object.keys(data)[0];
    bolezen2.innerHTML = Object.keys(data)[1];
    bolezen3.innerHTML = Object.keys(data)[2];
})