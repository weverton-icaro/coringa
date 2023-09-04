import { IUserRepository } from 'src/modules/users/interfaces/IUserRepository';
import { UserRepository } from 'src/modules/users/repositories/userRespository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
