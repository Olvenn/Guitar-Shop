import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { selectCartGuitars, selectCartGuitarsIds } from '../../store/reducers/selectors';
import { CartItem } from '../cart-item/cart-item';
import { fetchCartGuitarsAction } from '../../store/reducers/cart';

export function CartList(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(selectCartGuitars);
  const guitarsIdsWithCount = useAppSelector(selectCartGuitarsIds);


  useEffect(() => {
    const guitarsIdsKeys = Object.keys(guitarsIdsWithCount);
    if (guitarsIdsKeys.length > 0) {
      dispatch(fetchCartGuitarsAction(guitarsIdsKeys));
    }
  }, [dispatch, guitarsIdsWithCount]);

  return (
    <div className="cart" data-testid='cart'>
      {guitars?.map((guitar) => (
        <CartItem
          key={guitar.id}
          guitar={guitar}
          count={guitarsIdsWithCount[guitar.id]}
        />
      ))}
    </div>
  );
}
