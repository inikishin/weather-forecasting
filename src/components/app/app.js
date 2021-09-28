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
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent, ListItemIcon,
} from "@mui/material";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import DownloadIcon from '@mui/icons-material/Download';
import {Map, YMaps, Placemark} from 'react-yandex-maps';
import {format} from 'date-fns';

function App() {

    const inputRef = useRef(null);
    const [city, setCity] = useState('');
    const [weatherCity, setWeatherCity] = useState({});
    const [tab, setTab] = useState(1);
    const initialWeatherState = {coord: {lon: 37.59, lat: 55.75}};
    const [weatherData, setWeatherData] = useState(initialWeatherState);

    console.log(weatherData);

    useEffect(() => {
        async function getData() {
            await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=097538d4a84ca8a0c65e114e765652a2`)
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
        console.log(e)
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
                <Box padding={2}>
                    <Typography variant='h1' textAlign='center'>Weather Forecasting</Typography>
                </Box>
            </AppBar>
            <Box marginTop={20}>
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

function Weather(props) {
    let arr = [];
    switch (props.tab) {
        case 0: {
            arr.push(props.data.current);
            break;
        }
        case 1: {
            arr.push(props.data.hourly[23], props.data.hourly[47]);
            break;
        }
        case 2: {
            arr.push(...props.data.daily);
            break;
        }
        default: {
            break;
        }
    }
    return (
        <Box display='flex'>
            {arr.map(item => (<WeatherCard {...item} />))}
        </Box>
    );
}

function WeatherCard(props) {

    const temp = props.temp instanceof Object ? props.temp.day : props.temp;
    const feels_like = props.feels_like instanceof Object ? props.feels_like.day : props.feels_like
    const dt = new Date();
    dt.setTime(Number(props.dt) * 1000);
    console.log(Number(props.dt));
    return (
        <Box width={144}>
            <Card>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText><Typography variant='h4'
                                                      textAlign='center'>{format(dt, 'dd.MM')}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DeviceThermostatIcon/></ListItemIcon>
                            <ListItemText><Typography
                                textAlign='end'>{Math.round(Number(temp) - 273.15)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><ChildCareIcon/></ListItemIcon>
                            <ListItemText><Typography
                                textAlign='end'>{Math.round(Number(feels_like) - 273.15)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><BeachAccessIcon/></ListItemIcon>
                            <ListItemText><Typography textAlign='end'>{Math.round(Number(props.humidity))}%</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DownloadIcon/></ListItemIcon>
                            <ListItemText><Typography
                                textAlign='end'>{Math.round(Number(props.pressure) / 1.333)}</Typography></ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    )
}

export default App;
