import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    console.log('Jwt auth guard canActivate before');
    const result = (await super.canActivate(context)) as boolean; // <-- local strategy 실행 트리거
    console.log('Jwt auth guard canActivate after');
    const request = context.switchToHttp().getRequest();
    console.log(request.session, 'Jwt auth guard before');
    console.log(request.isAuthenticated(), 'Jwt auth guard before');
    await super.logIn(request); // serializer 실행 트리거
    console.log(request.session, 'Jwt auth guard after');
    console.log(request.isAuthenticated(), 'Jwt auth guard after');
    return result;
  }
}
