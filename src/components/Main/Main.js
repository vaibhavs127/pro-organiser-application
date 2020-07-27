import React,{Component} from 'react';
import axios from 'axios';
import Modal from '../AddCard/AddCard';
import firebase from '../../Firebase/firebase';
import 'firebase/firestore';
import { AiFillDelete} from "react-icons/ai";
import Cards from '../Cards/Cards';
import ModalCard from '../AddCard/ModalCard';


class Main extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            ID:this.props.match.params.id,
            CI:'',
            NAME :'',
            MEMBERS:'',
            columndata:[],
            colID:'',
            isempty:false,
            isOpen:false,
            Open:false
         }
         //this.Ondelete = this.Ondelete.bind(this);
         this.ToggleModal = this.ToggleModal.bind(this);
         this.DeleteBoard = this.DeleteBoard.bind(this)

    }

    componentDidMount(){
       
        this.setState({
            CI:this.props.match.params.id
        })
        axios.get(`https://pro-organiser-2eb3c.firebaseio.com/Board.json`)
        .then(TheData=>{
            
            const vdata = TheData.data;
            const newData = Object.values(vdata);
            let members = [];
            members = newData[this.props.match.params.id].NumberOfMembers;
           let newarray =[]
           
            newarray = members.split(",");
        
            this.setState({ 
                NAME:newData[this.props.match.params.id].Name,
                MEMBERS:newarray
            })
            console.log(this.state.NAME);
        })
        axios.get(`https://pro-organiser-2eb3c.firebaseio.com/${this.props.match.params.id}/Columns.json`)
        .then(columnName=>{
           
           
            if(columnName.data === null){
                this.setState({
                    isempty:true
                })
            }
            else
            {
            
            
            let ddd = [];
            let sd  = [];
             ddd = columnName.data;
             sd = Object.values(ddd);            
            const ccname  = []
            sd.forEach(doc =>{
               const data = doc.name
                ccname.push(data)
            })
           
            this.setState({
                columndata:ccname
            })
        }
            })
        

    }
    DeleteBoard = (index) =>{
    
        console.log(index);     
      let data = firebase.database().ref(`Boards/${this.props.match.params.id}s`);
           data.remove();
    
     
}
    ToggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    OpenModal = (i) => {
        this.setState({
            Open: !this.state.Open,
            colID:i
        })
    }

    allowdrop = (ev) =>{
        ev.preventDefault();
    }
    
    drop =(ev) =>{
        let ddd =  ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(ddd));
    }
    render() {
        const plus={
            height: "50px",
            width: "150px",
            backgroundColor:"#e3dfdc",
            border:"1px black solid",
            color: "black",
            borderRadius: "10px",
            fontFamily: "cursive",
            marginLeft: "20px",
            fontWeight: "bold",
            fontSize: "15px",
            cursor:"pointer"
        }
        const wrap={
            marginLeft: "20px",
            display: "grid",
            gridTemplateColumns: "400px 400px 400px",
            gridGap: "10px"
        }
        const columns={
            backgroundColor: "rgb(197, 190, 190)",
            height: "fit-content",
            width: "278px",
            fontFamily: "cursive",
            overflow: "hidden",
            borderRadius: "7px"
        }
        const btnmodal={
            marginLeft: "1px",
            backgroundColor: "#7bfc79",
            width: "99.4%",
            border: "1px black solid",
            padding: "6px",
            textAlign: "center",
            fontSize: "15px",
            borderRadius: "7px",
            cursor:"pointer"
        }
        const btndelete={
            float: "right",
            marginRight: "12px",
            fontSize: "20px",
            marginTop: "-35px",
            backgroundColor: "red",
            padding: "5px"
        }
        let array = []
        array =  this.state.columndata.map((colData,i) => {
       
            return(
                <div className="columns" style={columns}>
                    
                     {colData}
                     <div onDragOver={(event)=>this.allowdrop(event)} onDrop={(event =>this.drop(event))}>
                     <AiFillDelete onClick={() => this.Ondelete(i,colData)}/>
                     <Cards  
                      id={this.state.CI}     
                      colID={i} 
                      ModalBname = {colData}
                      NameOfBoard ={this.state.NAME}
                      />
                     
                     </div>
                        <button className="btnmodal" style={btnmodal} id="CreateCard" onClick={() =>this.OpenModal(i)}>Add a card</button>
                     </div>
                 
            )  
        })
            
           
        
        return ( 
        <div>
            <h1 className="btitle">{this.state.NAME}</h1>

            <div>
                <button className="btndelete" style={btndelete} onClick={() => this.DeleteBoard(this.props.match.params.id)}>Delete Board</button>
            </div>
            
                
                <button onClick={this.ToggleModal} className="plus" style={plus}>
                  Add a column
                 </button>
                <br></br><br></br>
                 
                 {
                     this.state.isempty
                     ?
                     null
                 
                 :
                 <section id="wrap" style={wrap}>
                    
                    {array}
                   
                 </section>
                
                 }
        
                 
            <Modal show={this.state.isOpen} onClose={this.toggleModal}
                   id={this.state.CI}/>
                <ModalCard display={this.state.Open} onClose={this.OpenModal}
                      id={this.state.CI}     
                      colID={this.state.colID}
                      members ={this.state.MEMBERS} />
                
                
                <br></br>
                <br></br>
               
        </div> 
        );
    }
}
 
export default Main;