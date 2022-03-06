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
              billNumber:null,
              date:'',
              billTo:'',
              itemName:'',
              qty:'',
              rate:'',
              itemObject:[],
              grandTotalObject:[]

              

      }

  }



async componentDidMount(){

  var dataPushPromise = new Promise( (res,rej)=>{
  // var userId = firebase.auth().currentUser.uid;
  // var userEmail = firebase.auth().currentUser.email
  // this.setState({user:userId,userEmail:userEmail})



  firebase.database().ref('billNumber').on('child_added' , (data)=> {
    this.setState({billNumber:data.val()})
  }  )

  

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



addItem=()=>{
var itemObj = {}
itemObj.itemName = this.state.itemName;
itemObj.qty = this.state.qty;
itemObj.rate = this.state.rate;
itemObj.totalAmount = this.state.qty*this.state.rate

this.state.itemObject.push(itemObj)
this.state.grandTotalObject.push(this.state.qty*this.state.rate)
console.log(this.state.itemObject)

    this.setState({itemName:'',qty:'', rate:''})
  }





generateBill = ()=>{

var billObj = {};
 billObj.date = this.state.date;
 billObj.billTo= this.state.billTo;
 billObj.itemArray = this.state.itemObject;
 billObj.grandTotal = this.state.grandTotalObject;


var billNumber = this.state.billNumber+1;
billObj.billNumber = billNumber;




 var key = firebase.database().ref('bills').push().key
 billObj.key = key;
       
 firebase.database().ref('bills').child(key).set(billObj)


// var testReportNumber = this.state.reportNumber + 1

// reportObj.reportNumber = testReportNumber

// firebase.database().ref('reportNumber').child('reportNumber').set(testReportNumber)
// console.log(reportObj)
alert('Bill Successfully Generated')


this.setState({date:'', billTo:'', itemObject:[], grandTotalObject:[]})
firebase.database().ref('billNumber').child('billNumber').set(billNumber)
}







    render(){
        return(
          <div>
          <br/><br/>
          
          <div className='container'>
          <h5 style={{color:'blue'}}>Bill Data Entry</h5> <br/>
          <input type='text' name='date' value={this.state.date} onChange={this.changeHandler} maxLength='11' placeholder='Date'/> <br/> 
          <input type='text' name='billTo' value={this.state.billTo} onChange={this.changeHandler} placeholder='Bill To'/> 
           


          <br/><br/>
          <input id='item_input' name='itemName' value={this.state.itemName} onChange={this.changeHandler} className='browser-default listedInput' type='text' placeholder='Item Name'/> 
          <input id='qty_input' name='qty' value={this.state.qty} onChange={this.changeHandler} className='browser-default listedInput' type='Number' placeholder='Qty'/> 
          <input id='rate_input' name='rate' value={this.state.rate} onChange={this.changeHandler} className='browser-default listedInput' type='Number' placeholder='Rate'/> 
          <button onClick={this.addItem}>Add</button> <br/> <br/>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.generateBill}> Generate Bill </button> <br/>

<br/><br/>
          <table id='tableView'><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead><tbody>{this.state.itemObject.map((item,ind)=>{return <tr key={ind}><td>{item.itemName}</td><td>{item.qty}</td><td>{item.rate}</td><td>{item.totalAmount}</td></tr> })}</tbody></table>
          <span style={{fontSize:'12px'}}>Total Bill Amount: <b style={{color:'blue'}}>Rs. {this.state.grandTotalObject.reduce( (total,num)=>{return total+num},0)}</b> </span>
          </div>




          </div>
        )
    }


  }

export default DataEntry;








