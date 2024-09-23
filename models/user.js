const { prisma } = require("../prisma/prisma");
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.SALTS);

async function getAllUsers() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

async function createUser(data) {
  const hash = await bcrypt.hash(data.password, saltRounds);
  data.password = hash;
  data.birthDate = new Date(data.birthDate).toISOString();
  const user = await prisma.user.create({ data });
  return user;
}

async function deleteUser(userId) {
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return user;
}

async function updateUser(userId, data) {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
  return user;
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};
