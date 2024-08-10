const { prisma } = require("../prisma/prisma");

async function getAllNotices() {
  const allNotices = await prisma.notice.findMany();
  return allNotices;
}

async function createNotice(data) {
  const notice = await prisma.notice.create({ data })
}

module.exports = {
  getAllNotices
}