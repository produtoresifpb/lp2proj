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
          artisticCategory: filter.categoria ? filter.categoria : undefined
        },
        {
          valorFinanciamento: {
            gte: filter.valorMin || undefined,
            lte: filter.valorMax || undefined, 
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