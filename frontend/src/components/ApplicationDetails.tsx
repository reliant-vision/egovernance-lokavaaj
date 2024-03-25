import { Box, Paper, Grid, styled, Typography, Button,Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, TextField, Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { MenuItem } from "@mui/base";

interface Application {
    application_number: string;
    applicant_name: string;
    gender: string;
    caste: string;
    dob: string;
    aadhaar_number: string;
    ration_card_number: string;
    mobile: string;
    email: string;
    occupation: string;
    village: string;
    taluka: string;
    district: string;
    address: string;
    grievance_type: string;
    description: string;
    application_status: string;
    remarks: string;
    assigned_to: string;
    assembly_constituency: string;
}

interface ApplicationUpdate{
    
}


const ApplicationsDetails: React.FC = () => {
    const { application_number } = useParams<{ application_number: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [applicationData, setApplicationData] = useState<Application | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [assignedTo, setAssignedTo] = useState<ApplicationUpdate | null>(null);
    const [remarks, setRemarks] = useState<ApplicationUpdate | null>(null);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await fetch(`/applications/${application_number}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setApplicationData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }

            try {
                const response = await fetch('/auth/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setAssignedTo(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchApplication();
    }, []);

    const handleEditClick = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!applicationData) {
        return <div>No data found for application number {application_number}</div>;
    }

    const StyledItem = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F9F9FB',
        padding: theme.spacing(1.5),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        border: '1px solid #ccc',
    }));

    const renderValue = (value: string | null) => {
        return value !== null && value !== '' ? value : "NA";
    };
    

    return (
        <Box mt="0.5rem" ml="12rem" p="0 0.5rem" display="flex" justifyContent="center" width="75%" sx={{ backgroundColor: '#DCDAD8' }}>
            <Box width="100%" p={2} sx={{ border: '2px solid grey', backgroundColor: '#E9E9EA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h2" textAlign="center" marginLeft="40%">APPLICATION DETAILS</Typography>
                    <Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{marginBottom:"10px", backgroundColor:"#DCDAD8"}}
                        startIcon={<EditIcon />} // Icon displayed before the button label
                        onClick={handleEditClick} // Call the function passed via props when the button is clicked
                        >
                        <Typography>UPDATE</Typography>
                    </Button>
                    </Typography>
                </div>

                <Grid container spacing={2}>
                    
                <Grid item xs={6}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item spacing={2}>
                                <StyledItem><strong>Application Number</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Applicant Name</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Sex</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Caste</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Date of Birth</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Aadhaar Number</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Ration Card Number</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Mobile</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Email</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Occupation</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Address</strong></StyledItem>
                            </Grid>
                            <Grid item marginTop="1.2rem">
                                <StyledItem><strong>Village</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Assembly Constituency</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Taluka/Mandal</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>District</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Description</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Grievance</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Application Status</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Remarks</strong></StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem><strong>Assigned to</strong></StyledItem>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item spacing={2}>
                                <StyledItem>{renderValue(applicationData.application_number)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.applicant_name)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.gender)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.caste)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.dob)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.aadhaar_number)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.ration_card_number)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.mobile)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.email)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.occupation)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.address)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.village)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.assembly_constituency)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.taluka)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.district)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.description)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.grievance_type)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.application_status)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.remarks)}</StyledItem>
                            </Grid>
                            <Grid item>
                                <StyledItem>{renderValue(applicationData.assigned_to)}</StyledItem>
                            </Grid>
                        </Grid>
                    </Grid>
                                
                </Grid>
            </Box>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Application</DialogTitle>
                <DialogContent>         
                    <Box>
                        <Typography variant="subtitle1">Update Application Status:</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="application-status-label">Application Status</InputLabel>
                            <Select
                                labelId="application-status-label"
                                id="application-status-select"
                            >
                                {/* {applicationStatusOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))} */}
                                <MenuItem>open</MenuItem>
                                <MenuItem>pending review</MenuItem>
                                <MenuItem>resolved</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <Typography variant="subtitle1">Remarks:</Typography>
                        <TextField
                            id="remarks-textarea"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </Box>
                    <Box mt={2}>
                        <Typography variant="subtitle1">Assigned To:</Typography>
                        {/* <Autocomplete
                            id="assigned-to-autocomplete"
                            options= ""// Array of users fetched from the database
                            getOptionLabel={(option) => option.name} // Display the user's name in the autocomplete
                            onChange={(event: any, newValue: any | null) => {
                                setAssignedTo(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Assigned To" variant="outlined" />}
                        /> */}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleCloseEditDialog}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ApplicationsDetails;
