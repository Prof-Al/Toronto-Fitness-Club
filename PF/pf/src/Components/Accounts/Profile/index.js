import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Input, Typography } from '@mui/material';
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
import { Fragment } from 'react';
import { useEffect, useState } from 'react';


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
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);

  const [email, setEmail] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    const getProfiles = async () => {
          let response = await fetch('http://127.0.0.1:8000/accounts/profile', {
              method: "GET",
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          })
          let data = await response.json()
          setData(data)
    }
     getProfiles();
  }, [profile])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage()
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  const success = async (text)=> {
    handleClose()
  }; 

  const update_profile_api = async (email, first_name, last_name, phone, avatar, success, fail) => {
    var data = new FormData();

    console.log(email, first_name, last_name, phone, avatar)
    if (email !== "") {
      data.append("email", email)
    }
    if (first_name !== "") {
      data.append("first_name", first_name)
    }
    if (last_name !== "") {
      data.append("last_name", last_name);
    }
    if (phone !== "") {
      data.append("phone", phone)
    } 
    if (avatar !== null) {
      data.append("avatar", avatar, avatar.name)
    }

    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    const response = await fetch(
          "http://127.0.0.1:8000/accounts/update_profile/",
          {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: data
          }
      );
    const text = await response.text();
    if (response.status === 200) {
      setProfile(new Date)
      success(JSON.parse(text));
    } else {
      console.log("fail", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
};

const tryUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("Updating profile");
    await update_profile_api(email, first_name, last_name, phone, avatar, success, (text)=>{setMessage(text)});
};

  return (
    <Box sx={{ width: '100%' }}>
      {isAuth === true ? (
      <Fragment>
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
                    image={"http://127.0.0.1:8000" + data.avatar}
                    alt="avatar"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.first_name + " " + data.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        First Name: {data.first_name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Last Name: {data.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Email: {data.email}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Phone Number: {data.phone}
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
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{setFirstName(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{setLastName(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{setPhone(e.target.value)}}
                    />
                    <Input
                        autoFocus
                        margin="dense"
                        id="avatar"
                        label="Avatar"
                        type="file"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{setAvatar(e.target.files[0])}}
                    />
                    <div style={{margin: "1em", color: "red"}}>{message}</div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={tryUpdateProfile}>Save</Button>
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
      </Fragment>
      ) : (
      <Fragment>
          <div>You are not logged in!</div>
      </Fragment>
      )}
    </Box>

  );
}