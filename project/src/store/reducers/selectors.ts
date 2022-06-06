import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Guitar, Review } from '../../types/types';

export const getReviews = (state: State): Review[] => state[NameSpace.Guitars].reviews;
export const getGuitars = (state: State): Guitar[] => state[NameSpace.Guitars].guitars;
export const getGuitarId = (state: State): number | undefined => state[NameSpace.Guitars].guitarId;
export const getGuitar = (state: State): Guitar | undefined => state[NameSpace.Guitars].guitar;
export const getTotalCounts = (state: State): number => state[NameSpace.Guitars].totalCounts;
export const getCurrentPage = (state: State): number => state[NameSpace.Guitars].currentPage;
