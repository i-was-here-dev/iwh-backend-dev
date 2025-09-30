export interface UseCase<TUseCasePort, TUseCaseResponse> {
  execute(payload: TUseCasePort): Promise<TUseCaseResponse>;
}
