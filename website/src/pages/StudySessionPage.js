import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Menu, MenuItem, List, ListItem} from '@mui/material';
import Header from '../components/Header';

const StudySessionPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [membersDetails, setMembersDetails] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const allSessions = JSON.parse(localStorage.getItem('allSessions')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const sessionDetails = allSessions.find(s => s.id === parseInt(sessionId, 10));

    if (sessionDetails) {
      setSession(sessionDetails);
      const memberUsernames = sessionDetails.members;
      const memberNames = memberUsernames.map(username => users[username] ? users[username].name : "Unknown");
      setMembersDetails(memberNames);
    }
  }, [sessionId]);

  const handleMemberClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'Not available';
    const dateTime = new Date(isoString);
    return dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!session) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Header title={session.name} />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center' }}>Session Details</Typography>
              <Typography gutterBottom>Start Time: {formatDateTime(session.startTime)}</Typography>
              <Typography gutterBottom>End Time: {formatDateTime(session.endTime)}</Typography>
              <Typography gutterBottom>Reminder Message: {session.reminderMessage || 'None'}</Typography>
              <Typography gutterBottom>Reminder Frequency: {session.reminderFrequency || 'None'}</Typography>
              <Typography gutterBottom>Members: {membersDetails.length}</Typography>
              <Button 
                sx={{ py: 0.5, fontSize: '1rem', textTransform: 'none' }} 
                variant="contained" 
                color="primary" 
                onClick={handleMemberClick}
                aria-controls="members-menu"
                aria-haspopup="true"
              >
                Show all members
              </Button>
              <Menu
                id="members-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {membersDetails.map((name, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center' }}>Notes</Typography>
              <List>
                {session.notes && session.notes.length > 0 ? (
                  session.notes.map((note, index) => (
                    <ListItem key={index} divider sx={{ my: 1, mx: 2, marginRight: 6 }}>
                      <Typography sx={{ wordBreak: 'break-word' }}>
                        {note}
                      </Typography>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ textAlign: 'center', my: 2 }}>No notes to display</Typography>
                )}
              </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudySessionPage;
