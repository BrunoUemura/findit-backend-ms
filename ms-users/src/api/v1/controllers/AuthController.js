const AuthService = require("../services/AuthService");
const MissingData = require("../errors/MissingData");

class AuthController {
  static checkRegistrationFields(name, email, password) {
    if (!name) {
      throw new MissingData("name");
    }
    if (!email) {
      throw new MissingData("email");
    }
    if (!password) {
      throw new MissingData("password");
    }
  }

  static checkLoginFields(email, password) {
    if (!email) {
      throw new MissingData("email");
    }
    if (!password) {
      throw new MissingData("password");
    }
  }

  static async registerUser(req, res) {
    const { name, email, password } = req.body;
    const authService = new AuthService();

    try {
      AuthController.checkRegistrationFields(name, email, password);
      const users = await authService.registerUser({ name, email, password });
      return res.json(users);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async confirmRegistration(req, res) {
    const { id } = req.params;
    const authService = new AuthService();

    try {
      const users = await authService.confirmRegistration(id);
      return res.json(users);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const authService = new AuthService();

    try {
      AuthController.checkLoginFields(email, password);
      const { auth, message, token } = await authService.loginUser({
        email,
        password,
      });
      return res.json({ auth, message, token });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async logoutUser(req, res) {
    const { token } = req.body;
    const authService = new AuthService();

    try {
      const { auth, message } = await authService.logoutUser(token);
      return res.json({ auth, message });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
