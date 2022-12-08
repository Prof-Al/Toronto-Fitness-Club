import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, CardActionArea, CardActions } from '@mui/material';


function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab icon={<AccountCircleIcon />} label="Overview" href="/overview" />
        <LinkTab icon={<CreditCardIcon />} label="Billing" href="/billing" />
      </Tabs>
      <Box sx={{ margin: 2 }}>
          {value === 0 && (
            <Box>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="avatar"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        John Doe
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        First Name:
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Last Name:
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Email:
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Phone Number:
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleClickOpen} size="small" color="primary">
                    Edit
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please enter the details that you would like to edit.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="avatar"
                        label="Avatar"
                        type="file"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                    </DialogActions>
                </Dialog>
                </CardActions>
            </Card>
            </Box>
          )}
          {value === 1 && (
            <Box>
              <Typography>The second tab</Typography>
            </Box>
          )}
          {value === 2 && (
            <Box>
              <Typography>The third tab</Typography>
            </Box>
          )}
        </Box>
    </Box>

  );
}