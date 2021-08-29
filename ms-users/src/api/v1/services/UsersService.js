const NotFound = require("../errors/NotFound");
const database = require("../database/models");

async function checkUserExists(id) {
  const userExists = await database.Users.findOne({ where: { id } });

  if (!userExists) {
    throw new NotFound("User");
  }

  return userExists;
}

class UsersService {
  async showAllUsers() {
    return await database.Users.findAll();
  }

  async showOneUser(id) {
    return await database.Users.findOne({ where: { id } });
  }

  async showUsersQuantity() {
    const { count } = await database.Users.findAndCountAll();
    return count;
  }

  async getProfileImage(id) {
    const userExists = await checkUserExists(id);

    const { user_photo } = userExists;

    return user_photo;
  }

  async updateUser(userInfo, id) {
    await checkUserExists(id);

    await database.Users.update(userInfo, { where: { id } });
    return { message: `UPDATED user id ${id}` };
  }

  async uploadProfileImage(filename, id) {
    await checkUserExists(id);

    await database.Users.update({ user_photo: filename }, { where: { id } });
    return { message: `UPDATED user id ${id} profile photo` };
  }

  async deleteUser(id) {
    await checkUserExists(id);

    await database.Users.destroy({ where: { id } });
    return { message: `DELETED user id ${id}` };
  }
}

module.exports = UsersService;
