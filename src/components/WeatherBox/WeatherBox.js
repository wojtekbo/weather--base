import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import ErrorBox from '../ErrorBox/ErrorBox';
import Loader from '../Loader/Loader';
import React, {useState, useCallback} from 'react';

const WeatherBox = (props) => {
  const [weatherData, setweatherData] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const handleCityChange = useCallback((city) => {
    setLoader(true);
    setError(false);
    setweatherData('');
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=40a0bee4274a67245ac7a95822a2e821&units=metric`).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          setweatherData({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          });
          setLoader(false);
        });
      } else {
        setLoader(false);
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weatherData && <WeatherSummary {...weatherData} />}
      {loader && <Loader />}
      {error && <ErrorBox>Thers is no such city!</ErrorBox>}
    </section>
  );
};

export default WeatherBox;
