

const login_btn = document.getElementById('register');
const err_message = document.getElementById('error');
const email =  document.getElementById('email');
const password =  document.getElementById('password');

//gumb za registracijo
login_btn.addEventListener('click', async () => {

    //ustvarimo podatke zahteve
    const data = {
        username: email.value,
        password: password.value
    };
    
    //kličemo preload.js funkcijo in nato server za registracijo
    const register = await api.register.sendRegister(data);

    //če je uspešna, se vrnemo na login page
    if(register.status == 201){
        window.location.href="../login/login.html";
    }

    //če ni uspešna, uporabniku javimo napako
    else{
        err_message.innerHTML = "Napaka pri registraciji";
    }
    

})
