
const main = document.getElementById("content");
const back_btn = document.getElementById("back");
const edit_btn = document.getElementById("edit");
const delete_btn = document.getElementById("delete");
const petID = document.getElementById("ID_value");
const ime = document.getElementById("ime_value");
const animalID = document.getElementById("animalID_value");
const userID = document.getElementById("userID_value");
const birthday = document.getElementById("birthday_value");
let id = "";
let counter = 0;

//ko je stran naložena
document.addEventListener('DOMContentLoaded', async () => {

    //datepicker max na današnji dan
    birthday.max = new Date().toISOString().split("T")[0];

    //prejememo id iz parametrov url
    let params = (new URL(document.location)).searchParams;
    id = params.get("id");
    console.log(("Id psa, ki ga urejamo: " + id))

    //nalaganje seznama psov
    const oldpets = JSON.parse(localStorage.getItem("oldPets"));
    const newPets = JSON.parse(localStorage.getItem("newPets"));
    const pets = oldpets.concat(newPets);
    console.log("Seznam petov za podatkiPsa: " + JSON.stringify(pets))
    //poiščemo psa po id-ju
    const pes = pets.find(x => x._id === id);

    //vnos podatkov o psu v vnosna polja7
    //# odznaču nekaj
    //petID.value = id;
    ime.value = pes.name;
    //animalID.value = pes.animal_id;
    birthday.value = pes.date_of_birth;
    userID.value = pes.weight;
});

window.onload = function() {
    document.getElementById('userID_value').oninput = function () {
        if (this.value.length > 3) {
            this.value = this.value.slice(0,3); 
        }
        this.value = this.value.replace(/[^0-9]/g,''); // Only allow numerical input
    };

    document.getElementById('ime_value').oninput = function () {
        if (this.value.length > 128) {
            this.value = this.value.slice(0,128); 
        }
        this.value = this.value.replace(/[^a-žA-Ž ]/g,''); // Only allow letters
    };
};

//gumb za preusmeritev nazaj
back_btn.addEventListener('click', async () => {
	window.location.href="../psi/psi.html";
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



        birthday.readOnly = false;
        birthday.style.border = "solid #FFFFFF";

        userID.readOnly = false;
        userID.style.border = "solid #FFFFFF";
    }
    else{
        //če je gumb v funkciji shranjevanja
        //preverimo ali so vsa polja izpolnjena
        if(userID.value != "" && birthday.value != "" && ime.value != ""){

            //spremenimo gumb nazaj v uredi
            edit_btn.innerHTML = 'Uredi'

            //zaklenemo polja za urejanje in odstranimo obrobo
            ime.readOnly = true;
            ime.style.border = "solid #073a63";



            birthday.readOnly = true;
            birthday.style.border = "solid #073a63";

            userID.readOnly = true;
            userID.style.border = "solid #073a63";

            //pridobimo seznam psov
            const pets = JSON.parse(localStorage.getItem("oldPets"));

            //poiščemo index trenutnega psa
            const index = pets.findIndex(x => x._id === id);

            //popravimo vrednosti psa
            //#Ne smemo popravljati idja, user ne sme imeti te možnosti
           // pets[index]._id = petID.value;
            pets[index].name = ime.value;
            pets[index].date_of_birth = birthday.value;
            pets[index].weight = userID.value;

            //updateamo dog na serverju
            await api.dogs.updateDog(pets[index]);

            //ponovno nastavimo spremenljivko id
            //# ni potrebno, id se ne spremeni
           // id = petID.innerHTML;

            //shranimo seznam psov nazaj v localstorage
            localStorage.setItem("oldPets", JSON.stringify(pets));

            //povrnemo container na prvotne barve iz rdeče
            //document.getElementById("ID_container").style.backgroundColor = "#073a63";
            document.getElementById("userID_container").style.backgroundColor = "#073a63";
            document.getElementById("birthday_container").style.backgroundColor = "#073a63";
            //document.getElementById("animalID_container").style.backgroundColor = "#073a63";
            document.getElementById("ime_container").style.backgroundColor = "#073a63";
        }

        //če so nekatera polja prazna
        else{
            
            //če je petID prazno ga obarvamo rdeče
            //#Ni vec prikaza teh elementov
          /*  if(petID.value == ""){
                document.getElementById("ID_container").style.backgroundColor = "#a81111";
            }
            else{
                document.getElementById("ID_container").style.backgroundColor = "#073a63";
            }*/
    
            if(userID.value == ""){
                document.getElementById("userID_container").style.backgroundColor = "#a81111";
            }else{
                document.getElementById("userID_container").style.backgroundColor = "#073a63";
            }
    
            if(birthday.value == ""){
                document.getElementById("birthday_container").style.backgroundColor = "#a81111";
            }else{
                document.getElementById("birthday_container").style.backgroundColor = "#073a63";
            }
    
            /*if(animalID.value == ""){
                document.getElementById("animalID_container").style.backgroundColor = "#a81111";
            }else{
                document.getElementById("animalID_container").style.backgroundColor = "#073a63";
            }*/
    
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

        //pridobimo seznam psov
        const pets = JSON.parse(localStorage.getItem("oldPets"));

        //poiščemo index in izbrišemo psa
        const index = pets.findIndex(x => x._id === id);
        pets.splice(index, 1);

        //delete pes na serverju
        await api.dogs.deleteDog(id)

        //shranimo seznam psov nazaj
        localStorage.setItem("oldPets", JSON.stringify(pets));

        //se vrnemo na prejšnjo stran
        window.location.href="../psi/psi.html";s
    }
    
})