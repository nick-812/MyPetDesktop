
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

//gumb za shranjevanje
save_btn.addEventListener('click', async () => {

    //preverimo če so vsa polja zapolnjena
    if(userID.value != "" && birthday.value != "" && ime.value != ""){

        //pridobitev seznama psov
        const pets = JSON.parse(localStorage.getItem("oldPets"));

        //nov pes
        const pet = {
            _id : await api.dogs.generateUUID(),
            name : ime.value,
            user_id : localStorage.getItem("user_id"),
            date_of_birth : birthday.value,
            weight : userID.value,
            
        };
        console.log("Novi pet: " + JSON.stringify(pet))

        //nalaganje psa na strežnik oz. v newPets
        await api.dogs.pushDog(pet);
        
        //vrnitev na prejšnjo stran
        window.location.href="../psi/psi.html";
    }
    else{

        //če je pet ID prazen, se polje obarva rdeče
       /* if(petID.value == ""){
            document.getElementById("petID_container").style.backgroundColor = "#a81111";
        }
        else{
            document.getElementById("petID_container").style.backgroundColor = "#073a63";
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

      /*  if(animalID.value == ""){
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

})