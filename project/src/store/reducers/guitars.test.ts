import { guitars, loadGuitars, setTotalCounts } from '../reducers/guitars';
import { makeFakeGuitars } from '../../mock';
import { datatype } from 'faker';

const MAX_GUITARS = 25;
const MIN_PRICE = 1000;
const MAX_PRICE = 40000;
const GUITARS = datatype.number({ min: 0, max: MAX_GUITARS });

const fakeGuitars = makeFakeGuitars(GUITARS);

describe('Reducer: guitars', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitars.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        guitars: [],
        minPriceAll: 0,
        maxPriceAll: 0,
        totalCounts: 0,
        isLoading: false,
        searchGuitars: [],
        filters: {
          minPrice: MIN_PRICE,
          maxPrice: MAX_PRICE,
          type: '',
          stringsCount: '',
        },
        sort: {
          type: 'Default',
          order: '',
        },
      });
  });

  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      minPriceAll: MIN_PRICE,
      maxPriceAll: MIN_PRICE,
      totalCounts: 0,
      isLoading: false,
      searchGuitars: [],
      filters: {
        minPrice: MIN_PRICE,
        maxPrice: MAX_PRICE,
        type: '',
        stringsCount: '',
      },
      sort: {
        type: 'Default',
        order: '',
      },
    };
    expect(guitars.reducer(state, loadGuitars(fakeGuitars)))
      .toEqual({
        guitars: fakeGuitars,
        minPriceAll: MIN_PRICE,
        maxPriceAll: MIN_PRICE,
        totalCounts: 0,
        isLoading: true,
        searchGuitars: [],
        filters: {
          minPrice: MIN_PRICE,
          maxPrice: MAX_PRICE,
          type: '',
          stringsCount: '',
        },
        sort: {
          type: 'Default',
          order: '',
        },
      });
  });

  it('should update guitars by load totalCounts', () => {
    const guitarsFake = makeFakeGuitars(GUITARS);
    const state = {
      guitars: guitarsFake,
      minPriceAll: 0,
      maxPriceAll: 0,
      totalCounts: 0,
      isLoading: false,
    };
    expect(guitars.reducer(state, setTotalCounts(guitarsFake.length)))
      .toEqual({
        guitars: guitarsFake,
        minPriceAll: 0,
        maxPriceAll: 0,
        totalCounts: guitarsFake.length,
        isLoading: false,
      });
  });
});
