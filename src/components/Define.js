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
        // businessName:'',
        // address:'',
        // contact:'',
        // email:'',
        loadingDefaultValue:''
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
      
    
// saveBusinessName=()=>{
//   firebase.database().ref('businessName').set(this.state.businessName)
//   alert('saved successfully')
//   this.setState({businessName:''})
// }
// saveAddress=()=>{
//   firebase.database().ref('address').set(this.state.address)
//   alert('saved successfully')
//   this.setState({address:''})
// }
// saveContact=()=>{
//   firebase.database().ref('contact').set(this.state.contact)
//   alert('saved successfully')
//   this.setState({contact:''})
// }
// saveEmail=()=>{
//   firebase.database().ref('email').set(this.state.email)
//   alert('saved successfully')
//   this.setState({email:''})
// }



saveLoadingDefaultValue=()=>{
firebase.database().ref('loadingDefaultValue').set({defaultValue:this.state.loadingDefaultValue})
}




    render(){
        return(
          
<div>
{/* Logout Div */}
<div className='container' style={{textAlign:'right'}}>
<button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button> 
</div> 
<br/><br/>

<div className='container'>
{/* <p>General Info</p>
<input type='text' name='businessName' value={this.state.businessName} onChange={this.changeHandler} placeholder='Business Name'/> <br/> 
<button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.saveBusinessName}> Save </button> <br/>
<input type='text' name='address' value={this.state.address} onChange={this.changeHandler} placeholder='Address'/> <br/> 
<button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.saveAddress}> Save </button> <br/>
<input type='text' name='contact' value={this.state.contact} onChange={this.changeHandler} placeholder='Contact'/> <br/> 
<button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.saveContact}> Save </button> <br/>
<input type='text' name='email' value={this.state.email} onChange={this.changeHandler} placeholder='Email'/> <br/> 
<button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.saveEmail}> Save </button> <br/> */}


<span>Loading Default Value</span><br/>
<input type='Number' name='loadingDefaultValue' value={this.state.loadingDefaultValue} placeholder='Loading default value' onChange={this.changeHandler}/>
<button onClick={this.saveLoadingDefaultValue}>Save</button>

</div>
</div>

            
            
        )
    }


  }

export default Define;