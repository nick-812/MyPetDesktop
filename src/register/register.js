

const login_btn = document.getElementById('register');
const err_message = document.getElementById('error');
const email =  document.getElementById('email');
const password =  document.getElementById('password');

login_btn.addEventListener('click', async () => {

    const data = {
        username: email.value,
        password: password.value
    };
    
    const register = await api.register.sendRegister(data);

    if(register.status == 201){
        window.location.href="../login/login.html";
    }
    else{
        err_message.innerHTML = "Napaka pri registraciji";
    }
    

})
