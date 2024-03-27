import React, {useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import '../styles/home.css'; 
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Box, Typography, useTheme } from '@mui/material';



const homeimg = require("../assets/goa-map.png");

interface Data {
    id: number,
    name: string,
    email: string
}

const HomePage=()=>{
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {palette} = useTheme();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDQyMzA1MCwianRpIjoiMTViMDljZTItMjdkNC00MjA0LTk0ZGItZmM0ZmNiOGFmNDUyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFiYyIsIm5iZiI6MTcxMDQyMzA1MCwiY3NyZiI6IjRiZGJmOGQ5LThkNjQtNGZkYS1hYTQyLTU5MTgzODM2Y2FmNCIsImV4cCI6MTcxMDQyMzk1MH0.Ynhiklg_AWOUQSeT4ciwAS6c2igIpNXA17l40pTwRgQ");

            const response = await fetch('/departments/', {
                method: "GET",
                headers: myHeaders
              });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            const errorMessage = (error as Error).message;
            setLoading(false);
        }
    };
    return (
        <Box>
            <Typography variant='h1' sx={{color: palette.primary[100]}} display="flex" p="0 35rem">Welcome to Telangana</Typography>
            <Box p="2rem 20rem">
            <Typography fontSize="20px" sx={{color: palette.primary[100]}}>Formed as the 29th State of India, Telangana came into being on the 2nd of June, 2014. The State has an area of 1,12,077 sq. Km. and has a population of 3,50,03,674 (2011 Census). The Telangana region was part of the Hyderabad state from 17th September 1948 to 1st November 1956, until it was merged with Andhra State to form Andhra Pradesh.</Typography>
            </Box>
            <Box p="0.5rem 20rem">
            <Typography fontSize="20px" sx={{color: palette.primary[100]}}>After decades of movement for a separate State, Telangana was created by passing the AP State Reorganization Bill in both houses of Parliament. Telangana is surrounded by Maharashtra and Chhattisgarh in the North, Karnataka in the West and Andhra Pradesh in the South and East directions. Major cities of the State include Hyderabad, Warangal, Nizamabad, Nalgonda, Khammam and Karimnagar.</Typography>
            </Box>
        </Box>
    )
}


export default HomePage;