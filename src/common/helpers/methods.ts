import { SetMetadata } from '@nestjs/common';

export const Role = (roles: string[]) => SetMetadata('roles', roles);

export class RandomGenerator {
  static generate() {
    // Poor man version of a random generator
    // duplicates keys can creeep in
    // REFACTOR NEEDED
    return Math.floor(Math.random() * 999999);
  }
}

