import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_JONSOKU', // protect this, move to env var
    });
  }

  /**
   * auth.service.ts
   *
   * async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
   */
  async validate(payload: any) {
    // DB가 있다면 아래와같은...
    // const user = await this.usersService.getById(payload.usb)
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return done(null, user);
    console.log(payload, 'jwt strategy validate');
    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
