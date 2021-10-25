import logo from './logo.svg';
import './App.css';
import {BrowserRouter, BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Registration from './components/Registration';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import TodoFormDemo from './components/TodoFormDemo';
import Register from './components/Register';

function App() {

  return (
    <div className="App">
       <Router>
       
           
             
                 <Switch > 
                 <Route path="/" exact component={Login} />
                      <Route path="/login" exact component={Login} />
                      <Route path="/dashboard" exact component={Dashboard} />
                      <Route path="/todoform" exact component={TodoFormDemo} />
                      <Route path="/register" exact component={Register} />
                    

                   
                     
        
                </Switch> 
                
          
        
         </Router>
 
    
    
    </div>
  );
}

export default App;

