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
        <body>
        <div>
        </div>
        </body>
    )
}


export default HomePage;