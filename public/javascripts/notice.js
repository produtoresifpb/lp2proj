window.onload = () => {
  console.log('Página carregada.')
  initBusca()
  initNotices()
}

function initBusca() {
  const buscarForm = document.getElementById('buscar-edital')
  buscarForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const buscaParam = document.getElementById('busca')
    if (!buscaParam.value.length) return alert('Coloque algo para buscar')
    fetch("/api/editais/list?busca=" + encodeURIComponent(buscaParam.value))
      .then((res) => res.json())
      .then((editais) => {
        organizarEditais(editais)
      })
  })
}

function initNotices() {
  fetch("/api/editais/list")
    .then((res) => res.json())
    .then((editais) => {
      organizarEditais(editais)
    })
    .catch((e) => console.log(e));
}

function openNotice(index) {
  fetch("/api/editais/list")
    .then((res) => res.json())
    .then((editais) => {
      const selectedEdital = editais[index];
      document.getElementById("editalTitle").innerText = `>> Edital n° ${index + 1
        } - ${selectedEdital.author}`;
      document.getElementById("editalDescription").innerText =
        selectedEdital.description;

      document.getElementById("editalOverlay").classList.remove("hidden");
    })
    .catch((e) => console.log(e));
}

function organizarEditais(editais, param) {
  const editaisDiv = document.getElementById("editais");
  editaisDiv.innerHTML = ''
  if (editais.length === 0) {
    const msg = `<li class="list-group-item">
                          <p>Nenhum edital encontrado</p>
                      </li>`;
    editaisDiv.insertAdjacentHTML("beforeend", msg);
  }
  editais.forEach((el, i) => {
    const edital = `<li class="list-group-item"><button onclick="openNotice(${i})"><a href="#" class="link-underline link-underline-opacity-0">
                          <h4 class="text-black">>> Edital n° ${i + 1} - ${el.author}</h4>
                          </a></button>
                          <p class="text-body" style="font-size: 16px;">${el.description}</p>
                      </li>`;
    editaisDiv.insertAdjacentHTML("beforeend", edital);
  });
}

const closeNotice = () => {
  document.getElementById("editalOverlay").classList.add("hidden");
}

const filterNotice = () => {
  alert("danilo");
};
