import 'reflect-metadata';
import { Container } from '../src/lib/container';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class TestService {}

class DependentService {
  constructor(public testService: TestService) {}
}

describe('Container', () => {
  beforeEach(() => {
    Container.clean();
  });

  afterAll(() => {
    Container.clean();
  });

  it('should register and resolve a dependency', () => {
    Container.register('TestService', TestService);
    const instance = Container.resolve<TestService>('TestService');

    expect(instance).toBeInstanceOf(TestService);
  });

  it('should throw an error if dependency is not found', () => {
    expect(() => Container.resolve('NonExistentService')).toThrow('Dependency NonExistentService not found.');
  });

  it('should resolve a singleton instance', () => {
    Container.register('TestService', TestService);
    const instance1 = Container.resolve<TestService>('TestService');
    const instance2 = Container.resolve<TestService>('TestService');

    expect(instance1).toBe(instance2);
  });

  it('should resolve dependencies with sub-dependencies', () => {
    Reflect.defineMetadata('inject:dependencies', [{ serviceName: 'TestService', index: 0 }], DependentService);
    Container.register('TestService', TestService);
    Container.register('DependentService', DependentService);
    
    const instance = Container.resolve<DependentService>('DependentService');

    expect(instance).toBeInstanceOf(DependentService);
    expect(instance.testService).toBeInstanceOf(TestService);
  });

  it('should clear all dependencies and singletons', () => {
    Container.register('TestService', TestService);
    Container.resolve<TestService>('TestService');
    Container.clean();
    expect(() => Container.resolve('TestService')).toThrow('Dependency TestService not found.');
  });

  it('handle dependencies that are not instantiable', () => {
    Container.register('TestService', () => ({ testService: TestService }));
    
    const instance = Container.resolve('TestService');

    expect(instance).toBeInstanceOf(Function);
  });
});
