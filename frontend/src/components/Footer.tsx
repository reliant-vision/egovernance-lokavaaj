// Footer.tsx

import React from 'react';
import {Box, Typography, useTheme} from "@mui/material"
import FlexBetween from './FlexBetween';

const Footer: React.FC = () => {
  const {palette} = useTheme();
  return (
    <Box
      textAlign="center"
      py={3}
      mt="auto" // Pushes the footer to the bottom of the page
    >
    <FlexBetween mb="0.25rem" p="0rem 28rem " color={palette.grey[300]} textAlign="center">
    <FlexBetween gap="0.75rem">
          <Typography variant='h4' fontSize="12px">
              Copyright © 2024 | All rights reserved | Govt of Goa | Developed by Reliant Vision Technologies
          </Typography>
    </FlexBetween>
    </FlexBetween>
    </Box>
  );
};

export default Footer;
