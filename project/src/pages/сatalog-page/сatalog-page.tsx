import { Layout } from '../../components/layout/layout';
import { Sorting } from '../../components/sorting/sorting';
import { Filters } from '../../components/filters/filters';
import { CatalogList } from '../../components/catalog-list/catalog-list';

export function CatalogPage(): JSX.Element {
  return (
    <Layout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <Filters />
            <Sorting />
            <CatalogList />
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active">
                  <a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page">
                  <a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next">
                  <a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
