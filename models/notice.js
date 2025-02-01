const { prisma } = require("../prisma/prisma");

async function getAllNotices(query, filter) {
  const allNotices = await prisma.notice.findMany({
    where: {
      AND: [
        {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { organizador: { contains: query, mode: 'insensitive'} },
            { description: { contains: query, mode: 'insensitive'} },
          ],
        },
        {
          subscriptionDeadline: {
            lte: new Date(filter.prazo || "2077-12-31"), // Data padrão
          },
        },
        {
          artisticCategory: filter.categoria,
        },
        {
          support: filter.apoio,
        },
        {
          valorFinanciamento: {
            gte: filter.valorMin,
            lte: filter.valorMax,
          },
        },
      ],
    },
    orderBy: {
      dataPublicacao:
        filter.order == "recentes" || !filter.order ? "desc" : "asc",
    },
    include: {
      pdfFile: {
        select: {
          path: true,
        },
      },
    },
  });

  return allNotices;
}

async function getNoticeById(id) {
  const notice = await prisma.notice.findUnique({
    where: {
      id: id,
      include: {
        pdfFile: {
          select: {
            path: true,
          },
        },
      },
    }
  });
  return notice;
}

async function createNotice(data) {
  const notice = await prisma.notice.create({ data });
  return notice;
}

module.exports = {
  getAllNotices,
  getNoticeById,
  createNotice,
};
