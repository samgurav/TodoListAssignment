
import * as React from 'react';
import { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Paper } from '@mui/material';
import { Redirect,Link } from 'react-router-dom';
 const paperStyle={padding:20,height:'80vh', background:'#F4F6F7', width:350, margin:'60px auto'}
const URL = "http://localhost:3001/users";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User: [],
            email: "",
            pass: "",
            login:0,
         
        }
    }

    componentDidMount() {
        axios.get(URL)
            .then(response => {
                this.setState({ User: response.data });
            });
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

   
    handleSubmit = (event) => {
      
        event.preventDefault();
        let usernotfound = 1;
       
        this.state.User.forEach(user => {
            if (user.email === this.state.email) {
                usernotfound = 0 ;
                let arr = user;
                if (user.password === this.state.password) {
                    console.log("login successful.");
                    alert("login successful");
                   this.setState({login:1})
                sessionStorage.setItem("user",JSON.stringify(arr));
                     
                 
                    
                }
               
                else {
                    console.log("Invaild Password.");
                    alert("invalid password")
                }
            }
        });
      
        if (usernotfound === 1) {
            console.log("User not Found.");
            alert("User not found")
        }
    }


render() {
  
        return (
           <Paper elevation={10} style={paperStyle }>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={this.handleSubmit}  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleInput}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="pass"
                            label="Password"
                            type="password"
                            id="pass"
                            autoComplete="current-password"
                            onChange={this.handleInput}
                        />
                     
                        <Button
                         
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {
                            this.state.login==1 && <Redirect to='/dashboard'/>
                        }
                        <p>New User? Register Here</p>
                           <Button
                          component={Link} to='/register'
                          exact activeClassName="active"
                         type="submit"
                         fullWidth
                       
                         sx={{ mt: 1, mb: 2 }}
                     >
                         Sign Up
                     </Button>
                          
                    </Box>
             
                  
                </Box>
                </Container>
            </Paper>
        )
    }
}
