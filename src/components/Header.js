import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link} from 'react-router-dom'

  class Header extends Component{
      constructor(){
          super();
          this.state = {
            user:null,
            userEmail:null
            
          }
      }


      componentDidMount(){
        var userId = firebase.auth().currentUser.uid;
        var userEmail = firebase.auth().currentUser.email
        
        this.setState({user:userId,userEmail:userEmail})
      }
     


  render(){
    
    return (
    
    
    <div>
    
      <div id='div1'> 
      Sohail Electronics
      </div>

      <div id='div2'>
     
     
     <Link to='/' style={{textDecoration:'none', marginRight:'22px'}} > Bill Entry </Link>
     <Link to='/GetReport' style={{textDecoration:'none', marginRight:'22px'}} > Get Bill </Link>
     <Link to='/Define' style={{textDecoration:'none', marginRight:'22px'}} > Admin </Link>
     
      </div>
      
    </div>
  );
}
}

export default Header;
