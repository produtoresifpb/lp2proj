function openNotice(index) {
  fetch("/api/editais/list")
    .then((res) => res.json())
    .then(({ editais }) => {
      const selectedEdital = editais[index];
      document.getElementById("editalTitle").innerText = `>> Edital n° ${
        index + 1
      } - ${selectedEdital.author}`;
      document.getElementById("editalDescription").innerText =
        selectedEdital.description;

      document.getElementById("editalOverlay").classList.remove("hidden");
    })
    .catch((e) => console.log(e));
}

const closeNotice = () => {
  document.getElementById("editalOverlay").classList.add("hidden");
}

const filterNotice = () => {
  alert("danilo");
};
