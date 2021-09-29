import {Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {format} from "date-fns";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";

function Weather(props) {
    let arr = [];
    let gridTemplate = '';

    switch (props.tab) {
        case 0: {
            arr.push(props.data.current);
            gridTemplate = '1fr';
            break;
        }
        case 1: {
            arr.push(props.data.hourly[23], props.data.hourly[47]);
            gridTemplate = '1fr 1fr';
            break;
        }
        case 2: {
            arr.push(...props.data.daily);
            gridTemplate = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
            break;
        }
        default: {
            break;
        }
    }
    return (
        <>
            <Box display='grid' gridTemplateColumns={gridTemplate}>
                {props.tab === 0 && arr.map(item => (<WeatherCardFull {...item} />))}
                {props.tab === 1 && arr.map(item => (<WeatherCardExtended {...item} />))}
                {props.tab === 2 && arr.map(item => (<WeatherCard {...item} />))}
            </Box>
        </>
    );
}

function WeatherCard(props) {

    const temp = props.temp instanceof Object ? props.temp.day : props.temp;
    const feels_like = props.feels_like instanceof Object ? props.feels_like.day : props.feels_like
    const dt = new Date();
    dt.setTime(Number(props.dt) * 1000);
    console.log(Number(props.dt));
    return (
        <Box width={130}>
            <Card>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText><Typography variant='h5'
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

function WeatherCardExtended(props) {

    const temp = props.temp instanceof Object ? props.temp.day : props.temp;
    const feels_like = props.feels_like instanceof Object ? props.feels_like.day : props.feels_like
    const weather = props.weather[0].description

    const dt = new Date();
    dt.setTime(Number(props.dt) * 1000);
    console.log(Number(props.dt));
    return (
        <Box margin={2}>
            <Card>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText><Typography variant='h5'
                                                      textAlign='center'>{format(dt, 'dd.MM')}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DeviceThermostatIcon/></ListItemIcon>
                            <ListItemText>Temperature, C:</ListItemText>
                            <ListItemText><Typography
                                textAlign='end'
                                paddingRight={4}>{Math.round(Number(temp) - 273.15)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><ChildCareIcon/></ListItemIcon>
                            <ListItemText><Typography>Feels like:</Typography></ListItemText>
                            <ListItemText><Typography
                                textAlign='end' paddingRight={4}>{Math.round(Number(feels_like) - 273.15)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><BeachAccessIcon/></ListItemIcon>
                            <ListItemText><Typography>Humidity:</Typography></ListItemText>
                            <ListItemText><Typography textAlign='end'
                                                      paddingRight={4}>{Math.round(Number(props.humidity))}%</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DownloadIcon/></ListItemIcon>
                            <ListItemText><Typography>Pressure, mm hs:</Typography></ListItemText>
                            <ListItemText><Typography
                                textAlign='end'
                                paddingRight={4}>{Math.round(Number(props.pressure) / 1.333)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><ChildCareIcon/></ListItemIcon>
                            <ListItemText><Typography>Common weather conditions:</Typography></ListItemText>
                            <ListItemText><Typography
                                textAlign='end' paddingRight={4}>{weather}</Typography></ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    )
}

function WeatherCardFull(props) {

    const temp = props.temp instanceof Object ? props.temp.day : props.temp;
    const feels_like = props.feels_like instanceof Object ? props.feels_like.day : props.feels_like
    const weather = props.weather[0].description

    const dt = new Date();
    dt.setTime(Number(props.dt) * 1000);
    console.log(Number(props.dt));
    return (
        <Box margin='10px 120px'>
            <Card>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText><Typography variant='h5'
                                                      textAlign='center'>{format(dt, 'dd.MM')}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DeviceThermostatIcon/></ListItemIcon>
                            <ListItemText>Temperature, C:</ListItemText>
                            <ListItemText><Typography
                                textAlign='end'
                                paddingRight={4}>{Math.round(Number(temp) - 273.15)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><ChildCareIcon/></ListItemIcon>
                            <ListItemText><Typography>Feels like:</Typography></ListItemText>
                            <ListItemText><Typography
                                textAlign='end' paddingRight={4}>{Math.round(Number(feels_like) - 273.15)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><BeachAccessIcon/></ListItemIcon>
                            <ListItemText><Typography>Humidity:</Typography></ListItemText>
                            <ListItemText><Typography textAlign='end'
                                                      paddingRight={4}>{Math.round(Number(props.humidity))}%</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DownloadIcon/></ListItemIcon>
                            <ListItemText><Typography>Pressure, mm hs:</Typography></ListItemText>
                            <ListItemText><Typography
                                textAlign='end'
                                paddingRight={4}>{Math.round(Number(props.pressure) / 1.333)}</Typography></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><ChildCareIcon/></ListItemIcon>
                            <ListItemText><Typography>Common weather conditions:</Typography></ListItemText>
                            <ListItemText><Typography
                                textAlign='end' paddingRight={4}>{weather}</Typography></ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Weather;