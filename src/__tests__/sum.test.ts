import {sum} from '../sum';

describe('sum', () => {
  it('should be equal to 8', () => {
    expect(sum(1, 2, 3, 2)).toBe(8);
  })
});