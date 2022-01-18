import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styleSheet.css';
import { Button, TextField, Typography, Box } from '@mui/material';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
function FormComponent() {

    const [Name, setName] = useState('');
    const [Message, setMessage] = useState('');
    const [NameError, setNameError] = useState('');
    const [MessageError, setMessageError] = useState('');
    const navigate = useNavigate();

    const validation = () => {

        let shouldAdd = true;

        if (!Name.match(/^[a-zA-Z]+$/)) {
            setNameError('*Name should contain alphabets only');
            shouldAdd = false;
        } else {
            setNameError('')
        }

        if (!Message.match(/^[a-zA-Z0-9_ ]+$/)) {
            setMessageError('*Message should contain alphabets and Numbers only');
            shouldAdd = false;
        } else {
            setMessageError('')
        }
        return (shouldAdd);
    }

    return (
        <div className='alignment'>
            <Box
                sx={{
                    marginTop: 10,
                    alignItems: 'center',
                }}
            >
                <AppShortcutIcon fontSize='large' color='secondary' sx={{ m: 2 }}/>

                <Typography component="h1" fontWeight="550" fontSize={26}>
                    Form
                </Typography>
                <form>
                    <TextField
                        value={Name} onChange={(event) => { setName(event.target.value) }}
                        margin="normal"
                        label="Enter a Name"
                        name="Name"
                        required
                    />
                    <div style={{ fontSize: 12, color: "red" }}>{NameError}</div>
                    <TextField
                        value={Message} onChange={(event) => { setMessage(event.target.value) }}
                        margin="normal"
                        name="Message"
                        label="Enter a Message"
                        required
                    />
                    <div style={{ fontSize: 12, color: "red" }}>{MessageError}</div>
                </form>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!Name || !Message} onClick={(event) => {
                    if (validation()) {
                        axios.post('http://localhost:8080/message',
                            { Name: Name, Message: Message })
                            .then(response => { console.log(response) })
                            .catch(error => { console.log(error) }
                            )
                        navigate("/table")
                    } else event.preventDefault();
                }}>Add</Button>
            </Box>
        </div>
    )
}


export default FormComponent
