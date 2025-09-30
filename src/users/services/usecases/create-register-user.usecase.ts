import { UseCase } from 'src/common/usecase.common';

export type createRegisterUserPort = {
  email: string;
  username: string;
  password: string;
};

export interface createRegisterUserUseCase
  extends UseCase<createRegisterUserPort, void> {}
