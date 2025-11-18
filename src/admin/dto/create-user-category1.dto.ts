export class CreateUserCategory1Dto {
  // full name (max 100 chars)
  fullName: string;

  // unsigned integer age
  age: number;

  // optional status; default will be applied by the pipe
  status?: 'active' | 'inactive';
}
