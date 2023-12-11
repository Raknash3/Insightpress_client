import React, { useEffect, useState } from 'react';
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const WeatherWidget = ({ location }) => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null); // New state for error messages
    const API_KEY = '1eb3ae7ec3cd97276930ce9d3ca7b389'; // replace with your OpenWeatherMap API key
    const CITY_NAME = location.split(',')[0];
    // 'Dummy'; // replace with the city name

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => setWeatherData(data))
            .catch(() => setError('Location incorrect or not found')); // Set custom error message
    }, []);

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Weather
                </Typography>
                <Typography color={medium}>Location: {error ? 'Not found' : location}</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src="https://insightpress-server.onrender.com/assets/weather2.jpg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />

            {error && <Typography color="error">{error}</Typography>} {/* Display error messages */}

            {weatherData && weatherData.main && !error ? (
                <>
                    <Typography color={medium} m="0.5rem 0">
                        Temperature: {Math.round(weatherData.main.temp - 273.15)} °C
                    </Typography>
                    <Typography color={medium} m="0.5rem 0">
                        Humidity: {weatherData.main.humidity}
                    </Typography>
                    <Typography color={medium} m="0.5rem 0">
                        Wind Speed: {weatherData.wind.speed}
                    </Typography>
                </>
            ) : (
                <>
                    <Typography color={medium} m="0.5rem 0">
                        Temperature: Not available
                    </Typography>
                    <Typography color={medium} m="0.5rem 0">
                        Humidity: Not available
                    </Typography>
                    <Typography color={medium} m="0.5rem 0">
                        Wind Speed: Not available
                    </Typography>
                </>
            )}
        </WidgetWrapper>
    );
};

export default WeatherWidget;