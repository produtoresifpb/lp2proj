const { prisma } = require("../prisma/prisma");

// async function getNoticeFeedbackById(id) {
//   const feedback = await prisma.noticefeedback.find
// }

async function createNoticeFeedback(data) {
  // console.log(prisma)
  // tem q fazer a relação
  const feedback = await prisma.feedbackNotice.create({ data });
  return feedback;
}

async function deleteNoticeFeedback(id) {
  const feedback = await prisma.feedbackNotice.delete({
    where: { id: id }
  });
  return feedback;
}

module.exports = {
  // getNoticeFeedbackById,
  createNoticeFeedback,
  deleteNoticeFeedback
};
