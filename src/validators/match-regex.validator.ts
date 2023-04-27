import { registerDecorator, ValidationOptions } from 'class-validator';

export function MatchRegex(
  regex: RegExp,
  validationOptions?: ValidationOptions,
) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return regex.test(value);
        },
      },
    });
  };
}
