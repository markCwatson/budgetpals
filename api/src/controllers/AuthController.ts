import AuthService from '../services/AuthService';

class AuthController {
  static async token(req, res): Promise<void> {
    const { email, password } = req.body;

    const auth = new AuthService(email, password);
    const token = await auth.getToken();

    res.status(200).send({ token });
  }
}

export default AuthController;
