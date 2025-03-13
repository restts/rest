import { Container } from '../container';

export const Injectable = (): ClassDecorator => 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  (target: Function) => {
    Container.register(target.name, target);
  }
;
