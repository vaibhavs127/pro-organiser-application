import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../BackDrop/BackDrop';
import firebase from '../../Firebase/firebase';
import '../AddCard/ModalCard.css';
import { AiOutlineClose } from "react-icons/ai";


let card_data;
class ModalCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:'',
            description:'',
            due_date:'',
            mem:[],
            members:this.props.members
         }
    }

    Onsubmit = () =>{
        let ModalData = card_data.push()
        ModalData.set({
            title:this.state.title,
            mem:this.state.mem,
            description:this.state.description,
            due_date:this.state.due_date
        })
    }

    handleChangeT = (event)=>{
        event.preventDefault();
        this.setState({
            title:event.target.value
        })
        
    }
    

    handleChangeD = (event)=>{
        event.preventDefault();
        this.setState({
            description:event.target.value
        })
        
    }




    handleChangeDate = (event)=>{
        event.preventDefault();
        this.setState({
            due_date:event.target.value
        })
        
    }

    handleChangeOptions = (event) =>{
        let newVal = event.target.value
        let stateVal = this.state.mem
        stateVal.indexOf(newVal) === -1
      ? stateVal.push(newVal)
      : stateVal.length === 1
        ? (stateVal = [])
        : stateVal.splice(stateVal.indexOf(newVal), 1)

    this.setState({ mem: stateVal })
    }
    
    render() { 
        if(!this.props.display) {
            return null;
          }
         
                    
       card_data = firebase.database().ref(`${this.props.id}/Cards/${this.props.colID}`);
        return ( 
            <div>
                        {this.props.children} 
                <Backdrop/>

                <div style={{height: '550px', textAlign: 'center', position: 'fixed', backgroundColor: '#fff', zIndex: 500, left: '15%', top: '10%', boxSizing: 'border-box', width: '70%'}}>
                
                <h1 className="addcard">Add Card</h1>
                <form >
                    <table className="form" style={{width:'100%'}}>
                    <tr>
                    <th style={{textAlign:"left", whiteSpace:'nowrap'}}>
                   <h2> Enter a title for your task</h2>
                    </th>

                    <td style={{textAlign:"left", whiteSpace:'nowrap'}}>
                    <input type="text" value={this.state.title} id="title" placeholder="e.g. Add a new icon" onChange={this.handleChangeT}/>
                    </td>
                    </tr>

                    <tr>
                    <th style={{textAlign:"left",whiteSpace:'nowrap'}}>
                    <h2>Choose members for this task (select multiple, if needed)</h2>
                    </th>

                    <th style={{textAlign:"left",whiteSpace:'nowrap'}}>
                    <select multiple={true} onChange={this.handleChangeOptions} value={this.state.mem}>{this.props.members.map((x,y) => <option key={y} value={x}>{x}</option>)}</select>
                    </th>
                   </tr>

                    <tr>
                    <th style={{textAlign:"left"}}>
                    <h2>Add the description for your task</h2>
                    </th>

                    <th style={{textAlign:"left"}}>
                    <input type="text" value={this.state.description} id="description" placeholder="Add your description here" onChange={this.handleChangeD}/>
                    </th>
                    </tr>

                    <tr>
                    <th style={{textAlign:"left"}}>
                    <h2>Select the due date for this task</h2>
                    </th>

                    <th style={{textAlign:"left"}}>
                    <input type="date" value={this.state.due_date} id="due_date" onChange={this.handleChangeDate}/>
                    </th>
                    </tr>

                    <tr>
                        <th>
                    <button className="btnClose" onClick={this.props.onClose}>
                    <AiOutlineClose />
                    </button>
                </th>

                <th style={{textAlign:"left"}}>
                <button id="CreateCard" className="cardbtn" onClick={this.Onsubmit}>Add</button>
                </th>
                </tr>
                </table>
                </form>
                </div>
                </div>
        
         );
    }
}
 
ModalCard.propTypes = {
    display: PropTypes.bool,
    children: PropTypes.node
  }
export default ModalCard;