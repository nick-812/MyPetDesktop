
const main = document.getElementById("content");
const back_btn = document.getElementById("back");
const save_btn = document.getElementById("save");
const animalID = document.getElementById("animalID_value");
const ime = document.getElementById("ime_value");
const userID = document.getElementById("userID_value");
const birthday = document.getElementById("birthday_value");
const petID = document.getElementById("petID_value");


document.addEventListener('DOMContentLoaded', async () => {
    birthday.max = new Date().toISOString().split("T")[0];

    console.log(Date.now());
})


back_btn.addEventListener('click', async () => {
	window.location.href="../psi/psi.html";
})

save_btn.addEventListener('click', async () => {

    if(petID.value != "" && userID.value != "" && birthday.value != "" && animalID.value != "" && ime.value != ""){

        const pets = JSON.parse(localStorage.getItem("oldPets"));

        const pet = {
            _id : petID.value,
            user_id : userID.value,
            date_of_birth : birthday.value,
            animal_id : animalID.value,
            name : ime.value
        };
        
    
        pets.push(pet);
    
        localStorage.setItem("oldPets", JSON.stringify(pets));
    
        window.location.href="../psi/psi.html";
    }
    else{

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