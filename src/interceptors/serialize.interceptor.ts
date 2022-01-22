import {
  NestInterceptor,
  UseInterceptors,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer'; // transforma un objeto o clase, a una instancia de clase indicada

/**La siguiente clase puede interceptar la request antes de ser enviada
 * al handler, y tambien interceptar la response antes de ser enviada al cliente,
 * para asi realizar cualquier operacion necesaria trabajando con los DTOs
 * en este caso, similar a un middleware
 *
 * El archivo se llama serialize porque va a tomar un objeto y eventualmente serializarlo en un JSON
 */

/**PASOS
 * 1) Creamos una clase interceptor (class CustomInterceptor)
 *
 * 2) En el controller o handler agregamos el decorador UseInterceptor con la clase
 * CustomInterceptor como argumento. Tambien puede ser global
 *
 * 3) Creamos un DTO con una serie de reglas a cumplir para manejar dicha request o response
 * en el caso de este ejemplo se utilizo el decorador @Expose en UserDto.
 *
 * 4) Agregamos el Custom Dto a nuestra clase CustomInterceptor para que pueda ser usado.
 */

//esta interface nos permite indicar por lo menos que el tipo sea una clase
interface ClassConstructor {
  new (...args: any[]); // indicacion de cualquier clase
}

//esta funcion nos permite acortar el decorador, en vez de todo lo que retorna, se llamara Serialize
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto)); // notese que UseInterceptors es el decorador anterior
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //Run something before a request is handled by the request CallHandler
    return next.handle().pipe(
      map((data: any) => {
        //Run something before the response is sent out
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // esto es para que se cumplan las reglas del DTo
        });
      }),
    );
  }
}
