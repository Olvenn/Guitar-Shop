import { useAppSelector } from '../../hooks/';
// import CitiesList from '../cities-list/cities-list';
import { getGuitars } from '../../store/reducers/selectors';
import CartItem from '../cart-item/cart-item';

function CartList(): JSX.Element {
  const guitars = useAppSelector(getGuitars).slice(6, 9);
  // eslint-disable-next-line no-console
  console.log('guitars', guitars);

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
export default CartList;
