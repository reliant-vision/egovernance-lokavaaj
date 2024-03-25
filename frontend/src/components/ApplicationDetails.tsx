import { Box, Paper, Grid, styled, Typography, Button,Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, TextField, Autocomplete, Menu, MenuItem, SelectChangeEvent, Snackbar } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

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
    username: string;
    email: string;
    assigned_to: string;
    application_status: string;
    remarks: string;
}

interface UserData{
    username: string;
    email: string;
    designation: string;
}

const ApplicationsDetails: React.FC = () => {
    const { application_number } = useParams<{ application_number: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [applicationData, setApplicationData] = useState<Application | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [usersData, setUsersData] = useState<UserData[] | null>(null);
    const [applicationUpdateData, setApplicationUpdateData] = useState<ApplicationUpdate | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    

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
                setUsersData(data.map((app: UserData, index: number) => ({ ...app, id: index })));
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

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const newValue = event.target.value as string;
        setApplicationUpdateData(prevState => ({
            ...prevState!,
            application_status: newValue
        }));
    };

    const [remarks, setRemarks] = useState<string>(
        applicationData ? applicationData.remarks : ''
    );

    const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setApplicationUpdateData(prevState => ({
            ...prevState!,
            remarks: newValue
        }));
    };

    const handleOpenSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
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
    
    const handleSave = async () => {
        try {
            const response = await fetch(`/applications/${application_number}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationUpdateData),
            });
            if (!response.ok) {
                throw new Error('Failed to update data');
            }
            // Optionally, you can fetch the updated data again to reflect the changes
            // const updatedData = await response.json();
            // setApplicationData(updatedData);
            handleOpenSnackbar('Data updated successfully');
            handleCloseEditDialog();
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update data');
        }
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
            <Dialog
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                sx={{
                    width: '100%',
                    height: '100%',
                    '& .MuiDialogTitle-root': {
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc',
                    },
                    '& .MuiDialogContent-root': {
                        paddingTop: '24px',
                    },
                    '& .MuiTypography-subtitle1': {
                        marginBottom: '8px',
                        fontWeight: 'bold',
                    },
                    '& .MuiFormControl-root': {
                        width: '100%',
                    },
                    '& .MuiTextField-root': {
                        width: '100%',
                    },
                }}
            >
                <DialogTitle><Typography display='flex' variant="h3" sx={{color:"black"}}>Edit Application</Typography></DialogTitle>
                <DialogContent>
                    <Box width="500px">
                        <Typography variant="subtitle1">Update Application Status:</Typography>
                        <FormControl>
                            {/* <InputLabel id="application-status-label">Application Status</InputLabel> */}
                            <Select
                                labelId="application-status-label"
                                id="application-status-select"
                                value={applicationUpdateData?.application_status || applicationData.application_status || ''}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="open">open</MenuItem>
                                <MenuItem value="pending review">pending review</MenuItem>
                                <MenuItem value="resolved">resolved</MenuItem>

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
                            value={applicationUpdateData?.remarks || applicationData.remarks || ''}
                            onChange={handleRemarksChange}
                        />
                    </Box>
                    <Box mt={2}>
                        <Typography variant="subtitle1">Assign To:</Typography>
                        <Autocomplete
                            id="assigned-to-autocomplete"
                            options={(usersData || []).map(user => user.username)}// Extracting usernames
                            getOptionLabel={(option) => option} // Assuming usernames are strings
                            onChange={(event: any, newValue: string | null) => {
                                setApplicationUpdateData(prevState => ({
                                    ...prevState!,
                                    assigned_to: newValue || ''
                                }));
                            }}
                            renderInput={(params) => <TextField {...params} label="Assigned To" variant="outlined" />}
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />

        </Box>
    );
};

export default ApplicationsDetails;
