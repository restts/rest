import 'reflect-metadata';

export function Inject(serviceName: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    const existingDependencies =
        Reflect.getMetadata('inject:dependencies', target, propertyKey) || [];
      
    existingDependencies.push({ index: parameterIndex, serviceName });
    Reflect.defineMetadata('inject:dependencies', existingDependencies, target, propertyKey);
  };
}
