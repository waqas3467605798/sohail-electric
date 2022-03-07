import react, {Component , useRef} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'
import CustomerAccess from './CustomerAccess'
import App from '../App'
import labImg from './image.jpg'
import instruc from './instruc.png'
import {useReactToPrint} from 'react-to-print'




//This Component is made to show the all App you made
class Login extends Component{
    constructor(){
        super();
        this.state ={
                user:null,
                
        }

    }


    componentDidMount(){
        this.authListener();
        

        }
        


        authListener = ()=>{
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user){
                this.setState({user})
                // console.log(user.email)
        
        
            } else {
                this.setState({user:null})
            }
        })
        }




    render(){
        return(
        <div>

{this.state.user ? (<App/>) : <LoginFormDisplay/>}

        </div>
        )
    }
}

export default Login;





class Headers extends Component{

    render(){
        return(
            <div>
                

                   
            </div>
        )
    }
}





//THis Component is made to login by the user (it is login form)
class LoginFormDisplay extends Component{
   
    constructor(){
        super();
        this.state ={
                forgetStatus:false,
                forgetEmial:'',
                showLoginPage:false,
                login:false


                
        }

    }



componentDidMount(){
       

        



        }








    signin = ()=>{

    this.setState({login:true})

     const email = document.querySelector('#email').value;
     const password = document.querySelector('#password').value;
 
 
 
     firebase.auth().signInWithEmailAndPassword(email, password)
     .then( (u)=>{
 
         // console.log(u.user.uid)
         // console.log(u)
         
     } )
     .catch( (err)=>{
         alert('Your Password is incorrect or you are not registered.')
         this.setState({login:false})
     } )
 
    } 
 
 



    showForgetField = ()=>{
        this.setState({forgetStatus:true})
    }


    changeHandler = (e)=>{
        this.setState({forgetEmial: e.target.value})

        console.log(this.state.forgetEmial)
    }


    ressetPassword = ()=>{

        firebase.auth().sendPasswordResetEmail(this.state.forgetEmial)
        .then(()=>{
            alert('Please check email and reset your password')
        }).catch((error)=>{
            alert(error)
            
        })

    }



showLogin = ()=>{
    this.setState({showLoginPage:true, showCustomerReports:false})
}




     render(){
         return (
             <div>
 
 <div id='div1'> 
                 M Sohail Electric Works
 </div>





<span className='navLinks_loginPage' onClick={this.showLogin}>User-Login</span>

                {/* The Div of User Login is Here */}
             <div className={this.state.showLoginPage===false?'display':'container'}>
             {/* <div className="col s12"> */}

               <div className="input-field">
              <input placeholder="Email" id="email" type="text" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <div className="input-field">
              <input placeholder="Password" id="password" type="password" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <button style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:this.state.login===false?'lightgreen' : 'lightyellow' }} onClick={this.signin}> {this.state.login===false? 'Login' : 'Signing In...'} </button>

                <a href='#' onClick={this.showForgetField}>Forget Password ?</a>

<br/><br/><br/>


                <div className={this.state.forgetStatus === false ? 'display' : ''}>
                <p><b style={{color:'green'}}>Pleae enter your email address in below field on which you want to reset your Password</b></p>
                <input type='text' value={this.state.forgetEmial} name='forgetEmail' onChange={this.changeHandler} placeholder='Write Email here' /><br/>
                <button onClick={this.ressetPassword} style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'lightgreen'}}>Resset</button>
                
                </div>
              {/* </div> */}
              </div>
              


{/* <div className='container' style={{textAlign:'center'}}>
<p style={{border:'1px solid', width:'70%',margin:'auto', borderRadius:'100%', fontSize:'30px'}}>
Mian Sohail Electric Works
</p>
</div> */}






              <div className='bottomLine'> 
        Developed By: Waqas Saleem Contact: 0346-7605798 Email: waqas.mba86@gmail.com
        </div>


             </div>
         )
     }
 }


