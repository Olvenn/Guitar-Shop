import { guitars, loadGuitars, setTotalCounts, loadSearchData, loadFilters, setSort, setPage } from '../reducers/guitars';
import { makeFakeGuitars } from '../../mock';
import { datatype } from 'faker';

const MAX_GUITARS = 25;
const DEFAULT_PAGE = 1;
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

  it('should update guitars by load loadSearchData', () => {
    const guitarsFake = makeFakeGuitars(1);
    const searchGuitarsFake = makeFakeGuitars(1);

    const state = {
      guitars: guitarsFake,
      minPriceDefault: 0,
      maxPriceDefault: 0,
      totalCounts: guitarsFake.length,
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
    expect(guitars.reducer(state, loadSearchData(searchGuitarsFake)))
      .toEqual({
        guitars: guitarsFake,
        isLoading: true,
        minPriceDefault: 0,
        maxPriceDefault: 0,
        totalCounts: guitarsFake.length,
        searchGuitars: searchGuitarsFake,
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

  it('should update guitars by load loadFilters', () => {
    const fakeFilter = { minPrice: 1000, maxPrice: 10000, type: '&type=acoustic', stringsCount: '&stringCount=6' };

    const state = {
      guitars: fakeGuitars,
      minPriceDefault: 0,
      maxPriceDefault: 0,
      totalCounts: fakeGuitars.length,
      isLoading: true,
      searchGuitars: [],
      page: DEFAULT_PAGE,
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
    expect(guitars.reducer(state, loadFilters(fakeFilter)))
      .toEqual({
        guitars: fakeGuitars,
        isLoading: true,
        minPriceDefault: 0,
        maxPriceDefault: 0,
        totalCounts: fakeGuitars.length,
        searchGuitars: [],
        page: DEFAULT_PAGE,
        filters: {
          minPrice: 1000,
          maxPrice: 10000,
          type: '&type=acoustic',
          stringsCount: '&stringCount=6',
        },
        sort: {
          sortType: 'default',
          sortOrder: 'asc',
        },
      });
  });

  it('should update guitars by load setSort', () => {
    const fakeSort = { sortType: 'price', sortOrder: 'desc' };

    const state = {
      guitars: fakeGuitars,
      minPriceDefault: 0,
      maxPriceDefault: 0,
      totalCounts: fakeGuitars.length,
      isLoading: true,
      searchGuitars: [],
      page: DEFAULT_PAGE,
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
    expect(guitars.reducer(state, setSort(fakeSort)))
      .toEqual({
        guitars: fakeGuitars,
        isLoading: true,
        minPriceDefault: 0,
        maxPriceDefault: 0,
        totalCounts: fakeGuitars.length,
        searchGuitars: [],
        page: DEFAULT_PAGE,
        filters: {
          minPrice: undefined,
          maxPrice: undefined,
          type: '',
          stringsCount: '',
        },
        sort: {
          sortType: 'price',
          sortOrder: 'desc',
        },
      });
  });

  it('should update guitars by load setPage', () => {
    const page = 2;

    const state = {
      guitars: fakeGuitars,
      minPriceDefault: 0,
      maxPriceDefault: 0,
      totalCounts: fakeGuitars.length,
      isLoading: true,
      searchGuitars: [],
      page: DEFAULT_PAGE,
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
    expect(guitars.reducer(state, setPage(page)))
      .toEqual({
        guitars: fakeGuitars,
        isLoading: true,
        minPriceDefault: 0,
        maxPriceDefault: 0,
        totalCounts: fakeGuitars.length,
        searchGuitars: [],
        page: page,
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
