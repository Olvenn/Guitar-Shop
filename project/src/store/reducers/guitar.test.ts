import { guitar, fetchGuitarAction } from '../reducers/guitar';
import { makeFakeGuitar } from '../../mock';

const fakeGuitar = makeFakeGuitar();

describe('Reducer: guitar', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitar.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitar: undefined,
        loading: false,
        error: undefined,
      });
  });
});
