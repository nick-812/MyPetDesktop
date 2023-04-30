

const login_btn = document.getElementById('login');
const err_message = document.getElementById('error');
const email =  document.getElementById('email');
const password =  document.getElementById('password');

login_btn.addEventListener('click', async () => {

    const data = {
        username: email.value,
        password: password.value
    };
    
    const login = await api.login.sendLogin(data);

    if(login.status == 200){

        console.log(login);
    
        const token = login.data['token'];
        localStorage.setItem("token", token);

        console.log(token);

        window.location.href="../psi/psi.html";
    }
    else{
        err_message.innerHTML = "Napačen E-Mail ali Geslo";
    }
    

})
