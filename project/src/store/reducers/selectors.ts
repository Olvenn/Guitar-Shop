import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Guitar } from '../../types/types';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.Guitars].guitars;
export const getGuitar = (state: State): Guitar | undefined => state[NameSpace.Guitar].guitar;
export const getGuitarError = (state: State): string | undefined => state[NameSpace.Guitar].error;
export const getGuitarLoading = (state: State): boolean => state[NameSpace.Guitar].loading;
export const getTotalCounts = (state: State): number => state[NameSpace.Guitars].totalCounts;
