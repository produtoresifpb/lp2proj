const confirmarSenha = document.getElementById('confirmarSenha');
const alertaSenha = document.getElementById('alertaSenha');
const submitButton = document.getElementById('submitButton');

const cpfInput = document.getElementById('cpf');
const alertaCpf = document.getElementById('alertaCpf');

const nameInput = document.getElementById('nome');
const alertaName = document.getElementById('alertaName');

let isCpfValid = false;
let isNameValid = false;
let isPasswordValid = false;

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    const calcularDigito = (base) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += parseInt(base[i]) * (base.length + 1 - i);
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const base = cpf.slice(0, 9);
    const digito1 = calcularDigito(base);
    const digito2 = calcularDigito(base + digito1);

    return cpf === base + digito1 + digito2;
}

function validarFormulario() {
    if (isCpfValid && isNameValid && isPasswordValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

confirmarSenha.addEventListener('input', (e) => {
    const senha = document.getElementById('senha');
    if (senha.value != confirmarSenha.value) {
        alertaSenha.classList.remove('visually-hidden');
        isPasswordValid = false;
    } else {
        alertaSenha.classList.add('visually-hidden');
        isPasswordValid = true;
    }
    validarFormulario();
});

cpfInput.addEventListener('input', (e) => {
    if (!validarCPF(cpfInput.value)) {
        alertaCpf.classList.remove('visually-hidden');
        isCpfValid = false;
    } else {
        alertaCpf.classList.add('visually-hidden');
        isCpfValid = true;
    }
    validarFormulario();
});

nameInput.addEventListener('input', (e) => {
    if (nameInput.value.length > 40 || nameInput.value.length < 4) {
        alertaName.classList.remove('visually-hidden');
        isNameValid = false;
    } else {
        alertaName.classList.add('visually-hidden');
        isNameValid = true;
    }
    validarFormulario();
});

const registroForm = document.getElementById('registroForm');
registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });
    
    Swal.fire('Código de verificação enviado para o seu e-mail.');
    
    async function recursiveVerify() {
        const { value: code } = await Swal.fire({
            title: 'Verificação',
            text: 'Insira o código de verificação enviado para o seu e-mail:',
            input: 'text',
            inputPlaceholder: 'Código',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar'
        });

        if (!code) return;

        const response = await fetch('/api/check-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code })
        });

        if (response.status === 200) {
            Swal.fire('Código de verificação correto!');
            const formData = new FormData(registroForm);

            fetch('registro', {
                method: 'POST',
                body: formData,
            }).then(async (res) => {
                const data = await res.json();
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
                alert(e);
            });
        } else {
            await Swal.fire('Código de verificação incorreto!');
            recursiveVerify();
        }
    }
    recursiveVerify();
});
