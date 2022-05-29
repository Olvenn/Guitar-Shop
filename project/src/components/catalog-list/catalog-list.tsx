import { useAppSelector } from '../../hooks/';
// import CitiesList from '../cities-list/cities-list';
import { getGuitars } from '../../store/reducers/selectors';
import CatalogItem from '../catalog-item/catalog-item';

function CatalogList(): JSX.Element {
  const guitars = useAppSelector(getGuitars);
  console.log('guitars', guitars);

  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => (
        <CatalogItem
          key={guitar.id}
          guitar={guitar}
        />
      ))}
    </div>
  );
}
export default CatalogList;

// <div className="page page--gray page--main">
//   {<PageHeader />}
//   <main className={`${offers ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
//     <h1 className="visually-hidden">Cities</h1>
//     <div className="tabs">
//       <section className="locations container">
//         <ul className="locations__list tabs__list">
//           {(Object.entries(cities)).map(([key, city]) => (
//             <CitiesList
//               key={key}
//               city={city}
//               onClick={handleCityClick}
//               cityActive={town}
//             />
//           ))}
//         </ul>
//       </section>
//     </div>
//     {offers.length ? <Main cityActive={town} /> : <MainEmpty />}
//   </main>
// </div>
