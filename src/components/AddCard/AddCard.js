import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import Backdrop from "../BackDrop/BackDrop";
import firebase from '../../Firebase/firebase';
import 'firebase/firestore';
import "../AddCard/AddCard.css";
import { AiOutlineClose } from "react-icons/ai";

  
let data;

class AddCard extends Component {
    
constructor(props){
    super(props)
    this.state = {
       name :''
        
    }
    this.postData = this.postData.bind(this);
   
}


 
 postData = (name) =>{ 
  let newData =  data.push();

  newData.set({
    name:this.state.name
})
    
 }

   handleChangeP = (event)=>{

    this.setState({
        name:event.target.value
    })
}

    render(){
         if(!this.props.show) {
             return null;
           }

           data = firebase.database().ref(`${this.props.id}/Columns`);

          return (
           
        <div>
            {
              console.log(this.props.id)
            }
            <div >
            
                {this.props.children} 
                <Backdrop/>
                    <div className="mform" style={{height: '300px', textAlign: 'center', position: 'fixed', backgroundColor: '#fff', zIndex: 500, left: '15%', top: '10%', boxSizing: 'border-box', width: '70%'}}>
                    <h1 className="adds">Add Column</h1><br></br><br></br>
                    <form className="sform" >
                    <table>   
         
                <tr>
                    <th>
                 Enter a column name:{this.props.name}<br>
                     
              </br>
              </th>

              <td>
                 <input type="text" size="57" id="column_name" value={this.state.name} onChange={this.handleChangeP}/>
                 </td>
                 </tr>
           
           
                <button className="btnclose" onClick={this.props.onClose}>
                <AiOutlineClose />
                </button>

                <button className="btnOpen" id="CreateColumn" onClick={(e) => this.postData()}>
                Add Column
                </button>


                </table>
                </form>


                </div>
                
            </div>
            
        </div>
        )
    }
}

AddCard.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node
  }
export default AddCard;