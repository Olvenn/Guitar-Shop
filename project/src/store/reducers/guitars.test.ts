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
        minPriceDefault: undefined,
        maxPriceDefault: undefined,
        totalCounts: 0,
        isLoading: false,
        searchGuitars: [],
        page: 1,
        filters: {
          minPrice: undefined,
          maxPrice: undefined,
          type: '',
          stringsCount: '',
        },
        sort: {
          sortType: 'default',
          sortOrder: 'asc',
        },
      });
  });

  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      minPriceDefault: undefined,
      maxPriceDefault: undefined,
      totalCounts: 0,
      isLoading: false,
      searchGuitars: [],
      page: 1,
      filters: {
        minPrice: undefined,
        maxPrice: undefined,
        type: '',
        stringsCount: '',
      },
      sort: {
        sortType: 'default',
        sortOrder: 'asc',
      },
    };
    expect(guitars.reducer(state, loadGuitars(fakeGuitars)))
      .toEqual({
        guitars: fakeGuitars,
        minPriceDefault: undefined,
        maxPriceDefault: undefined,
        totalCounts: 0,
        isLoading: true,
        searchGuitars: [],
        page: 1,
        filters: {
          minPrice: undefined,
          maxPrice: undefined,
          type: '',
          stringsCount: '',
        },
        sort: {
          sortType: 'default',
          sortOrder: 'asc',
        },
      });
  });

  it('should update guitars by load totalCounts', () => {
    const guitarsFake = makeFakeGuitars(GUITARS);
    const state = {
      guitars: guitarsFake,
      minPriceDefault: 0,
      maxPriceDefault: 0,
      totalCounts: 0,
      isLoading: true,
      searchGuitars: [],
      page: 1,
      filters: {
        minPrice: undefined,
        maxPrice: undefined,
        type: '',
        stringsCount: '',
      },
      sort: {
        sortType: 'default',
        sortOrder: 'asc',
      },
    };
    expect(guitars.reducer(state, setTotalCounts(guitarsFake.length)))
      .toEqual({
        guitars: guitarsFake,
        isLoading: true,
        minPriceDefault: 0,
        maxPriceDefault: 0,
        totalCounts: guitarsFake.length,
        searchGuitars: [],
        page: 1,
        filters: {
          minPrice: undefined,
          maxPrice: undefined,
          type: '',
          stringsCount: '',
        },
        sort: {
          sortType: 'default',
          sortOrder: 'asc',
        },
      });
  });
});
