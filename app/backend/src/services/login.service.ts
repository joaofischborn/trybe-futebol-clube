import * as jsonwebtoken from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/UsersModel';

class LoginService {
  public user = new User();
  public jwt = jsonwebtoken;

  async login(body: ILogin) {
    const { email, password } = body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const check = compareSync(password, user.dataValues.password);
      const payload = { email: user.dataValues.email,
        password: user.dataValues.password,
        role: user.dataValues.role };
      if (check) {
        const token = this.jwt.sign(payload, `${process.env.JWT_SECRET as string}`);
        return token;
      }
    }
  }

  async validateToken(token: string) {
    const isAuthorized = this.jwt.verify(token, `${process.env.JWT_SECRET as string}`) as ILogin;
    const { email } = isAuthorized;
    const user = await User.findOne({ where: { email } });
    if (user) return user.dataValues.role;
  }
}

export default LoginService;
