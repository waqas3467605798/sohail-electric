import react, {Component , useRef} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link, Route, BrowserRouter} from 'react-router-dom'
import {useReactToPrint} from 'react-to-print'






  class GetReportCompo extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              billsArray:[],
              displayBillObj:{itemArray:[], grandTotal:[]},

              loadCustomerList:false,
              showReport:false,
              
              noRecordFound:''
      }

  }


  async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    this.setState({user:userId,userEmail:userEmail})

      var list = []

    firebase.database().ref('bills').on('child_added' , (data)=> { 
      list.push(data.val())
    }  )


    res(list)
    rej('Some thing went wrong')
  } )
  dataPushPromise.then((billsObj)=>{
  
    this.setState({billsArray:billsObj})
  
  
  }
  ,
  (err)=>{
    alert(err)
  }
  )
  
  }

  // refreshList=()=>{
  //   this.setState({refreshList: !this.state.refreshList})
  // }

  
  getBill=()=>{



this.setState({showReport:true})
    var billNumber = document.getElementById('billNumber').value
    var reqObjPromise = new Promise( (res,rej)=>{
      var ourObj = this.state.billsArray.find((obj)=>{return obj.billNumber === Number(billNumber)})
    
    res(ourObj)
    } )

    
    reqObjPromise.then((reqObj)=>{

if(reqObj){

      this.setState({displayBillObj:reqObj})
      // console.log(reqObj)

}else{
  // alert('Report Not Found')
  this.setState({displayBillObj:{itemArray:[], grandTotal:[]}, showReport:false, noRecordFound:'No Record Found'})
}



    })

  }


    render(){

        return(
          <div>
          <div className={navigator.onLine===true ? '' : 'display'}>



        {/* <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span> */}
<br/> <br/>

          {/* Div of to getting Customer Report */}
          <div className='container'>
          <span style={{fontSize:'14px',color:'blue'}}>Enter Report Number</span><br/>
          <input type='Number' id='billNumber' placeholder='Enter Bill Number Here'/> <br/>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.getBill}>Get Bill</button>  
          
<br/><br/>
          {/* report display div */}
          <div className={this.state.showReport===false?'display':''} style={{border:'1px solid red', padding:'15px', borderRadius:'10px'}}>
          <p id='billHeader'>
         <span className='billSpan' id='billToSpan'>Bill To; <br/><b>{this.state.displayBillObj.billTo}</b></span> <span className='billSpan' id='billSpan'>Invoice # <br/> Date:</span> <span className='billSpan' id='billNumbSpan'>{this.state.displayBillObj.billNumber} <br/> {this.state.displayBillObj.date}</span> <br/>
         </p>
          {this.state.displayBillObj.itemArray.map((item,ind)=>{return <p key={ind}><span>{ind+1}- </span><span className='billSpan' id='itemSpan'> {item.itemName}</span><span className='billSpan' id='qtySpan'>{item.qty}</span><span className='billSpan' id='rateSpan'>{item.rate}</span><span className='billSpan' id='totalAmountSpan'><b>{item.totalAmount}</b></span><hr/></p>})}

          <p>Total Bill Amount: <b>Rs. {this.state.displayBillObj.grandTotal.reduce( (total,num)=>{return total+num},0)}</b></p>




          </div>
          <span className={this.state.showReport===false?'display':''} style={{fontSize:'10px'}}>
            Note:<br/>
            1-This is computer generated Bill, no need any signature.<br/>
            </span>
          

{/* in case record not found */}
        <div className={this.state.showReport===false ?'' : 'display'}>
        <span style={{color:'red', fontSize:'22px'}}><b>{this.state.noRecordFound}</b></span>
        </div>






          </div>



          </div>


          {/* in case, internet is offline */}
          <div className={navigator.onLine===true ? 'display' : 'container'}>
          <span style={{fontSize:'20px', color:'red'}}>Some thing went wrong.... <br/>
          Please check your internet connection</span>
          </div>



          </div>
        )
    }


  }




  class CustomerList extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              customerReports:[],
              loadCustomerList:false,
              refreshList:false,
              displayReportObject:{patientReport:[]}
      }

  }


  async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    // var userId = firebase.auth().currentUser.uid;
    // var userEmail = firebase.auth().currentUser.email
    // this.setState({user:userId,userEmail:userEmail})

      var list = []

    firebase.database().ref('customerReports').on('child_added' , (data)=> { 
      list.push(data.val())
    }  )


    res(list)
    rej('Some thing went wrong')
  } )
  dataPushPromise.then((customerObj)=>{
  
    this.setState({customerReports:customerObj})
  


    setTimeout(
      ()=>{
        this.setState({loadCustomerList:true})
      } , 1500
    )
  

  
  }
  ,
  (err)=>{
    alert(err)
  }
  )
  
  }

  refreshList=()=>{
    this.setState({refreshList: !this.state.refreshList})
  }

  
  // getReport=()=>{
  //   var reportNo = document.getElementById('repNo').value
  
  //   var reqObjPromise = new Promise( (res,rej)=>{
  //     var ourObj = this.state.customerReports.find((obj)=>{return obj.reportNumber === Number(reportNo)})
    
  //   res(ourObj)
  //   } )

    
  //   reqObjPromise.then((reqObj)=>{

  //     this.setState({displayReportObject:reqObj})
  //     // console.log(reqObj)
  //   })

    
  // }

  deleteReport = (keyToDelete)=>{
var confirmation = prompt("Enter 'Y' to confirm ")
if(confirmation === 'Y'){

firebase.database().ref('customerReports').child(keyToDelete).remove()
var updateArray = this.state.customerReports.filter(  (obj)=>{return obj.key != keyToDelete}  )
this.setState({customerReports:updateArray})
alert('deleted successfully')
}
else{
  alert('You have entered wrong key')
}
}


    render(){

        return(
          <div>
       
<br/><br/><br/>

          {/* Div of List of all customer Reports */}
          <div className={this.state.loadCustomerList===false?'display' : 'container'}>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.refreshList}>Show List</button>  <span style={{color:'red'}}>Last 500-Customers</span>
        {/* <table className='browser-default'><thead><tr style={{backgroundColor:'lightyellow'}}><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Contact</th></tr></thead><tbody>{this.state.customerReports.sort((a, b) => (a.reportNumber < b.reportNumber) ? 1 : -1).map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.patientReport.map((item,index)=>{return <span key={index}>{item.testNam} , </span>})}</td></tr>}).slice(0,500)}</tbody></table> */}
        {/* <table className='browser-default'><thead><tr style={{backgroundColor:'lightyellow'}}><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Contact</th></tr></thead><tbody>{this.state.customerReports.sort((a, b) => (a.reportNumber < b.reportNumber) ? 1 : -1).map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.contact}</td><td><a href='#' className="material-icons" style={{color:'red',fontSize:'15px'}} onClick={()=> this.deleteReport(it.key)}>delete</a></td></tr>}).slice(0,500)}</tbody></table> */}
        <table className='browser-default'><thead><tr style={{backgroundColor:'lightyellow'}}><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Contact</th><th>Delete</th></tr></thead><tbody>{this.state.customerReports.reverse().map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.contact}</td><td><a href='#' className="material-icons" style={{color:'red',fontSize:'15px'}} onClick={()=> this.deleteReport(it.key)}>delete</a></td></tr>}).slice(0,500)}</tbody></table>
        </div>

          <div className={this.state.loadCustomerList===false?'container' : 'display'}>
          <span style={{fontSize:'20px', color:'red'}}>loading ..... <br/> Please Wait</span>
           </div>

          </div>
        )
    }


  }



const GetReport = ()=>{

const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: ()=>componentRef.current,
})

  return(
    <div>
    <GetReportCompo ref={componentRef}/>
    <div style={{textAlign:'center'}}><button style={{padding:'5px',fontSize:'14px',borderRadius:'4px', color:'black', backgroundColor:'lightgreen'}} onClick={handlePrint}>Print Report</button></div>
    <br/><br/><br/><br/>
    <CustomerList />


    
    </div>
  )
}



export default GetReport;





  