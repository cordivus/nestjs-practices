import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**--------Creating an Entity----------
 *
 * Create an entity file, and create a class in it that
 *  lists all the properties that your entity will have
 *
 * Connect the entity to its parent module. this creates a repository
 *
 * Connect the entity to the root connection (in app module)
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
