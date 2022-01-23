import { CanActivate, ExecutionContext } from '@nestjs/common';

/**Authorization
 * Para el manejo de la sesion utilizaremos cookies con encriptacion, paquetes(cookie-session y @types/cookie-session)
 *
 * 1) La sesion funciona globalmente asi que lo incluimos directamente en el archivo main.ts, por cierta
 * incompatibilidad con la configuracion de typescript, trabajamos directamente con require() para importar
 * la libreria cookie-session y agregamos un objeto con una key de argumento en app.use(). Esta key es el
 * secret para decodificar la cookie.
 *
 * 2) Se importa Session en el controller y el decorador @Session se agrega como argumento para ser decodificado y poder
 * tomar el payload en ese handler. (Esto es para el uso de la cookie con la informacion encriptada)
 *
 * 3) Cookie-session encripta y devuelve en el header de la response la informacion que le sea seteada, y
 * solamente devuelve esta informacion cuando se realiza cualquier cambio en el objeto session
 * en este caso se utilizara para guardar el Id de un usuario como una propiedad del objeto session.
 *
 * Entonces el flujo es ingresa la request con la cookie ---> se decodifica la cookie y el payload pasa
 * al objeto session --> En AuthGuard se devuelve la propiedad userId (si esta existe devuelve un valor que
 * se toma como true, si no existe userId devuelve undefined o null en caso de haber asignado null a userId
 * en signOut, quiere decir que la cookie es incorrecta y no permite continuar)
 *
 * 4) En este ejemplo para mantener un codigo limpi se crea un decorado llamado @CurrentUser que toma el id
 * del usuario del payload de cookie-session y retorna los datos del usuario. Un decorador no puede tener una
 * injecccion de dependencia, por tal motivo se usa un interceptor, de esta forma se consulta el usuario y
 * incluye en el decorador.
 *    - Creamos una carpeta interceptors dentro de users y un archivo current-user ya que es lo que queremos chequear
 *      en el interceptor creado, tomamos el id de la sesion, buscamos los datos del usuario con ese id
 *      y los agregamos nuevamente en la request para que puedan ser recibidos por el decorador @CurrentUser
 *
 *    - Creamos una carpeta decorators y un archivo (custom.decorator.ts)
 *    - Importamos createParamDecorator y ExecutionContex desde common(ya que el decorador es para un parametro
 *      y requiere los datos de la request)
 *
 *    - Recibimos currentUser desde el objeto request, y lo retornamos
 *
 *    - En el controller, agregamos el interceptor debajo del controller y el decorador @CurrentUser como parametro en el handler que necesitemos y lo
 *      que este decorador retorna es una instancia del usuario especifico asi que declaramos un parametro nuevo
 *      de tipo User.
 *
 * OBSERVACION: en caso de no usar el decorador, como estamos agregando la informacion al objeto request,
 * si usamos el decorador @Request tambien podemos tener acceso al objeto request y manejarnos con eso nada mas
 */

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // ExecutionContext seria una instancia de la request como viene
    const request = context.switchToHttp().getRequest(); // se toma el objeto formado de la request

    return request.session.userId; // y se devuelve lo que se encuentra en session para verficar que fue decodificado correctamente
  }
}
