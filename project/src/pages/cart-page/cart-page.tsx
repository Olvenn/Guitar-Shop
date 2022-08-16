import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/';
import { Layout } from '../../components/layout/layout';
import { AppRoute } from '../../const';
import { CartList } from '../../components/cart-list/cart-list';
import { PromoCode } from '../../components/promo-сode/promo-code';
import { selectCartGuitars, selectCartGuitarsIds, selectDiscount } from '../../store/reducers/selectors';

export function CartPage(): JSX.Element {
  const guitarsPrice = useAppSelector(selectCartGuitars)?.map((guitar) => guitar.price);
  const guitarsIdsWithCount = Object.values(useAppSelector(selectCartGuitarsIds));
  const discount = useAppSelector(selectDiscount);
  const [total, setTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (guitarsPrice) {
      let tempTotal = 0;
      for (let i = 0; i < guitarsPrice?.length; i++) {
        tempTotal += guitarsPrice[i] * guitarsIdsWithCount[i];
      }
      setTotal(tempTotal);
    }
  }, [guitarsPrice, guitarsIdsWithCount, discount]);

  useEffect(() => {
    if (discount && discount > 0) {
      setDiscountAmount(total / 100 * discount);
    }
  }, [discount, discountAmount, total]);

  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Catalog}>Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to='#'>Корзина</Link>
            </li>
          </ul>
          <CartList />
          <div className="cart">
            <div className="cart__footer">
              <PromoCode />
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{total} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span
                    className={`${discountAmount === 0 ? 'cart__total-value' : 'cart__total-value cart__total-value--bonus'}`}
                  >
                    {discountAmount !== 0 && '-'}
                    {discountAmount} ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">{total - discountAmount} ₽</span>
                </p>
                <button
                  className="button button--red button--big cart__order-button"
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
