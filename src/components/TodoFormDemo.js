import { Button, Container, TextField, Grid, IconButton, Paper, ToggleButton } from '@mui/material'
import Logout from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import React, { Component } from 'react'
import Swal from "sweetalert2"; 
import { Link } from 'react-router-dom';
import NavigationBar from './NavigantionBar';
import './Home.css'
const home = {
    padding: '5px',
    height: '350px',
    width: '760px',
    margin: '30px auto',
    letterSpacing: '1px',
    backgroundColor: 'mintcream'
}
export class TodoFormDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [
                { task: "Task1", priority: "2-Low" ,done:false},
                { task: "Task2", priority: "1-Lowest",done:false },
            ],
            newTask: [
                ''
            ],

            newPriority: [''],
            storageData: [''],
            isloading:true,
        }
    }
   

    // Get Input Value
    updateValue = (event) => {
        this.setState({ newTask: event.target.value });
    };

    //Get priority value
    handlePriority = (event) => {
        this.setState({ newPriority: event.target.value });

    }
    componentWillUpdate(nextProps, nextState){
        let arr = this.state.todo;
        localStorage.setItem('user', JSON.stringify(nextState.arr));
    
    }
    componentWillMount(){
        localStorage.getItem('user') && this.setState({
            todo: JSON.parse(localStorage.getItem('user')),
            isloading:false,
        });
    }

    //Add new task
    add = (event) => {
        event.preventDefault();
     let task2= document.getElementById("task1").value
     console.log(task2)
            if(!task2=="" ){
                let arr = this.state.todo;
        if (localStorage.getItem('user') !== undefined) {
            localStorage.setItem('user', JSON.stringify(arr));
        }
        else{
            localStorage.setItem('user', JSON.stringify(arr));
        }

        this.setState({
            todo: [
                ...this.state.todo,
                { task: this.state.newTask, priority: this.state.newPriority,done:false },

            ],
            newTask: '',
          
        })
        alert("Task added Succesfully")
            } else{
                alert("Fields are empty")
            }
        

       
    };

   
    //Sorting Priority
    sortBy(key) {
        let arrayCopy = [...this.state.todo];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ todo: arrayCopy });
    }
    //Comapring keys in desending order
    compareBy(key) {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }


    componentDidMount(){
        let arr = this.state.todo;
        if (localStorage.getItem('user') !== undefined) {
            localStorage.setItem('user', JSON.stringify(arr));
        }
        else{
            localStorage.setItem('user', JSON.stringify(arr));
        }
      }
      componentDidUpdate(){
        let arr = this.state.todo;
        if (localStorage.getItem('user') !== undefined) {
            localStorage.setItem('user', JSON.stringify(arr));
        }
        else{
            localStorage.setItem('user', JSON.stringify(arr));
        }
      }

    //Delete an exisiting task
    delete = (id) => {
        console.log("delete", id)
        const old = [...this.state.todo]
        const todo = old.filter((element, i) => {
            return i !== id
        })
        this.setState({ todo: todo });
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Once Deleted,You can not recover it',
          
          })
    }

  

        complete=(id)=>{
            var newTodos =[...this.state.todo]
                var todo = newTodos.map((element,i) => {
                    if(i === id){
                        if(newTodos[i]["done"]!==true){
                            newTodos[i]["done"]=true
                            localStorage.setItem("user",JSON.stringify(newTodos))   
                            Swal.fire(
                                'Good job!',
                                'You Have Completed The Task!',
                                'success'
                              )
                            this.setState({todo:newTodos})
                        }
    
                    }
                    return element
                })
          }

    

    render() {
       
        return (
            <>
           <NavigationBar/>
               
                <Container>
                    <Grid>
                        <Paper elevation={6} style={home}>
                            <h3 style={{textAlign:'center',marginTop:'20px'}}>Add Todo</h3>
                            <Grid container style={{ margin: '65px 45px 20px 40px' }} component="form"  >
                                <Grid item xs={7}>
                                <TextField label="Add a new Todo" size="small" name="task" id="task1" variant="outlined" placeholder="Add a new Todo" style={{ width: '400px',backgroundColor:'white' }} onChange={this.updateValue} value={this.state.newTask} required />
                                </Grid>
                                <Grid item xs={4}>
                                <select value={this.state.newPriority} className="form-control "  onChange={this.handlePriority} required>
                        <option>Choose Priority</option>
                        <option value="1-Lowest">1</option>
                        <option value="2-Low">2</option>
                        <option value="3-Average">3</option>
                        <option value="4-High">4</option>
                        <option value="5-Highest">5</option>

                    </select> <br /><br />
                    </Grid>
                    <Button variant="contained" style={{marginLeft:'290px ',width:'100px'}} onClick={this.add} color="primary">Add</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                  
                   
                   
                </Container>

                <Container>

                    <table className=" text-center table mt-5" style={{border:'1px solid grey'}}>
                        <thead>
                            <tr className="bg-info">
                                {/* <th>Sr.No</th> */}
                                <th onClick={() => { this.sortBy('task') }}>Task</th>
                                <th onClick={() => { this.sortBy('priority') }}>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {tableData} */}
                             {this.state.todo.map((item, id) =>
                                <tr key={id}>
                                    {/* <td>{id + 1}</td> */}
                                    <td className={item.done ? 'line-through':''}>{item.task}</td>
                                    <td className={item.done ? 'line-through':''}>{item.priority}</td>
                                    <td>
                                      <ToggleButton onClick={() => { this.delete(id) }} style={{border:'none'}}><CloseIcon style={{color:'red'}}/></ToggleButton>
                                        &nbsp;
                                        <ToggleButton onClick={() => {this.complete(id)}} style={{border:'none'}} ><DoneIcon style={{color:'green'}}/></ToggleButton>
                                    </td>
                                </tr>
                            )} 

                        </tbody>
                    </table>
                </Container>
              

            </>
        )
    }
}

export default TodoFormDemo
