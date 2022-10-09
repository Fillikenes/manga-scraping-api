import { sleep } from './utils';

describe('Utils', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('#sleep - should execute a promise to wait X sec', () => {
    const params = 1;
    const handlerMock = jest.fn();
    sleep(params).then(() => {
      handlerMock();
      expect(handlerMock).toHaveBeenCalled();
    });
  });
});
