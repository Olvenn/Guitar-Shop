import { GuitarsIdsWithCount } from '../types/types';

const CART_KEY = 'guitar-shop-cart';

export const getCart = (): GuitarsIdsWithCount => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : {};
};

export const saveCart = (cart: GuitarsIdsWithCount): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const deleteCart = (): void => {
  localStorage.removeItem(CART_KEY);
};


