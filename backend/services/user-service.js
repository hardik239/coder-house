import User from "../modals/User.js";
class UserService {
  async findUser(filter) {
    return await User.findOne(filter);
  }

  async createUser(data) {
    return await User.create(data);
  }
}

export default new UserService();
