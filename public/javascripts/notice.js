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
    const date = new Date(edital.dataPublicacao);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    document.getElementById("subscriptionDate").innerText = `${formattedDay}/${formattedMonth}/${date.getFullYear()}`;
    document.getElementById("criteriosSelecao").innerText = edital.criteriosSelecao;
    document.getElementById("editalOverlay").classList.remove("hidden");
  }
}

const closeNotice = () => {
  document.getElementById("editalOverlay").classList.add("hidden");
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
