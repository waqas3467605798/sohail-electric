import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
// import {Link} from 'react-router-dom'


  class Define extends Component{
    constructor(){
      super();
      this.state ={
        user:null,
        userEmail:null,
        
      }

  }



  async componentDidMount(){
    
}


  

    Logout= ()=>{
        firebase.auth().signOut();
    }


    changeHandler=(e)=>{
    this.setState({[e.target.name]: e.target.value  })
    
    
    }
      
    



    render(){
        return(
          
<div>
{/* Logout Div */}
<div className='container' style={{textAlign:'right'}}>
<button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button> 
</div> 
<br/><br/>



</div>


            
            
        )
    }


  }

export default Define;