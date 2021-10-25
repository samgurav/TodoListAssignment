import React, { Component } from 'react'
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

 

export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        logout:0,
     
    }
}

 Logout=()=>{
   
  sessionStorage.clear()
  alert('logout')
  this.setState({logout:1})
 
}
    render() {
      if (this.state.logout == 1) {
        return <Redirect to="/" />
      }
        return (
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           
      <Button  component={Link} to='/dashboard' style={{textDecoration:'none',color:'white',margin:'10px',fontSize:'15px'}} exact activeClassName="active">Home</Button>&nbsp;
      <Button  component={Link} to='/todoform' style={{textDecoration:'none',color:'white',margin:'10px',fontSize:'15px'}} exact activeClassName="active">Todo Form</Button>&nbsp;
      <Button  style={{lineBreak:'none',color:'white',margin:'5px' ,fontSize:'15px', color:'black'}} > <b>{` WELCOME :${JSON.parse(sessionStorage.getItem("user")).username}`}</b></Button>
      <Button  style={{textDecoration:'none',color:'white',margin:'10px',fontSize:'15px'}} exact activeClassName="active" onClick={this.Logout}>Logout</Button>&nbsp;
 
          </Typography>
       
        </Toolbar>
      </AppBar>
    </Box>
        )
    }
}

export default NavigationBar

