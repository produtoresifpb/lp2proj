window.onload = () => {
  console.log('Página carregada.')
}

function openNotice(index) {
  const edital = editais[index];
  if (edital) {
    document.getElementById("noticeTitle").innerText = `Edital n° ${
      edital.id
    } - ${edital.author}`;
    document.getElementById("subscriptionDate").innerText = new Date(edital.dataPublicacao).toISOString().split('T')[0];
    document.getElementById("criteriosSelecao").innerText = edital.criteriosSelecao;
    // document.getElementById("editalDescription").innerText = edital.description;
    document.getElementById("editalOverlay").classList.remove("hidden");
  }
}

const closeNotice = () => {
  document.getElementById("editalOverlay").classList.add("hidden");
};

const filterNotice = () => {
  alert("danilo");
};
