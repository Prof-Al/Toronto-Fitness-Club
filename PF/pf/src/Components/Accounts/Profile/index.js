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
import Navbar from '../../Navbar';
import { spacing } from '@mui/system';


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
  const [card_info, setCardInfo] = useState("")
  const [billing_card, setBillingCard] = useState("")
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
  }, [profile, billing_card])
  
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

const update_card_info_api = async (card_info, success, fail) => {

  const response = await fetch(
        "http://127.0.0.1:8000/accounts/update_card_info/",
        {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "card_info": card_info
            })
        }
    );
  const text = await response.text();
  if (response.status === 200) {
    setBillingCard(new Date)
    success(JSON.parse(text));
  } else {
    console.log("fail", text);
    Object.entries(JSON.parse(text)).forEach(([key, value])=>{
      fail(`${key}: ${value}`);
    });
  }
};

const tryUpdateCardInfo = async (e) => {
  e.preventDefault();
  console.log("Updating card information");
  await update_card_info_api(card_info, success, (text)=>{setMessage(text)});
};

  return (
    <>
      <Box bgcolor="white" sx={{ width: '100%', height: '110vh'}}>
      <Navbar />
        {isAuth === true ? (
        <Fragment>
        <Tabs sx={{m: 10}} value={value} onChange={handleChange} aria-label="nav tabs example">
          <Tab icon={<AccountCircleIcon />} label="Overview" />
          <Tab icon={<CreditCardIcon />} label="Billing" />
        </Tabs>
        <Box>
            {value === 0 && (
              <Box>
              <Card sx={{ minHeight: 350, maxWidth: 800, m:10 }}>
                  <CardActionArea>
                      <CardMedia
                      component="img"
                      height="300"
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
                <Card sx={{ maxWidth: 300, m:10 }}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Credit Card Information
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          Number: {data.card_info}
                      </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={handleClickOpen} size="small" color="primary">
                        Edit
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edit Card Information</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Please enter a 16 digit card number.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="card_info"
                            label="Card Information"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e)=>{setCardInfo(e.target.value)}}
                        />
                        <div style={{margin: "1em", color: "red"}}>{message}</div>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={tryUpdateCardInfo}>Save</Button>
                        </DialogActions>
                    </Dialog>
                    </CardActions>
                </Card>
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
    </>

  );
}