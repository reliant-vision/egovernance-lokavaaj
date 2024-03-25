import { Box, Button, Grid, Paper, Snackbar, Typography, styled } from '@mui/material';
import React, { useState } from 'react';

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

const CreateApplication = () => {
    const [applicationData, setApplicationData] = useState<Application>({
        application_number: '',
        applicant_name: '',
        gender: '',
        caste: '',
        dob: '',
        aadhaar_number: '',
        ration_card_number: '',
        mobile: '',
        email: '',
        occupation: '',
        village: '',
        taluka: '',
        district: '',
        address: '',
        grievance_type: '',
        description: '',
        application_status: '',
        remarks: '',
        assigned_to: '',
        assembly_constituency: '',
    });

    const handleChange = () => {

    };

    const StyledItem = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F9F9FB',
        padding: theme.spacing(1.5),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        border: '1px solid #ccc',
    }));

    return (
        <Box mt="0.5rem" ml="12rem" p="0 0.5rem" display="flex" justifyContent="center" width="75%" sx={{ backgroundColor: '#DCDAD8' }}>
            <Box width="100%" p={2} sx={{ border: '2px solid grey', backgroundColor: '#E9E9EA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2" textAlign="center" marginLeft="43%">NEW APPLICATION</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginBottom: "10px", backgroundColor: "#DCDAD8" }}
                        onClick={() => console.log('Submit')} // Handle submit action here
                    >
                        <Typography>SUBMIT</Typography>
                    </Button>
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
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>
                            <Grid item >
                                <input
                                    type="text"
                                    name="applicant_name"
                                    value={applicationData.applicant_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', height: '100%', border: 'none',
                                    background: '#fff',
                                    padding: '11px', // Adjust padding as needed
                                    fontSize: '16px',
                                    marginTop:'0.2rem'
                                }}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={false} // Set open to true when you want to display the Snackbar
                autoHideDuration={6000}
                onClose={() => { }}
                message="Snackbar message"
            />
        </Box>
    )
}

export default CreateApplication;
