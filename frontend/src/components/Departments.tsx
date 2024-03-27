import { Box, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Department {
    name: string;
    id: number;
    email: string;
}

const Departments: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [firstDepartmentLoaded, setFirstDepartmentLoaded] = useState(false); 
    const [selected, setSelected] = useState<string | null>(null);


    const {palette} = useTheme();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('/departments/');
                if (!response.ok) {
                    console.log("Failed")
                    throw new Error('Failed to fetch data');
                }
                console.log("Success and Before accessing response", response)
                const data = await response.json();
                console.log("data", data)
                setDepartments(data.map((department: Department, index: number) => ({ ...department, id: index })));
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    useEffect(() => {
        if (departments.length > 0 && !selectedDepartment) {
            setSelectedDepartment(departments[0].name);
            setFirstDepartmentLoaded(true);
        }
    }, [departments, selectedDepartment]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDepartmentClick = (name: string) => {
        setSelectedDepartment(name);
    };

    return (
        <Box p="0 0.5rem" display="flex">
            <div className="departments-sidebar" style={{ width: '25%', backgroundColor: 'grey', overflowY: 'auto',  maxHeight: 'calc(100vh - 64px)' }}>
                <div className="departments-sidebar-content">
                    {departments.map((department) => (
                        <div key={department.id}>
                            <Box mb="0.3rem" alignContent="center" p="0 2rem">
                            <Link to={`/departments/${department.name}`} onClick={() => handleDepartmentClick(department.name)} style={{color:selected === department.name ? "inherit" : palette.grey[700], textDecoration: "inherit"}}>
                                <Typography variant='h5' sx={department.name === selectedDepartment && firstDepartmentLoaded ? {color: "black"} : {}}>{department.name}</Typography>
                            </Link>
                            </Box>
                        </div>
                    ))}
                </div>
            </div>
            <div className="department-content" style={{ marginLeft: '0rem', flex: 1, backgroundColor: "#fff"}}>
                {selectedDepartment && <DepartmentContent name={selectedDepartment} />}
            </div>
        </Box>
    );
};

interface DepartmentContentProps {
    name: string;
}

const DepartmentContent: React.FC<DepartmentContentProps> = ({ name }) => {

    const departmentContent = `This is the content of department with name ${name}`;
    console.log("DepartmentContent", name)

    return (
        <div>
            <Typography variant="h1" style={{ textAlign: "center" }}>Department of {name}</Typography>
            <Box p="2rem 5rem">
            <Typography fontSize="20px" sx={{color:'black'}}>{departmentContent}</Typography>
            </Box>
        </div>
    );
};

export default Departments;
