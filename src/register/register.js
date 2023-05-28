

const login_btn = document.getElementById('register');
const err_message = document.getElementById('error');
const email =  document.getElementById('email');
const password =  document.getElementById('password');

function showToast(message) {
    let toast = document.getElementById("toast");
    toast.className = "show";
    toast.innerText = message;
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}
//gumb za registracijo
login_btn.addEventListener('click', async () => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value)) {
        showToast('E-mail is invalid.');
        return;
    }
    else if(ime.value.length<6) {
        showToast('Name should be at least 6 characters.');
        return;
    }
    else if(password.value.length<8) {
        showToast('Password should be at least 8 characters.');
        return;
    }
   

    //ustvarimo podatke zahteve
    
    const data = {
        username: ime.value,
        email: email.value,
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
