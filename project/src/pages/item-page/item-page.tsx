import { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { fetchGuitarAction } from '../../store/reducers/guitar';
import { getGuitar, getGuitarError, getGuitarLoading } from '../../store/reducers/selectors';
import { AppRoute } from '../../const';
import { capitalize, pictureNumber } from '../../utils';
import { Layout } from '../../components/layout/layout';
import { ReviewList } from '../../components/reviews-list/reviews-list';
import { rating } from '../../utils';

export function ItemPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(getGuitar);
  const error = useAppSelector(getGuitarError);
  const loading = useAppSelector(getGuitarLoading);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const showCharacteristics = location.hash === '#characteristics';
  const showDescription = location.hash === '#description';

  useEffect(() => {
    if (id) {
      dispatch(fetchGuitarAction(+id));
    }
  }, [id, dispatch]);

  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          {loading && (
            <h2 className="page-content__title title title--bigger">Идет загрузка...
            </h2>
          )}
          {!guitar && error && (
            <>
              <h2 style={{ color: '#8b0000' }} className="page-content__title title title--bigger">{error}</h2>
              <br />
              <h3 className="page-content__title title title--bigger">
                Что-то пошло не так. <br /> Попробуйте еще раз, или выберите другую гитару из каталога.
              </h3>
              <br />
              <a style={{ width: '400px' }} className="form__submit button" href="/">Вернуться в каталог</a>
            </>
          )}
          {guitar && (
            <>
              <h1 className="page-content__title title title--bigger">{guitar?.name}</h1>
              <ul className="breadcrumbs page-content__breadcrumbs">
                <li className="breadcrumbs__item">
                  <Link className="link" to={AppRoute.Root}>Главная</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="link" to='#'>{guitar?.name}</Link>
                </li>
              </ul>
              <div className="product-container">
                <img className="product-container__img" src={`../img/content/catalog-product-${pictureNumber(guitar.previewImg)}.jpg`} srcSet={`../img/content/catalog-product-${pictureNumber(guitar.previewImg)}@2x.jpg 2x`} width="90" height="235" alt="" />
                <div className="product-container__info-wrapper">
                  <h2 className="product-container__title title title--big title--uppercase">{guitar?.name}</h2>
                  <div className="rate product-container__rating">
                    {rating.map((item) => (
                      <svg key={item} width="14" height="14" aria-hidden="true">
                        {Math.floor(guitar.rating) > item ? <use xlinkHref="#icon-full-star" /> : <use xlinkHref="#icon-star" />}
                      </svg>
                    ))}
                    <p className="visually-hidden">Оценка: Хорошо</p>
                    <p style={{ fontSize: '12px', lineHeight: '25px', color: '#585757' }} >{guitar?.comments?.length}</p>
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
                  <Link className="button button--red button--big product-container__button" to="#">Добавить в корзину
                  </Link>
                </div>
              </div>
              <ReviewList guitar={guitar} />
            </>
          )}
        </div>
      </main>
    </Layout >
  );
}
