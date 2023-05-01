
const main = document.getElementById("content");
const back_btn = document.getElementById("back");
const edit_btn = document.getElementById("edit");
const petID = document.getElementById("animalID_value");
const ime = document.getElementById("ime_value");
let id = "";

document.addEventListener('DOMContentLoaded', async () => {

    let params = (new URL(document.location)).searchParams;
    id = params.get("id");

    const pets = JSON.parse(localStorage.getItem("oldPets"));

    const pes = pets.find(x => x.animal_id === id);

    petID.value = id;
    ime.value = pes.name;
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
    }
    else{
        edit_btn.innerHTML = 'Uredi'

	    ime.readOnly = true;
        ime.style.border = "solid #073a63";

        petID.readOnly = true;
        petID.style.border = "solid #073a63";

        const pets = JSON.parse(localStorage.getItem("oldPets"));

        const index = pets.findIndex(x => x.animal_id === id);
        pets[index].animal_id = petID.value;
        pets[index].ime = ime.value;
        id = petID.innerHTML;

        localStorage.setItem("oldPets", JSON.stringify(pets));

    }
})