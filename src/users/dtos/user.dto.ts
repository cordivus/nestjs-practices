import { Expose } from 'class-transformer';

//Este DTO sera interceptado en donde se chequearan sus decoradores y sera devuelto como response
export class UserDto {
  @Expose()
  id: number;

  @Expose() // Expose indica que esta propiedad puede ser devuelta en la respuesta
  email: string;
}
