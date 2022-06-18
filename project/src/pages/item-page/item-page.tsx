import { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { fetchGuitarAction } from '../../store/api-actions';
import { getGuitar, getReviews } from '../../store/reducers/selectors';
import { AppRoute } from '../../const';
import { capitalize, pictureNumber } from '../../utils';
import { Layout } from '../../components/layout/layout';
import { ReviewList } from '../../components/reviews-list/reviews-list';
import { Raiting } from '../../components/rating/rating';
import { NotFoundPage } from '../../components/not-found-page/not-found-page';


export function ItemPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const reviews = useAppSelector(getReviews);
  const { id } = useParams<{ id: string }>();
  const guitar = useAppSelector(getGuitar);
  const showCharacteristics = location.hash === '#characteristics';
  const showDescription = location.hash === '#description';

  useEffect(() => {
    if (id) {
      dispatch(fetchGuitarAction(+id));
    }
  }, [id, dispatch]);

  if (guitar === undefined) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{guitar?.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Root}>Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">{guitar?.name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={`../img/content/catalog-product-${pictureNumber(guitar.previewImg)}.jpg`} srcSet={`../img/content/catalog-product-${pictureNumber(guitar.previewImg)}@2x.jpg 2x`} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{guitar?.name}</h2>
              <div className="rate product-container__rating">
                <Raiting ratingCount={Math.floor(guitar.rating)} />
                <p className="visually-hidden">Оценка: Хорошо</p>
                <p style={{ fontSize: '12px', lineHeight: '25px', color: '#585757' }} >{reviews?.length}</p>
              </div>
              <div className="tabs">
                <a className={`button  ${(showDescription) ? 'button--black-border' : ''} button--medium tabs__button`} href="#characteristics">Характеристики</a>
                <a className={`button  ${(!showDescription) ? 'button--black-border' : ''} button--medium tabs__button`} href="#description">Описание</a>
                <div className="tabs__content">
                  {(showCharacteristics || (!showCharacteristics && !showDescription)) &&
                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{guitar.vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{capitalize(guitar.type)}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{guitar.stringCount} струнная</td>
                        </tr>
                      </tbody>
                    </table>}
                  {showDescription &&
                    <p className="tabs__product-description">{guitar.description}</p>}
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{guitar.price} ₽</p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <ReviewList />
        </div>
      </main>
    </Layout >
  );
}
