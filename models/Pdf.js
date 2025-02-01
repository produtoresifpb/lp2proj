const { prisma } = require('../prisma/prisma');

async function createPdf({ noticeID, path }) {
 
  const newPdf = await prisma.pdf.create({
    data: {
      path,
      notice: {
        connect: {
          id: noticeID,
        },
      },
    },
  });

  return newPdf;
}

async function updatePdf({ noticeID, path }) {
  const updatedPdf = await prisma.pdf.update({
    where: {
      noticeID: noticeID, // Corrigido para usar a chave correta
    },
    data: {
      path,
      notice: {
        connect: {
          id: noticeID,
        },
      },
    },
  });

  return updatedPdf;
}

module.exports = {
  createPdf,
  updatePdf,
};