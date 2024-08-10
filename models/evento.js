const { prisma } = require("../prisma/prisma");

async function getAllEventos(param) {
  const allEventos = await prisma.evento.findMany({
    where: {
      OR: [
        { NomeEvento: { contains: param }},
        { Descricao: { contains: param }},
        { Localizacao: { contains: param }},
        { Organizador: { contains: param }}
      ]
    }
  });
  return allEventos;
}

async function createEvento(data) {
  const evento = await prisma.evento.create({ data });
  return evento;
}

async function updateEvento(id, data) {
  const evento = await prisma.evento.update({
    where: { EventoID: id },
    data
  });
  return evento;
}

async function deleteEvento(id) {
  const evento = await prisma.evento.delete({
    where: { EventoID: id }
  });
  return evento;
}

module.exports = {
  getAllEventos,
  createEvento,
  updateEvento,
  deleteEvento
};
