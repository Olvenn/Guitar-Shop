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
          </div>
        </div>
      </main>
    </Layout>
  );
}
