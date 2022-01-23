import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';
/** En este ejemplo de autorizacion utilizamos auth service para signup y signin
 *
 * Para signin, se recibe el mail y la contraseña del usuario, la contraseña luego es hasheada con un salt
 * se recupera el valor de password que se encuentra en la base de datos y se compara con la haseada ingresada
 * por el usuario, si coinciden es correcta.
 */
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //See if email is in use(in that case return error)
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('email is use');

    //Hash + salt the user password(because it cannot enter the db as a raw data for security)
    //Generate the salt
    const salt = randomBytes(8).toString('hex');

    //Hash the salt and password
    //as Buffer ayuda a typescript a identificar lo que devuelve la promesa
    // el tercer argumento indica cuantos caracteres seran devueltos
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hash and password together separate by a dot
    const result = salt + '.' + hash.toString('hex');

    //Create a new user and save it
    const user = await this.usersService.create(email, result);

    //return the user
    return user;
  }

  async signin(email: string, password: string) {
    //buscamos el usuario por su email
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');

    // separamos el salt y hash del password del usuario
    const [salt, storedHash] = user.password.split('.');

    //hasheamos la contraseña que viene de la request
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //comparamos la constraseña que viene de la request con la del usuario registrado
    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('bad credentials');

    return user;
  }
}
