import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { UsersService } from '../users.service';

/**Este interceptor, toma el id del usuario de la request, consulta los datos del usuario con ese id
 * y los inserta en la request para que pueda ser recibido por el decorador @CurrentUser
 */

@Injectable()
export class CurrentuserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user; //agrega los datos del usuario a la propiedad request
    }
    return next.handle();
  }
}
