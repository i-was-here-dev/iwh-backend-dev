import { User } from 'src/users/entities/user.entity';

export interface LocalAuthGuardResponse {
  user: User;
}
