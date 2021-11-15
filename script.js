let clearButtons = document.querySelectorAll('.icone-senha')
let btnCadastrar = document.querySelector('#btn')

let nome = document.querySelector('#nome')
let usuario = document.querySelector('#usuario')
let senha = document.querySelector('#senha')
let confirmarSenha = document.querySelector('#confirmar-senha')

let labelNome = document.querySelector('#labelNome')
let labelUsuario = document.querySelector('#labelUsuario')
let labelSenha = document.querySelector('#labelSenha')
let labelConfirmarSenha = document.querySelector('#labelConfirmarSenha')

let validNome = false
let validUsuario = false
let validSenha = false
let validConfirmarSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

clearButtons.forEach((button, index) => {
    button.onclick = () => seePassword(index)
})

//função para ligar/desligar a visualização da senha
function seePassword(index){
    let inputs = document.querySelectorAll('.senha');
    let currentInput = inputs[index]
        if(currentInput.getAttribute('type') == 'password') {
            currentInput.setAttribute('type', 'text');
        } else {
            currentInput.setAttribute('type', 'password');
        }
    }

nome.addEventListener('keyup', () =>{
    if(nome.value.length <= 1 || nome.value.length >= 32){
        nome.style.color = 'red'
        nome.style.borderColor = 'red'
        labelNome.innerHTML = 'Nome Incorreto'
        labelNome.style.color = 'red'
        validNome = false
    }
    else{
        nome.style.color = 'green'
        nome.style.borderColor = 'green'
        labelNome.innerHTML = ''
        validNome = true
    }
})

usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 5 || usuario.value == localStorage.getItem('userCad')){
        usuario.style.color = 'red'
        usuario.style.borderColor = 'red'
        labelUsuario.innerHTML = 'Usuário Incorreto/Usuário já existe'
        labelUsuario.style.color = 'red'
        validUsuario = false
    }
    else{
        usuario.style.color = 'green'
        usuario.style.borderColor = 'green'
        labelUsuario.innerHTML = ''
        validUsuario = true
    }
})

senha.addEventListener('keyup', () =>{
    if(senha.value.length <= 5){
        senha.style.color = 'red'
        senha.style.borderColor = 'red'
        labelSenha.innerHTML = 'Senha Incorreta'
        labelSenha.style.color = 'red'
        validSenha = false
    }
    else{
        senha.style.color = 'green'
        senha.style.borderColor = 'green'
        labelSenha.innerHTML = ''
        validSenha = true
    }
})

confirmarSenha.addEventListener('keyup', () =>{
    if(confirmarSenha.value != senha.value){
        confirmarSenha.style.color = 'red'
        confirmarSenha.style.borderColor = 'red'
        labelConfirmarSenha.innerHTML = 'Senha Incorreta'
        labelConfirmarSenha.style.color = 'red'
        validConfirmarSenha = false
    }
    else{
        confirmarSenha.style.color = 'green'
        confirmarSenha.style.borderColor = 'green'
        labelConfirmarSenha.innerHTML = ''
        validConfirmarSenha = true
    }
})

function register(){
    if(validNome && validUsuario && validSenha && validConfirmarSenha){
        let listUser = JSON.parse(localStorage.getItem('listUser') || '[]')

        listUser.push(
            {
                nomeCad: nome.value,
                userCad: usuario.value,
                senhaCad: senha.value
            }
        )

        localStorage.setItem('listUser', JSON.stringify(listUser))

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = 'Cadastrando Usuário ...'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''
        btnCadastrar.disabled = true
        btnCadastrar.style.cursor = 'default'

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 3000)
    }
    else{
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Preencha todos os campos!'
        msgSuccess.setAttribute('style', 'display: none')
        msgSuccess.innerHTML = ''
    }
}

function login(){
    let user = document.getElementById('user')
    let password = document.getElementById('password')
    let listUser = []
    let userValid = {
        nome: '',
        user: '',
        senha:''
    }

    listUser = JSON.parse(localStorage.getItem('listUser'))

    listUser.forEach((item) =>{
        if(user.value == item.userCad && password.value == item.senhaCad){
            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                senha: item.senhaCad
            }
        }
    })

    if(user.value == userValid.user && password.value == userValid.senha && user.value != '' && password.value != ''){
        window.location.href = 'login.html'

        let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
        localStorage.setItem('token', token)
        localStorage.setItem('userLogado', JSON.stringify(userValid))
    }
    else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha inválidos!'
    }
}

console.log(localStorage.getItem('userCad'))