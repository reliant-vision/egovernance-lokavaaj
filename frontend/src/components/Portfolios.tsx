import { Typography } from '@mui/material';
import React from 'react'


interface Department {
    name: string;
    id: number;
    email: string;
  }
  
  interface PortfoliosProps {
    department: Department;
  }
  

  const Portfolios: React.FC<PortfoliosProps> = ({department}) => {
    // Example usage of the department prop
    return (
      <div>
        <Typography variant="h4">Ministry Details</Typography>
        <Typography variant="h5">Department: {}</Typography>
        {/* Add more details as needed */}
      </div>
    );
  };


export default Portfolios;