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
              advPayment:'',
              itemObject:[],
              grandTotalObject:[],
              entrySaved:'',
              color:'',
              itemTableView:false,
              loadingFromFirebase:1,
              netConnection:false

              

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



setTimeout(()=>{
  this.setState({loadingFromFirebase:0})

setTimeout(()=>{
  firebase.database().ref('loadingDefaultValue').on('child_added' , (data)=> {
    this.setState({loadingFromFirebase:data.val()})
  }  )
},1000)


},200)






}








changeHandler=(e)=>{
  this.setState({[e.target.name]: e.target.value  })
  
  
  }



addItem=()=>{
this.setState({itemTableView:true})

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

  if(this.state.itemObject.length===0){
    alert('One item should must be added')
  }else{


//  var saleStatus = document.getElementsByName('status').checked   
if(document.getElementById('saleStatus2').checked){
  var saleStatus = 'Credit'
}else{
  var saleStatus = 'Cash'
}



if(this.state.advPayment===''){
  var advPayment = 0
}else{
  var advPayment = this.state.advPayment
}




var billObj = {};
 billObj.date = this.state.date;
 billObj.billTo= this.state.billTo;
 billObj.itemArray = this.state.itemObject;
 billObj.grandTotal = this.state.grandTotalObject;
 billObj.advPayment= advPayment;
 billObj.saleStatus = saleStatus;
 billObj.creditRcvd = 0;

var billNumber = this.state.billNumber+1;
billObj.billNumber = billNumber;




 var key = firebase.database().ref('bills').push().key
 billObj.key = key;
       
 firebase.database().ref('bills').child(key).set(billObj)



this.setState({entrySaved: 'Entry Saved'})


this.setState({date:'', billTo:'', itemObject:[], grandTotalObject:[], advPayment:'',billNumber:billNumber})
firebase.database().ref('billNumber').child('billNumber').set(billNumber)

this.setState({itemTableView:false})



setTimeout(() => {
  this.setState({color:'gray'})



setTimeout(()=>{
  this.setState({color:'lightgray'})

setTimeout(()=>{
  this.setState({entrySaved:'',color:''})
},1000)

},1000)


}, 1000);


}
}







    render(){
        return(
          <div>
          <br/><br/>
          <div className={navigator.onLine===true ? '' : 'display'}>
          <div className={this.state.loadingFromFirebase===0?'display':'container'}>
          <h5 style={{color:'blue'}}>Bill Data Entry</h5> <br/>
          <label style={{color:'black',fontSize:'16px'}}>Date: </label><input type='text' name='date' value={this.state.date} onChange={this.changeHandler} maxLength='11' placeholder='Date'/> <br/> 
          <label style={{color:'black',fontSize:'16px'}}>Customer: </label><input type='text' name='billTo' value={this.state.billTo} onChange={this.changeHandler} placeholder='Customer Name'/> 
           <br/><br/>
           <label style={{color:'black',fontSize:'16px'}}>Advance</label><input id='adv_input' name='advPayment' value={this.state.advPayment} onChange={this.changeHandler} className='browser-default listedInput' type='Number' placeholder='Advance Received (Rs.)'/> 
            

<br/><br/>
            <div style={{width:'20%', textAlign:'center',marginLeft:'100px'}}>
      <label>
        <input id='saleStatus' name="status" value='Cash' type="radio" />
        <span style={{color:'black'}}>Cash</span>
      </label>
    <br/>
    
      <label>
        <input id='saleStatus2' name="status" value='Credit' type="radio" />
        <span style={{color:'black'}}>Credit</span>
      </label>
    </div>


    <br/><br/>
          <span style={{fontSize:'16px'}}>Item Description:</span><br/>
          <input id='item_input' name='itemName' value={this.state.itemName} onChange={this.changeHandler} className='browser-default listedInput' type='text' placeholder='Item Name'/> 
          <input id='qty_input' name='qty' value={this.state.qty} onChange={this.changeHandler} className='browser-default listedInput' type='Number' placeholder='Qty'/> 
          <input id='rate_input' name='rate' value={this.state.rate} onChange={this.changeHandler} className='browser-default listedInput' type='Number' placeholder='Rate'/> 
          <button onClick={this.addItem} style={{backgroundColor:'pink', borderRadius:'8px', padding:'3px'}}>Add</button> <br/> <br/>
          
          
          <div className={this.state.itemTableView===false?'display' : ''}>
          <table id='tableView'><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead><tbody>{this.state.itemObject.map((item,ind)=>{return <tr key={ind}><td>{item.itemName}</td><td>{item.qty}</td><td>{item.rate}</td><td>{item.totalAmount}</td></tr> })}</tbody></table>
          <span style={{fontSize:'12px'}}>Total Bill Amount: <b style={{color:'blue'}}>Rs. {this.state.grandTotalObject.reduce( (total,num)=>{return total+num},0)}</b> </span>
          </div>
          
          
          <br/><br/>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.generateBill}> Generate Bill </button> <br/>
          <span style={{fontSize:'20px', color:this.state.color}}><b>{this.state.entrySaved}</b></span>
<br/><br/>
          
          
          </div>
          </div>




<div className={this.state.loadingFromFirebase===0?'container':'display'}>
  <span style={{color:'green',fontSize:'25px'}}>Loading.....</span>
</div>





<div className={navigator.onLine===true ? 'display' : 'container'}>
          <span style={{fontSize:'20px', color:'red'}}>Some thing went wrong.... <br/>
          Please check your internet connection</span>
          </div>




          </div>
        )
    }


  }

export default DataEntry;








