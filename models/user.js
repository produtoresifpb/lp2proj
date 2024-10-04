const { prisma } = require("../prisma/prisma");
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.SALTS);

async function getAllUsers() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

async function getUser(where) {
  const user = await prisma.user.findUnique({
    where,
  })

  return user;
}

async function getUserById(id) {
  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: { EditaisFavoritos: true },
    });
 
    return user;
  } else {
    throw new Error('Unable to find user');
  }
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

async function updateUser({ id, data }) {
  if (!id || !data || Object.keys(data).length === 0) {
    throw new Error('Unable to update user.');
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  } catch (error) {
    throw new Error('Unable to update user: ' + error.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
