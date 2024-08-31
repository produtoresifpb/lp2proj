const { prisma } = require("../prisma/prisma");

async function getAllNotices(query, filter) {
  const allNotices = await prisma.notice.findMany({
    where: {
      OR: [
        { title: { contains: query }},
        { author: { contains: query }},
        { description: { contains: query }}
      ]
    }
  });
  switch(filter) {
    case 'recent':
      allNotices.sort((a, b) => b.dataPublicacao - a.dataPublicacao)
    break
    case 'category':
      allNotices.filter(document => document.artisticCategory == filterValue)
    break
    case 'apoio':
      allNotices.filter(document => document.detalhesFinanciamento == filterValue)
    break
  
  }
  return allNotices;
}

async function createNotice(data) {
  const notice = await prisma.notice.create({ data })
  return notice
}

module.exports = {
  getAllNotices,
  createNotice
}