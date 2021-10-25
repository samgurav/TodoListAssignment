
import * as React from 'react';
import { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Paper } from '@mui/material';
import { Redirect ,Link} from 'react-router-dom';
 const paperStyle={padding:10,height:'110vh', width:600, margin:'20px auto'}
const URL = "http://localhost:3001/users";

const client =axios.create({
    baseURL:" http://localhost:3001/users"
})
export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User: [],
            fname:null,
            lname:null,
            username:null,
            email:null,
            pass:null,
            cpass:null , 
            register:0,
        }
    }
        handler=(event)=>{
            const {name,value}=event.target;
            this.setState({[name]:value})
          
    }
        componentDidMount=async()=>{
            const res=client.get();
            this.setState({User:(await res).data})
          
        }

        addUser=(event)=>{
       
            event.preventDefault();
           
            let User={fname:this.state.fname,lname:this.state.lname,username:this.state.username,email:this.state.email,pass:this.state.pass,cpass:this.state.cpass};   
            client.post('/',User)
            const res1= client.get()
          
         .then(res=>{
            this.setState({User:res.data})
            alert("User is registered successfully")
           
         })
         this.setState({register:1})
        }

        login=(event)=>{
            event.preventDefault();
            this.setState({register:1})

        }
        

   
  
      

render() {
  
        return (
           <Paper elevation={10} style={paperStyle }>
            <Container component="main" maxWidth="xs">
                <Box 
                    sx={{
                    
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={this.addUser}  sx={{ mt: 1 }}>
                     <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fname"
                            label="Enter First Name"
                            name="fname"
                            onChange={this.handler}
                            autoComplete="fname"
                            autoFocus
                        >  
                        </TextField>
                         
                        <TextField
                            margin="normal"
                           required
                            fullWidth
                            id="lname"
                            label="Enter Last Name"
                            name="lname"
                            onChange={this.handler}
                            autoComplete="lname"
                            autoFocus
                        />
              
                         <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Enter Username"
                            name="username"
                            onChange={this.handler}
                            autoComplete="username"
                            autoFocus
                        />
                      
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.handler}
                            autoComplete="email"
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
                            onChange={this.handler}
                            autoComplete="current-password"
                        />
                     
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="cpass"
                            label="Confirm Password"
                            type="password"
                            id="cpass"
                            onChange={this.handler}
                            autoComplete="current-password"
                        />
                       
                      
                        <Button
                         
                            type="submit"
                           fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        {
                            this.state.register==1 && <Redirect to='/login'/>
                        }
                      
                    </Box>
                    <p> already have an account? Login Here</p>
                    <Button
                    component={Link} to='/login'
                         exact activeClassName="active"
                         type="submit"
                        fullWidth
                       
                         sx={{ mt: 1, mb: 2 }}
                     >
                        Sign In
                     </Button>
                 
                </Box>
                </Container>
            </Paper>
        )
    }
}
