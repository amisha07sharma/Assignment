import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styleSheet.css';
import { Button, Typography, Box } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import DeleteIcon from '@mui/icons-material/Delete';

function TableComponent() {
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const navigate = useNavigate()
    const [Humans, setHumans] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/message')
            .then(response => {
                setHumans(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [showDeleteButton])


    return (
        <div className='alignment'>
            <Box
                sx={{
                    marginTop: 3,
                    alignItems: 'center',
                }}>
                <div className='flexbox-container2'>
                    <TableViewIcon fontSize='large' style={{ color: "royalblue" }} sx={{ m: 3 }} />

                    <Typography icon="TableViewIcon" component="h1" fontWeight="550" fontSize={38} marginBottom={1}>
                        Table
                    </Typography>
                </div>

                <div className='flexbox-container1'>
                    <div className='flexbox-item1 flexbox-container2'>
                        <div className='flexbox-item2 heading'> NAME</div>
                        <div className='flexbox-item2 heading'>MESSAGE</div>
                        {showDeleteButton ? (<div className='flexbox-item3 heading'>ACTION</div>) : null}
                    </div>
                    {Humans.map((human) =>
                        <div className='flexbox-item1 flexbox-container2' key={human.ID}>
                            <div className='flexbox-item2'> {human.Name}</div>
                            <div className='flexbox-item2'>{human.Message}</div>
                            
                            {showDeleteButton ? (<Button className='flexbox-item3' variant="outlined" onClick={() => {
                                let a = human["ID"];
                                let url = "http://localhost:8080/deletemessage/" + a;
                                axios.delete(url)
                                .then(response => {
                                    alert("Entry Deleted successfully");
                                    setShowDeleteButton(false);
                                    navigate("/table")
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                            }} startIcon={<DeleteIcon />}>Delete</Button>) : null}
                        </div>
                    )}
                </div>
                <div className='container'>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => { navigate("/") }}>Go Back</Button>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => { setShowDeleteButton(!showDeleteButton) }}>Delete an Entry</Button>
                </div>
            </Box>
        </div>
    )
}

export default TableComponent
