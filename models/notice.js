const { prisma } = require("../prisma/prisma");

async function getAllNotices(param) {
  const allNotices = await prisma.notice.findMany({
    where: {
      OR: [
        { title: { contains: param }},
        { author: { contains: param }},
        { description: { contains: param }}
      ]
    }
  });
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