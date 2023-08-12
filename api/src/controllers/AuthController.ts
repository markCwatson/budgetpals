import AuthService from '../services/AuthService';

class AuthController {
  static async token(req, res): Promise<void> {
    const { email, password } = req.body;
    const token = await AuthService.generateToken(email, password);
    if (!token) {
      res.status(401).send({ error: 'Invalid credentials' });
      return;
    }
    res.status(200).send({ access_token: token });
  }
}

export default AuthController;
