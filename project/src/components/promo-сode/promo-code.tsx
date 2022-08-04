import { useState, ChangeEvent, FormEvent } from 'react';
import { fetchCouponAction } from '../../store/reducers/coupon';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { selectDiscount, selectDiscountError } from '../../store/reducers/selectors';

const REG_EXP = /light-333|medium-444|height-555/gi;

export function PromoCode(): JSX.Element {
  const dispatch = useAppDispatch();
  const discount = useAppSelector(selectDiscount);
  const discountError = useAppSelector(selectDiscountError);

  const [coupon, setCoupon] = useState('');
  const [isValid, setIsValid] = useState(false);

  // // eslint-disable-next-line no-console
  // console.log(isValid);
  // // eslint-disable-next-line no-console
  // console.log(discount);
  // // eslint-disable-next-line no-console
  // console.log(coupon);
  // // eslint-disable-next-line no-console
  // console.log(discountLoading);
  // // eslint-disable-next-line no-console
  // console.log(discountError);

  const handleCouponChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();
    setCoupon(value);
    setIsValid(REG_EXP.test(value));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isValid) {
      dispatch(fetchCouponAction(coupon));
    }
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form onSubmit={handleSubmit} className="coupon__form" id="coupon-form" method="post" action="/">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            value={coupon}
            onChange={handleCouponChange}
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
          />
          {((!isValid && coupon !== '') || discountError) &&
            <p className="form-input__message form-input__message--error">неверный промокод
            </p>}
          {discount &&
            <p className="form-input__message form-input__message--success">Промокод принят</p>}
        </div>
        <button className="button button--big coupon__button">Применить</button>
      </form>
    </div>
  );
}
