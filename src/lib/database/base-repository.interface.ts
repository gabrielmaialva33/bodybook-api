export interface IBaseRepository<T> {
  create: (data: T) => Promise<T>;
}
