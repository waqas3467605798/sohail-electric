import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link, Route, BrowserRouter} from 'react-router-dom'




  class DataEntry extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              reportNumber:null
              

      }

  }



async componentDidMount(){

  var dataPushPromise = new Promise( (res,rej)=>{
  // var userId = firebase.auth().currentUser.uid;
  // var userEmail = firebase.auth().currentUser.email
  // this.setState({user:userId,userEmail:userEmail})



  // firebase.database().ref('reportNumber').on('child_added' , (data)=> {
  //   this.setState({reportNumber:data.val()})
  // }  )

  

var testObjs = [];

  // firebase.database().ref('mainTestNameList').on('child_added' , (data)=> { 
  //   testObjs.push(data.val())
  // }  )


  res(testObjs)
  rej('Some thing went wrong')
} )
dataPushPromise.then((testObj)=>{




}
,
(err)=>{
  alert(err)
}
)

}




changeHandler=(e)=>{
  this.setState({[e.target.name]: e.target.value  })
  
  
  }




generateBill = ()=>{

// var testReportNumber = this.state.reportNumber + 1

// reportObj.reportNumber = testReportNumber

// firebase.database().ref('reportNumber').child('reportNumber').set(testReportNumber)
// console.log(reportObj)
}



    render(){
        return(
          <div>
          
          
          <div className='container'>
           
          THis is CONTENT
          </div>




          </div>
        )
    }


  }

export default DataEntry;








