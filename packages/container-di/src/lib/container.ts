import 'reflect-metadata';

export class Container {
  private static readonly dependencies = new Map();
  private static readonly singletons = new Map();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  public static register(name: string, dependency: Function) {
    this.dependencies.set(name, { dependency });
  }
  
  public static resolve<K>(name: unknown): K {
    const entry = this.dependencies.get(name);
  
    if (!entry) {
      throw new Error(`Dependency ${ name } not found.`);
    }
  
    if (this.singletons.has(name)) {
      return this.singletons.get(name);
    }
  
    const { dependency } = entry;

    const subDependencies = Reflect.getMetadata('inject:dependencies', dependency) ?? [];

    const args = [];

    for (let i = 0; i < subDependencies.length; i++) {
      const { serviceName, index } = subDependencies[i];
      const service = this.resolve(serviceName);
      args.splice(index, 0, service);
    }
  
    const instance =
        typeof dependency === 'function' && dependency.prototype
          ? new dependency(...args)
          : dependency;
  
    this.singletons.set(name, instance);
  
    return instance;
  }

  public static clean(): void {
    this.dependencies.clear();
    this.singletons.clear();
  }
}
