import { commerce, database, datatype, internet, image, random, lorem } from 'faker';
import { Guitar, Review, Comment } from '../src/types/types';

export const GUITARS = 25;
const REVIEWS = 10;

const MIN_ID = 1;
const VENDOR_CODE_COUNT = 7;
const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_STRING = 5;
const MAX_STRING = 7;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;

export const makeFakeGuitar = (): Guitar => ({
  id: datatype.number({ min: MIN_ID }),
  name: lorem.word(),
  vendorCode: random.alphaNumeric(VENDOR_CODE_COUNT),
  type: database.type(),
  description: commerce.productDescription(),
  previewImg: image.image(),
  stringCount: datatype.number({ min: MIN_STRING, max: MAX_STRING }),
  rating: datatype.number({ min: MIN_RATING, max: MAX_RATING }),
  price: datatype.number({ min: MIN_PRICE, max: MAX_PRICE }),
  comments: makeFakeReviews(Math.floor(Math.random() * (REVIEWS))),
} as Guitar);

export const makeFakeReview = (): Review => ({
  id: datatype.number({ min: MIN_ID }),
  createAt: datatype.datetime.toString(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentence(300, 50),
  rating: datatype.number({ min: 0, max: MAX_RATING }),
  guitarId: datatype.number({ min: MIN_ID }),
} as Review);

export const makeFakeComment = (): Comment => ({
  guitarId: datatype.number({ min: MIN_ID }),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentence(300, 50),
  rating: datatype.number({ min: 0, max: MAX_RATING }),
} as Comment);

export const makeFakeGuitars = (quantity: number): Guitar[] => (
  new Array(quantity).fill(null).map(makeFakeGuitar) as Guitar[]);

export const makeFakeReviews = (quantity: number): Review[] => (
  new Array(quantity).fill(null).map(makeFakeReview) as Review[]);

export const makeFakeComments = (quantity: number): Comment[] => (
  new Array(quantity).fill(null).map(makeFakeComment) as Comment[]);


