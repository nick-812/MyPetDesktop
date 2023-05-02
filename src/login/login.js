

const login_btn = document.getElementById('login');
const err_message = document.getElementById('error');
const email =  document.getElementById('email');
const password =  document.getElementById('password');

//gumb login
login_btn.addEventListener('click', async () => {

    //pridobitev podatkov
    const data = {
        username: email.value,
        password: password.value
    };
    
    //pošiljanje requesta preko preload.js na strežnik
    const login = await api.login.sendLogin(data);

    //če je vrnjen status 200
    if(login.status == 200){
        
        //pridobimo in shranimo token v localstorage
        const token = login.data['token'];
        localStorage.setItem("token", token);

        //preusmeritev na seznam psov
        window.location.href="../psi/psi.html";
    }
    else{
        //če koda ni 200 izpišemo opozorilo uporabniku
        err_message.innerHTML = "Napačen E-Mail ali Geslo";
    }

})
