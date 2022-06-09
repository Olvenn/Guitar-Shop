import { Layout } from '../../components/layout/layout';
import { ReviewList } from '../../components/reviews-list/reviews-list';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getGuitar } from '../../store/reducers/selectors';
import { useParams, useLocation } from 'react-router-dom';
import { fetchGuitarAction } from '../../store/api-actions';
import { capitalize, pictureNumber } from '../../utils';
import { useEffect } from 'react';

export function ItemPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const item = useAppSelector(getGuitar);
  const location = useLocation();
  const showCharacteristics = location.hash === '#characteristics';
  const showDescription = location.hash === '#description';

  useEffect(() => {
    if (id) {
      dispatch(fetchGuitarAction(+id));
    }
  }, [id, dispatch]);

  if (item === undefined) {
    return <div />;
  }

  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{item?.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Каталог</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">{item?.name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={`../img/content/catalog-product-${pictureNumber(item.previewImg)}.jpg`} srcSet={`../img/content/catalog-product-${pictureNumber(item.previewImg)}@2x.jpg 2x`} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{item?.name}</h2>
              <div className="rate product-container__rating">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <div className="tabs">
                <a className={`button  ${(showDescription) ? 'button--black-border' : ''} button--medium tabs__button`} href="#characteristics">Характеристики</a>
                <a className={`button  ${(!showDescription) ? 'button--black-border' : ''} button--medium tabs__button`} href="#description">Описание</a>
                <div className="tabs__content">
                  {showCharacteristics &&
                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{item.vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{capitalize(item.type)}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{item.stringCount} струнная</td>
                        </tr>
                      </tbody>
                    </table>}
                  {showDescription &&
                    <p className="tabs__product-description">{item.description}</p>}
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{item.price} ₽</p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <ReviewList />
        </div>
      </main>
    </Layout >
  );
}
