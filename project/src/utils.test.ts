import { pictureNumber, capitalize } from './utils';

describe('get picture number', () => {
  it('function return picture number', () => {
    expect(pictureNumber('img/guitar-8.jpg')).toBe('8');
  });
});

describe('capitalize first letter', () => {
  it('function return capitalized first letter', () => {
    expect(capitalize('guitar')).toBe('Guitar');
  });
});
