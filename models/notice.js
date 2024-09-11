const { prisma } = require("../prisma/prisma");

async function getAllNotices(query, filter) {
  const allNotices = await prisma.notice.findMany({
    where: {
      AND: [
        {
          OR: [
            { title: { contains: query } },
            { author: { contains: query } },
            { description: { contains: query } },
          ],
        },
        {
          subscriptionDeadline: {
            lte: new Date(filter.prazo || "2050-12-12"),
          },
        },
        {
          artisticCategory:   filter.categoria 
        },
        {
          support:   filter.apoio 
        },
        {
          valorFinanciamento: {
            gte: filter.valorMin,
            lte: filter.valorMax 
        },
      },
      ],
    },
    orderBy: {
      dataPublicacao:
        filter.order == "recentes" || !filter.order ? "desc" : "asc",
    },
  });

  return allNotices;
}

async function createNotice(data) {
  const notice = await prisma.notice.create({ data });
  return notice;
}

module.exports = {
  getAllNotices,
  createNotice,
};
