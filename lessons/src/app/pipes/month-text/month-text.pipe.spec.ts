import { MonthTextPipe } from './month-text.pipe';

describe('CurrencyTextPipe', () => {
  it('create an instance', () => {
    const pipe = new MonthTextPipe();
    expect(pipe).toBeTruthy();
  });
});
