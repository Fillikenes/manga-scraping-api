import { IsString, validateSync } from 'class-validator';
import { MatchRegex } from './match-regex.validator';

const PATTERN_TEST = /(www\.)?test\.(com)/;

class TestMatchRegex {
  @IsString()
  @MatchRegex(PATTERN_TEST)
  value: string;

  constructor(params: any) {
    this.value = params.value;
  }
}

describe('MatchRegex Validator', () => {
  const validValues = ['www.test.com', 'test.com'];
  const invalidValues = ['www.test123.com', 'test=invalid.com'];

  it.each(validValues)(
    'should return true when the value is valid for the pattern regex',
    (value) => {
      const test = new TestMatchRegex({ value });
      const errors = validateSync(test);
      expect(errors.length).toEqual(0);
    },
  );

  it.each(invalidValues)(
    'should return true when the value is invalid for the pattern regex',
    (value) => {
      const test = new TestMatchRegex({ value });
      const errors = validateSync(test);
      expect(errors.length).toBeGreaterThan(0);
    },
  );
});
