
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

document.addEventListener('DOMContentLoaded', async () => {

    let params = (new URL(document.location)).searchParams;
    id = params.get("id");

    const pets = JSON.parse(localStorage.getItem("oldPets"));

    const pes = pets.find(x => x._id === id);

    petID.value = id;
    ime.value = pes.name;
    animalID.value = pes.animal_id;
    birthday.value = pes.date_of_birth;
    userID.value = pes.user_id;
});


back_btn.addEventListener('click', async () => {
	window.location.href="../psi/psi.html";
})

edit_btn.addEventListener('click', async () => {
    if(edit_btn.innerHTML === 'Uredi'){
        edit_btn.innerHTML = 'Shrani'

	    ime.readOnly = false;
        ime.style.border = "solid #FFFFFF";

        petID.readOnly = false;
        petID.style.border = "solid #FFFFFF";

        animalID.readOnly = false;
        animalID.style.border = "solid #FFFFFF";

        birthday.readOnly = false;
        birthday.style.border = "solid #FFFFFF";

        userID.readOnly = false;
        userID.style.border = "solid #FFFFFF";
    }
    else{
        edit_btn.innerHTML = 'Uredi'

	    ime.readOnly = true;
        ime.style.border = "solid #073a63";

        petID.readOnly = true;
        petID.style.border = "solid #073a63";

        animalID.readOnly = true;
        animalID.style.border = "solid #073a63";

        birthday.readOnly = true;
        birthday.style.border = "solid #073a63";

        userID.readOnly = true;
        userID.style.border = "solid #073a63";

        const pets = JSON.parse(localStorage.getItem("oldPets"));

        const index = pets.findIndex(x => x._id === id);
        pets[index]._id = petID.value;
        pets[index].name = ime.value;
        pets[index].animal_id = animalID.value;
        pets[index].date_of_birth = birthday.value;
        pets[index].user_id = userID.value;

        id = petID.innerHTML;

        localStorage.setItem("oldPets", JSON.stringify(pets));

    }
})

delete_btn.addEventListener('click', async () => {

    if(counter === 0){
        delete_btn.style.backgroundColor = "#88031d";
        delete_btn.style.hove = "#88031d";
        counter = 1;
    }
    else {
        const pets = JSON.parse(localStorage.getItem("oldPets"));

        const index = pets.findIndex(x => x._id === id);
        pets.splice(index, 1);

        localStorage.setItem("oldPets", JSON.stringify(pets));

        window.location.href="../psi/psi.html";
    }
    
})