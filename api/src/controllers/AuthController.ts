import AuthService from '../services/AuthService';
import ApiError from '../errors/ApiError';
import { ActionFunction } from '../routes/routeHandler';

class AuthController {
  static token: ActionFunction = async (req, res, next) => {
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
  };
}

export default AuthController;
