import React, {useState, useRef, useEffect} from "react";
import {
    Container,
    Box,
    Paper,
    AppBar,
    Typography,
    Tabs,
    Tab,
    TextField,
    Button,
} from "@mui/material";
import {Map, YMaps, Placemark} from 'react-yandex-maps';
import Weather from "../weather/weather";

function App() {

    const inputRef = useRef(null);
    const [city, setCity] = useState('');
    const [weatherCity, setWeatherCity] = useState({});
    const [tab, setTab] = useState(1);
    const initialWeatherState = {coord: {lon: 37.59, lat: 55.75}};
    const [weatherData, setWeatherData] = useState(initialWeatherState);

    useEffect(() => {
        async function getData() {
            await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=097538d4a84ca8a0c65e114e765652a2`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data.length > 0) {
                        setWeatherCity(data[0]);
                    } else {
                        setWeatherCity({});
                    }
                }).catch(e => {
                    setWeatherCity({});
                });
        }

        getData();
    }, [city]);

    useEffect(() => {
        async function getData() {
            if (weatherCity && 'lat' in weatherCity) {
                await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherCity.lat}&lon=${weatherCity.lon}&appid=097538d4a84ca8a0c65e114e765652a2`)
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then(data => {
                        setWeatherData(data);
                    }).catch(e => {
                        setWeatherData(initialWeatherState);
                    });
            }
        }

        getData();
    }, [weatherCity]);

    const handleButtonClick = () => {
        setCity(inputRef.current.value);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setCity(inputRef.current.value);
        }
    }

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Container maxWidth='lg'>
            <AppBar position='fixed'>
                <Box padding={1}>
                    <Typography variant='h1' textAlign='center'>Weather Forecasting</Typography>
                </Box>
            </AppBar>
            <Box marginTop={16}>
                <Paper>
                    <Box display='grid' gridTemplateColumns='80% 20%' alignItems='center' padding={2}>
                        <Box>
                            <TextField inputRef={inputRef} label='Enter city' fullWidth onKeyPress={handleEnter}/>
                        </Box>
                        <Box textAlign='center'>
                            <Button size='large' variant='contained' onClick={handleButtonClick}>Search</Button>
                        </Box>
                    </Box>
                    <Box padding={3}>
                        <YMaps>
                            <Map state={{
                                center: weatherCity && 'lat' in weatherData ? [weatherCity.lat, weatherCity.lon] : [initialWeatherState.coord.lat, initialWeatherState.coord.lon],
                                zoom: 12,
                                controls: ['zoomControl'],
                            }} modules={['control.ZoomControl']} height={300} width='100%'>
                                <Placemark
                                    geometry={weatherCity && 'lat' in weatherData ? [weatherCity.lat, weatherCity.lon] : [initialWeatherState.coord.lat, initialWeatherState.coord.lon]}/>
                            </Map>
                        </YMaps>
                    </Box>
                    <Box marginTop={2}>
                        <Tabs value={tab} onChange={handleTabChange}>
                            <Tab label='Now'/>
                            <Tab label='2 days'/>
                            <Tab label='7 days'/>
                        </Tabs>

                        {weatherData && "current" in weatherData &&
                        <Weather tab={tab} data={weatherData}/>
                        }
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default App;
