import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { filterContact } from 'redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(filterContact(event.target.value));
  };

  return (
    <div className={css.box}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          name="filter"
          onChange={handleFilterChange}
          placeholder="Search contact"
        />
      </label>
    </div>
  );
};

export default Filter;
