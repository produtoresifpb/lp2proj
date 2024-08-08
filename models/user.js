const { prisma } = require("../prisma/prisma");

async function getAllUsers() {
  const allUsers = await prisma.User.findMany();
  return allUsers;
}

module.exports = getAllUsers;
