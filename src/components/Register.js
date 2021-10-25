
  import React, { Component } from 'react'
  import { Link,Redirect } from 'react-router-dom';
  import axios from 'axios';
  import Button from '@mui/material/Button';
  const regForName = RegExp(/^[A-Za-z]{2,10}$/);
  const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
  const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const regForMobile = RegExp(/^[7-9][0-9]{9}$/);
  const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
  const regForPin = RegExp(/^[0-9]{6}$/);
  const URL = "http://localhost:3001/users";

const client =axios.create({
    baseURL:" http://localhost:3001/users"
})
export class Register extends Component {
  constructor(props){
      super(props);
      this.state={
        User: [],
        fname:null,
        lname:null,
        username:null,
        email:null,
        pass:null,
        cpass:null , 
        register:0,
       
        
     
          
          errors:{
              fname:'',
              lname:'',
              username:'',
              email:'',
              pass:'',
              cpass:'',
             
            

          }

      }
  }
  handler=(events)=>{
    const {name,value}=events.target;
    let errors=this.state.errors;
      switch(name){
        default:
        case 'fname':
            errors.fname= regForName.test(value)?'':'first name should be between 2 to 10 letters';
            break;
        case 'lname':
                    errors.lname= regForName.test(value)?'':'last name should be between 2 to 10 letters';
               break;
               case 'username':
                errors.username= regForUName.test(value)?'':'username should be between 2 to 12 letters';
           break;
           case 'email':
            errors.email= regForEmail.test(value)?'':'invalid email';
       break;
    case 'pass': errors.pass=regForPass.test(value)?'':'Password must be between 6 to 16 characters and must contain one number and one special character';
        break;
     case 'cpass': errors.cpass=this.state['pass'] === value?'':'Password do not match';
      break; 
    
  
         
    }
    this.setState({errors,[name]:value},()=>{
        console.log(errors);
    })
  }

  componentDidMount=async()=>{
    const res=client.get();
    this.setState({User:(await res).data})
  
}
  formSubmit=(events)=>{
    events.preventDefault();       
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


validate=(errors)=>{
let valid = true;
Object.values(errors).forEach((val)=> 
    val.length>0 && (valid = false));
    return valid;
    }

        
    render() {
        {
             console.log(this.values)}
        const {errors}=this.state;
    
        return (
            <>
          <div className="container">
              
                <div className="container-fluid" style={{marginTop:"20px"}}> 
             
                <form onSubmit={this.formSubmit} style={{background:"#F4F6F7", border:"2px solid grey",padding:"20px" ,marginBottom:'20px'}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC1ueC3iCmaW5la1MI4pF2AY2Yp20Utb6bwQ&usqp=CAU" class="img-fluid rounded-circle " width="150px" height="150px"/>
                    <h4>Sign Up</h4>
                <div className="row">
                 <div className="col-lg-2 form-group">
                 <label >First Name:</label>
                        </div>
                        <div className="col-lg-4 form-group" >
                        <input type="text"  name="fname"  className="form-control"  placeholder="Enter First Name"  required onChange={this.handler}/><br />
                        {errors.fname.length>0 &&
                            <span style={{color:"red"}}>{errors.fname}</span>}   
                        </div>
                        <div className="col-lg-2 form-group">
                 <label > Last Name:</label>
                        </div>
                        <div className="col-lg-4 form-group" >
                        <input type="text"  name="lname"  className="form-control"  placeholder="Enter Last Name" required onChange={this.handler}/><br />
                        {errors.lname.length>0 &&
                            <span style={{color:"red"}}>{errors.lname}</span>}   
                        </div>
                    </div>
              
                    <div className="row">
                 <div className="col-lg-2 form-group">
                 <label >Email:</label>
                        </div>
                        <div className="col-lg-4 form-group" >
                        <input type="text"  name="email"  className="form-control"  placeholder="Enter Email" required onChange={this.handler}/><br />
                        {errors.email.length>0 &&
                            <span style={{color:"red"}}>{errors.email}</span>}   
                        </div>
                        <div className="col-lg-2 form-group">
                 <label > Username:</label>
                        </div>
                        <div className="col-lg-4 form-group" >
                        <input type="text"  name="username"  className="form-control"   placeholder="Enter Username" required onChange={this.handler}/><br />
                        {errors.username.length>0 &&
                            <span style={{color:"red"}}>{errors.username}</span>}   
                        </div>
                    </div>
                    
                <div className="row">
                 <div className="col-lg-2 form-group">
                 <label >Password:</label>
                        </div>
                        <div className="col-lg-4 form-group" >
                        <input type="password"  name="pass"  className="form-control"  placeholder="Password" required onChange={this.handler}/><br />
                        {errors.pass.length>0 &&
                            <span style={{color:"red"}}>{errors.pass}</span>}   
                        </div>
                        <div className="col-lg-2 form-group">
                 <label > Confirm <br/>Password:</label>
                        </div>
                        <div className="col-lg-4 form-group" >
                        <input type="password"  name="cpass"  className="form-control"  placeholder="Password" required onChange={this.handler}/><br />
                        {errors.cpass.length>0 &&
                            <span style={{color:"red"}}>{errors.cpass}</span>}   
                        </div>
                    </div>
             
                <div className="form-group row">
                    <div className="col-sm-10 "  style={{marginLeft:'130px'}}>
                    <button type="submit" className="btn btn-success" style={{ width:"200px"}}>Submit Application Form</button>
                    {
                            this.state.register==1 && <Redirect to='/login'/>
                        }
     <button type="reset" className="btn btn-success"  style={{margin:"30px", width:"200px"}}>Reset</button>
                    </div>
                    <p style={{marginLeft:'400px'}}> already have an account? Login Here</p>
                    <Button
                    component={Link} to='/login'
                         exact activeClassName="active"
                         type="submit"
                        fullWidth
                       
                         sx={{ mt: 1, mb: 2 }}
                     >
                        Sign In
                     </Button>
                   
                 
                </div>  
                </form>
                </div>
                </div>
                  </>
        )
    }
}

export default Register;

 