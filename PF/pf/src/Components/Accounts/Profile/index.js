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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

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

  const [total, setTotal] = useState(1);
  const [payment_history, setPaymentHistory] = useState(null);
  const [payment_rows, setPaymentRows] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  

function createData(id, amount, date, card_info, recurrence) {
  if (id === 0) {
    id = "Next Future Payment"
  }

  return {
    id,
    amount,
    date,
    card_info,
    recurrence,
  };
}

const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payment_rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

useEffect(() => {
  const getPaymentHistory = async () => {
        let response = await fetch('http://127.0.0.1:8000/accounts/payment_history/', {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
        let payment_history = await response.json()
        console.log(payment_history)
        setPaymentHistory(payment_history)
        setPaymentRows(null)
        let rows = []
        for (let transaction = 0; transaction < payment_history.length; transaction++) {
          rows.push(createData(payment_history[transaction].id, 
                               payment_history[transaction].amount, 
                               payment_history[transaction].date, 
                               payment_history[transaction].card_info,
                               payment_history[transaction].recurrence))
        }
        setPaymentRows(rows);
        console.log(payment_rows)

  }
   getPaymentHistory();
}, [billing_card])



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

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Card Information</TableCell>
                        <TableCell align="right">Recurrence</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                        ? payment_rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : payment_rows
                         ).map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          <TableCell align="right">{row.card_info}</TableCell>
                          <TableCell align="right">{row.recurrence}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={payment_rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
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