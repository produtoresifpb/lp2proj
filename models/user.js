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

async function updateUser({ id, name, email, password }) {
  if (name && email && password && id) {
    const hash = await bcrypt.hash(password, saltRounds);
 
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: { name, email, password: hash },
    });
 
    return updatedUser;
  } else {
    throw new Error('Unable to update user');
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
