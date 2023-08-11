import AuthService from '../services/AuthService';

class AuthController {
  static async token(req, res) {
    const { username, password } = req.body;

    const auth = new AuthService(username, password);
    const token = auth.getToken();

    res.status(200).send({ token });
  }
}

export default AuthController;
