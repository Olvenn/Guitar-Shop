import { guitars, loadGuitars, setTotalCounts } from '../reducers/guitars';
import { makeFakeGuitars } from '../../mock';
import { datatype } from 'faker';

const MAX_GUITARS = 25;
const GUITARS = datatype.number({ min: 0, max: MAX_GUITARS });

const fakeGuitars = makeFakeGuitars(GUITARS);

describe('Reducer: guitars', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitars.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitars: [],
        totalCounts: 0,
        loadSearchData: [],
      });
  });

  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      totalCounts: 0,
      loadSearchData: [],
    };
    expect(guitars.reducer(state, loadGuitars(fakeGuitars)))
      .toEqual({
        guitars: fakeGuitars,
        totalCounts: 0,
      });
  });

  it('should update guitars by load totalCounts', () => {
    const guitarsFake = makeFakeGuitars(GUITARS);
    const state = {
      guitars: guitarsFake,
      totalCounts: 0,
    };
    expect(guitars.reducer(state, setTotalCounts(guitarsFake.length)))
      .toEqual({
        guitars: guitarsFake,
        totalCounts: guitarsFake.length,
      });
  });
});
