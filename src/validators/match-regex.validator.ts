import { registerDecorator, ValidationOptions } from 'class-validator';

export function MatchRegex(
  regex: RegExp,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return regex.test(value);
        },
      },
    });
  };
}
