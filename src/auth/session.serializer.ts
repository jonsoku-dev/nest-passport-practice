import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  // local.strategy.ts 의 validate 에서 넘겨받은 user
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    console.log('serialize');
    // request.session 에 passport: { user: { id: 1 } } 로 저장
    done(null, { id: user.id });
  }

  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    console.log('deserialize');
    done(null, payload);
  }
}
