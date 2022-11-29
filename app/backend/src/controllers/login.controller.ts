import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import LoginSchema from '../validations/login.schema';

export default class LoginController {
  public loginService = new LoginService();
  public loginSchema = new LoginSchema();

  async login(req: Request, res: Response) {
    const { error } = await this.loginSchema.validateObject(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const token = await this.loginService.login(req.body);
    if (!token) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(200).json({ token });
  }

  async validateToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const user = await this.loginService.validateToken(authorization);
      if (user) return res.status(200).json({ role: user });
    }
  }
}
