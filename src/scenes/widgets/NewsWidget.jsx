import React, { useEffect, useState } from 'react';
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const NewsWidget = ({ location }) => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const [localNews, setLocalNews] = useState([]);
    const [internationalNews, setInternationalNews] = useState([]);
    const [localNewsError, setLocalNewsError] = useState(null);
    const [internationalNewsError, setInternationalNewsError] = useState(null);
    const API_KEY = '8cee84c3b71c4850bc1ee18eea3ce3c0'; // replace with your NewsAPI key

    useEffect(() => {
        const CITY_NAME = location.split(',')[0]; // Get the city name

        // Fetch local news
        fetch(`https://newsapi.org/v2/everything?q=${CITY_NAME}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if (data.articles.length === 0) {
                    throw new Error('No news found');
                }
                setLocalNews(data.articles);
            })
            .catch(() => setLocalNewsError('No news found'));

        // Fetch international news
        fetch(`https://newsapi.org/v2/everything?q=world&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => setInternationalNews(data.articles))
            .catch(() => setInternationalNewsError('News not available'));
    }, []);

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    News
                </Typography>
                <Typography color={medium}>Location: {localNewsError ? 'Not found' : location}</Typography>
            </FlexBetween>

            <Typography color={dark} variant="h6" fontWeight="500">
                Local News
            </Typography>
            {localNewsError ? (
                <Typography color={medium}>{localNewsError}</Typography>
            ) : (
                <ul>
                    {localNews.slice(0, 10).map((news, index) => (
                        <li key={index}>
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                <Typography color={medium}>
                                    {news.title}
                                </Typography>
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <Typography color={dark} variant="h6" fontWeight="500">
                International News
            </Typography>
            {internationalNewsError ? (
                <Typography color={medium}>{internationalNewsError}</Typography>
            ) : (
                <ul>
                    {internationalNews.slice(0, 10).map((news, index) => (
                        <li key={index}>
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                <Typography color={medium}>
                                    {news.title}
                                </Typography>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </WidgetWrapper>
    );
};

export default NewsWidget;