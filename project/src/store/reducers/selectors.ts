import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Guitar, Filter } from '../../types/types';
import { Sort } from '../reducers/guitars';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Guitars].guitars;
export const getGuitar = (state: State): Guitar | undefined => state[NameSpace.Guitar].guitar;
export const getIsLoadingGuitars = (state: State): boolean => state[NameSpace.Guitars].isLoading;
export const getGuitarError = (state: State): string | undefined => state[NameSpace.Guitar].error;
export const getGuitarLoading = (state: State): boolean => state[NameSpace.Guitar].loading;
export const getTotalCounts = (state: State): number => state[NameSpace.Guitars].totalCounts;
export const selectPage = (state: State): number => state[NameSpace.Guitars].page;
export const getIsSuccessfullyComment = (state: State): boolean => state[NameSpace.Reviews].isSuccessfully;
export const getSearchGuitars = (state: State): Guitar[] | undefined => state[NameSpace.Guitars].searchGuitars;
export const getFilters = (state: State): Filter | undefined => state[NameSpace.Guitars].filters;
export const selectSort = (state: State): Sort | undefined => state[NameSpace.Guitars].sort;
export const selectMinPrice = (state: State): number => state[NameSpace.Guitars].minPriceDefault;
export const selectMaxPrice = (state: State): number => state[NameSpace.Guitars].maxPriceDefault;
