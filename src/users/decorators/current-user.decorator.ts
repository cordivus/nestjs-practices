import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**Primero se ejectuta el interceptor que agregar currentUser a la request, luego este decorador lo toma
 * y lo devuelve para ser usado como parametro en cualquier handler
 */

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //data se refiere al argumento del decorador, como no lleva se coloca de tipo never
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
