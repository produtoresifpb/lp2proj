const filterBtn = document.getElementById("filter-btn");
const filter = document.getElementById("filter");

const filterOrder = document.getElementById("filterOrder");
const dataPrazo = document.getElementById("dataPrazo");
const apoioTipo = document.getElementById("apoioTipo");
const categoriaArtistica = document.getElementById("categoriaArtistica");
const valorMin = document.getElementById("valor-minimo");
const valorMax = document.getElementById("valor-maximo");

filterOrder.value = filterDrops[0];
apoioTipo.value = filterDrops[1];
categoriaArtistica.value = filterDrops[2];

function openNotice(index) {
  const edital = editais[index];
  if (edital) {
    document.getElementById("noticeTitle").innerText = `Edital n° ${
      edital.id
    } - ${edital.title}`;
    const date = new Date(edital.subscriptionDeadline);
    date.setHours(date.getHours() + 3);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    const categorys = {
      'THEATER': 'Teatro',
      'MUSIC': 'Música',
      'DANCE': 'Dança',
      'ARTS': 'Artes Visuais',
    }
 
    document.getElementById("feedback").href = `/edital/feedback/${edital.id}`
    document.getElementById("subscriptionDeadline").innerText = `${formattedDay}/${formattedMonth}/${date.getFullYear()}`;
    document.getElementById("favoritar").onclick = function() {
      const editais = JSON.parse(localStorage.getItem("editais") || '[]'); 
      if (editais.find(el => el.id == edital.id)) {
        alert('Esse edital já está favoritado!')
        return;
      }; 
      editais.push(edital) 
      localStorage.setItem('editais', JSON.stringify(editais)) 
      alert('Edital favoritado.')
    }
    const showMore = document.getElementById('showMore')
    showMore.onclick = function() {
      const overlay = document.getElementById('hidden')
      overlay.classList.toggle('hidden')
      if (overlay.classList.contains("hidden")) {
        showMore.innerText = "Mais informações"
      } else {
        showMore.innerText = "Menos informações"
      }
    }

    document.getElementById('processoInscricao').innerText = edital.processoInscricao
    document.getElementById('criteriosSelecao').innerText = edital.criteriosSelecao
    
    document.getElementById('artisticCategory').innerText = categorys[edital.artisticCategory];
    document.getElementById("description").innerText = edital.description;
    document.getElementById("editalOverlay").classList.remove("hidden");
  }
}

const closeNotice = () => {
  document.getElementById("editalOverlay").classList.add("hidden");
  const overlay = document.getElementById('hidden')
  overlay.classList.add('hidden')
  if (overlay.classList.contains("hidden")) {
    showMore.innerText = "Mais informações"
  } else {
    showMore.innerText = "Menos informações"
  }
};

filterBtn.addEventListener("click", () => {
  filter.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {
  if (!filter.contains(event.target) && !filterBtn.contains(event.target)) {
    filter.classList.add("hidden");
  }
});

const clearFilter = () => {
  filterOrder.value = "recentes";
  dataPrazo.value = "";
  apoioTipo.value = "";
  categoriaArtistica.value = "";
  valorMin.value = "";
  valorMax.value = "";
};
