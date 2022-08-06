import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { selectCartGuitars, selectCartGuitarsIds } from '../../store/reducers/selectors';
import { CartItem } from '../cart-item/cart-item';
import { fetchCartGuitarsAction } from '../../store/reducers/cart';

export function CartList(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(selectCartGuitars);
  const guitarsIds = useAppSelector(selectCartGuitarsIds);

  useEffect(() => {
    if (guitarsIds !== {}) {
      dispatch(fetchCartGuitarsAction(Object.keys(guitarsIds)));
    }
  }, [dispatch, guitarsIds]);

  return (
    <div className="cart">
      {guitars?.map((guitar) => (
        <CartItem
          key={guitar.id}
          guitar={guitar}
          count={guitarsIds[guitar.id]}
        />
      ))}
    </div>
  );
}
