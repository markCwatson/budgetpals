import AuthService from '../services/AuthService';
import ApiError from '../errors/ApiError';

class AuthController {
  static async token(req, res): Promise<void> {
    const { email, password } = req.body;
    const token = await AuthService.generateToken(email, password);
    if (!token) {
      throw new ApiError({
        code: 401,
        message: 'Invalid credentials',
        explanation: 'The provided email and password combination is invalid',
      });
    }
    res.status(200).send({ access_token: token });
  }
}

export default AuthController;
