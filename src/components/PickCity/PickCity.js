import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './PickCity.module.scss';

import {useState} from 'react';

const PickCity = (props) => {
  const [city, setCity] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    props.action(city);
    setCity('');
  };

  return (
    <form className={styles.pickCityForm} onSubmit={submitHandler}>
      <label>
        <TextInput placeholder="Enter city name...." value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <Button>Search</Button>
    </form>
  );
};

export default PickCity;
