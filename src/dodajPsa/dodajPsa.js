
const main = document.getElementById("content");
const back_btn = document.getElementById("back");
const save_btn = document.getElementById("save");
const animalID = document.getElementById("animalID_value");
const ime = document.getElementById("ime_value");
const userID = document.getElementById("userID_value");
const birthday = document.getElementById("birthday_value");
const petID = document.getElementById("petID_value");


//ko se stran naloži
document.addEventListener('DOMContentLoaded', async () => {

    //omejitev datepickerja na današnji dan
    birthday.max = new Date().toISOString().split("T")[0];

})

//gumb za nazaj
back_btn.addEventListener('click', async () => {
    //link do prejšnje strani
	window.location.href="../psi/psi.html";
})

//gumb za shranjevanje
save_btn.addEventListener('click', async () => {

    //preverimo če so vsa polja zapolnjena
    if(petID.value != "" && userID.value != "" && birthday.value != "" && animalID.value != "" && ime.value != ""){

        //pridobitev seznama psov
        const pets = JSON.parse(localStorage.getItem("oldPets"));

        //nov pes
        const pet = {
            _id : petID.value,
            user_id : userID.value,
            date_of_birth : birthday.value,
            animal_id : animalID.value,
            name : ime.value
        };

        //nalaganje psa na strežnik oz. v newPets
        await api.dogs.pushDog(pet);
        
        //vrnitev na prejšnjo stran
        window.location.href="../psi/psi.html";
    }
    else{

        //če je pet ID prazen, se polje obarva rdeče
        if(petID.value == ""){
            document.getElementById("petID_container").style.backgroundColor = "#a81111";
        }
        else{
            document.getElementById("petID_container").style.backgroundColor = "#073a63";
        }

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

        if(animalID.value == ""){
            document.getElementById("animalID_container").style.backgroundColor = "#a81111";
        }else{
            document.getElementById("animalID_container").style.backgroundColor = "#073a63";
        }

        if(ime.value == ""){
            document.getElementById("ime_container").style.backgroundColor = "#a81111";
        }else{
            document.getElementById("ime_container").style.backgroundColor = "#073a63";
        }

    }

})