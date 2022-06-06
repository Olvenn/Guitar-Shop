import { Layout } from '../../components/layout/layout';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { getGuitar } from '../../store/reducers/selectors';
import { useParams } from 'react-router-dom';
import { fetchGuitarAction } from '../../store/api-actions';
import { ItemInner } from '../../components/item-inner/item-inner';

export function ItemPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const item = useAppSelector(getGuitar);
  // console.log(item);

  const { id } = useParams<{ id: string }>();

  if (item === undefined) {
    if (!id) {
      return <div />;
    }
    dispatch(fetchGuitarAction(+id));
  }

  if (item === undefined) {
    return <div />;
  }

  return (
    <Layout>
      <main className="page-content">
        <ItemInner item={item} />
      </main>
    </Layout>
  );
}
