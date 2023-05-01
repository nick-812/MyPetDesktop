
const main = document.getElementById("content");
const back_btn = document.getElementById("back");
const save_btn = document.getElementById("save");
const animalID = document.getElementById("animalID_value");
const ime = document.getElementById("ime_value");
const userID = document.getElementById("userID_value");
const birthday = document.getElementById("birthday_value");
const petID = document.getElementById("petID_value");


back_btn.addEventListener('click', async () => {
	window.location.href="../psi/psi.html";
})

save_btn.addEventListener('click', async () => {

    const pets = JSON.parse(localStorage.getItem("oldPets"));

    const pet = {
        _id : petID.value,
        user_id : userID.value,
        date_of_birth : birthday.value,
        animal_id : petID.value,
        name : ime.value
    };
    

    pets.push(pet);

    localStorage.setItem("oldPets", JSON.stringify(pets));

    window.location.href="../psi/psi.html";
    
})