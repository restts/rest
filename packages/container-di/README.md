# Container DI

A lightweight dependency injection container for TypeScript with decorator support.

## Installation

```bash
npm install @restts/container-di
```

## Features
- Singleton pattern by default
- Decorator-based dependency injection
- Metadata reflection support
- TypeScript support

## Basic Usage

```typescript
import { Container, Injectable, Inject } from '@restts/container-di';

// Define your service
@Injectable()
class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

// Use dependency injection
@Injectable()
class UserService {
  constructor(@Inject('LoggerService') private logger: LoggerService) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
  }
}

// Resolve and use the service
const userService = Container.resolve<UserService>('UserService');
userService.createUser('John Doe');
```

## API Reference

### Container

Static class that manages dependencies and their lifecycle.

```typescript
class Container {
  // Register a dependency
  static register(name: string, dependency: Function): void

  // Resolve a dependency
  static resolve<T>(name: unknown): T

  // Clean all registered dependencies
  static clean(): void
}
```

### Decorators

#### @Injectable()
Registers a class as a dependency in the container.

```typescript
@Injectable()
class MyService {
  // ...
}
```

#### @Inject(serviceName: string)
Injects a dependency into a constructor parameter.

```typescript
class MyService {
  constructor(@Inject('OtherService') private other: OtherService) {}
}
```

## Examples

### Basic Service Registration and Injection

```typescript
@Injectable()
class DatabaseService {
  connect() {
    return 'Connected to DB';
  }
}

@Injectable()
class UserRepository {
  constructor(@Inject('DatabaseService') private db: DatabaseService) {}

  getUsers() {
    this.db.connect();
    return ['user1', 'user2'];
  }
}
```

### Cleaning Container

```typescript
// Remove all registered dependencies
Container.clean();
```

## Development

```bash
# Install dependencies
npm install

# Run lint
nx lint container-di

# Run tests
nx test container-di

# Build
nx build container-di
```

## Important Notes

1. All dependencies are singletons by default
2. Dependencies are lazily instantiated
3. Circular dependencies are not supported
4. Make sure to enable the following TypeScript options:
   ```json
   {
     "compilerOptions": {
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true
     }
   }
   ```

## Contributing

Contributions are welcome! Please feel free to submit PRs.

## License

MIT

---

This project was generated using [Nx](https://nx.dev).
