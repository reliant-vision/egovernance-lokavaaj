import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";

type Props ={
    title?: string;
    subtitle?: string;
    sidetext?: string;
    icon?: React.ReactNode;
}
const BoxHeader = ({icon, title, subtitle, sidetext}: Props) =>{
    const {palette} = useTheme();
    return(
        <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
            <Box display="flex" alignItems="center">
                {icon}
                <Box ml={1}>
                    <Typography variant="h4" mb="-0.1rem">
                        {title}
                    </Typography> 
                    <Typography variant="h6">
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h4" fontWeight="500" color={palette.grey[400]}>
                {sidetext}
            </Typography>
        </FlexBetween>
    );
};

export default BoxHeader;
