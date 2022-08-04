import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/';
import { selectAddGuitarToCart } from '../../store/reducers/selectors';
import { CartItem } from '../cart-item/cart-item';

export function CartList(): JSX.Element {
  const guitars = useAppSelector(selectAddGuitarToCart);
  const [guitarsList, setGuitarsList] = useState(guitars);

  useEffect(() => {
    setGuitarsList(guitars);
  }, [guitars]);

  return (
    <div className="cart">
      {guitarsList?.map((guitar) => (
        <CartItem
          key={guitar.guitar.id}
          guitarItem={guitar}
        />
      ))}
    </div>
  );
}
