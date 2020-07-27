import React,{Component} from 'react';
//import { Card} from 'react-simple-card';
import { } from 'react-simple-card';
import '../Cards/Cards.css';
import Modal from 'react-awesome-modal';
import axios from 'axios';


import './Cards.css';
import ModalCard from '../AddCard/ModalCard';



class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members:this.props.members,
            isOpen:false,
            title:[],
            isempty:false,
            Details:[],
             visible : false,
             modalmem:[],
             modaltitle:[],
             modalDesc:[],
             modalDate:[]

          }
    }

    componentDidMount(){
        axios.get(`https://pro-organiser-2eb3c.firebaseio.com/${this.props.id}/Cards/${this.props.colID}.json`)
        .then(cardData =>{
            if(cardData.data === null){
                this.setState({
                    isempty:true
                })
            }
            else{
            let ar = [];
            
             ar = cardData.data;
             let k = Object.values(ar)
            
              console.log("cc::" +k);

             this.setState({
                 Details:k
             })
           
    }
    })
    }
  
    openModal = (index) =>{
        
        axios.get(`https://pro-organiser-2eb3c.firebaseio.com/${this.props.id}/Cards/${this.props.colID}/.json`)
        .then(Data=>{


            let modalData = [];
            
             modalData = Data.data;
             let mdata = Object.values(modalData);
             let title = [];
             let members = [];
             let description = [];
             let date = [];
            members = mdata[index].mem;
            title = mdata[index].title;
            description = mdata[index].description;
            date = mdata[index].due_date;
            console.log("index" + this.props.ModalBname);
            this.setState({
                visible : true,
                modalmem:members,
                modaltitle:title,
                modalDesc:description,
                modalDate:date
            });
             
        })

    
    
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }
   
   drag = (ev) =>{
        ev.dataTransfer.setData("text",ev.target.id)
   }

  Edit =() => (
        <ModalCard/>
  )
   
    render() { 
       let arr = this.state.Details.map((item,i) =>{
           const {title,mem} = item
          
               return(
           
                <div onClick={() => this.openModal(i)} id="cardID" className="card" draggable onDragStart={(event)=>this.drag(event)}>
                    <h4 className="title">{title}</h4>
                    <br></br><br></br>
                    
               {''} {  ' '+ mem +' ' } {''}
                   <br></br>   
                   
                </div>
                    

           )
       })
        return (
            
            <div className="card-container">
    {
      this.state.isempty
      ?
      <div>No tasks added</div>
      :
   <div className="row" >
       <div className="col" >
       {arr}
       </div>
   </div>       
   
    }  
                <Modal 
                 
                    visible={this.state.visible}
                    width="500"
                    height="500"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="poupModal">
                    
                            <button className="btnedit" onClick={this.Edit}>Edit</button>
                            <button className="btnarchive">Archive</button>

                
                        <h1>{this.state.modaltitle}</h1><h5>in {this.props.NameOfBoard}</h5>
                        <hr></hr>
                        Description
                        <h6>{this.state.modalDesc}</h6>
                        Members:
                        <h6>{" " +this.state.modalmem+ " "}</h6>
                        Due Date
                        <h6>{this.state.modalDate || ''}</h6>
                        <button className="popupClose" onClick={() => this.closeModal()}>Close</button>
                    </div>
                
                
                </Modal>
        
                           
                        
            </div>
                                                         
         );
    }
}
 
export default Cards;