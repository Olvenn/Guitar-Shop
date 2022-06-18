import { useAppSelector } from '../../hooks/';
import { getGuitars } from '../../store/reducers/selectors';
import { CartItem } from '../cart-item/cart-item';

export function CartList(): JSX.Element {
  const guitars = useAppSelector(getGuitars).slice(6, 9);

  return (
    <div className="cart">
      {guitars.map((guitar) => (
        <CartItem
          key={guitar.id}
          guitar={guitar}
        />
      ))}
    </div>
  );
}
