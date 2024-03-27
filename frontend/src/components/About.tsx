import { Box, Typography, useTheme } from '@mui/material';
import React from 'react'

const About=()=>{

    const {palette} = useTheme();
    return (
        <Box>
            <Typography variant='h1' sx={{color: palette.primary[100]}} display="flex" p="0 35rem"></Typography>
            <Box p="2rem 20rem">
            <Typography fontSize="20px" sx={{color: palette.primary[100]}}>Welcome to the Praja Paalana E-Governance Administration Application, where we revolutionize governance through the power of real-time technology. At Praja Paalana, we are committed to creating an efficient, transparent, and citizen-centric governance system that empowers every individual in our community.</Typography>
            </Box>
            <Box p="2rem 20rem">
            <Typography fontSize="20px" sx={{color: palette.primary[100]}}>In today's fast-paced world, the demand for immediate access to information and services has never been greater. Recognizing this need, we have developed a cutting-edge e-governance platform that harnesses the capabilities of real-time technology to deliver seamless and responsive governance to our citizens.</Typography>
            </Box>
            
        </Box>
    )
}


export default About;