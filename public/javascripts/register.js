const confirmarSenha = document.getElementById('confirmarSenha')
const alertaSenha = document.getElementById('alertaSenha')
const submitButton = document.getElementById('submitButton')

confirmarSenha.addEventListener('input', (e) => {
    const senha = document.getElementById('senha')
    if (senha.value != confirmarSenha.value) {
        alertaSenha.classList.remove('visually-hidden')
        submitButton.disabled = true
    } else {
        alertaSenha.classList.add('visually-hidden')
        submitButton.disabled = false
    }
})

const registroForm = document.getElementById('registroForm')
registroForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(registroForm)
    fetch('registro', {
        method: 'post',
        body: formData,
    }).then(async (res) => {
        const data = await res.json()
        if (res.status == 400) {
            Swal.fire({
                icon: "error",
                title: data.message,
                showConfirmButton: true,
            });
        } else {
            Swal.fire({
                icon: "success",
                title: 'Conta criada com sucesso',
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.replace("/");
            }, 2000);
        }
    }).catch(e => {
        alert(e)
    })
})