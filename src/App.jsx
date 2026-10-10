import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info is-light', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success is-light', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning is-light', {
            'is-light': sortField !== 'reverse',
          })}
          onClick={() => setSortField()}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button is-danger is-light', {
            'is-light': sortField !== '',
          })}
          onClick={() => setSortField('')}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
