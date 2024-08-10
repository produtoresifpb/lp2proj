window.onload = () => {
  console.log('Página carregada.')
}

function openNotice(index) {
  const edital = editais[index];
  if (edital) {
    document.getElementById("editalTitle").innerText = `Edital n° ${
      index + 1
    } - ${edital.author}`;
    document.getElementById("editalDescription").innerText = edital.description;
    document.getElementById("editalOverlay").classList.remove("hidden");
  }
}

const closeNotice = () => {
  document.getElementById("editalOverlay").classList.add("hidden");
};

const filterNotice = () => {
  alert("danilo");
};
