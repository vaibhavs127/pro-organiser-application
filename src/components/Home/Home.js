import React,{Component} from 'react';
import axios from 'axios';
import{
    NavLink}
from 'react-router-dom';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            empty:false,
            result:[],
            nameOfBoard:[],
            isloading:true
         }
    }
        componentDidMount(){
            this.setState({
                isloading:false
            })
            axios.get(`https://pro-organiser-2eb3c.firebaseio.com/Board.json`)
            .then(db =>{

                if(db.data === null){
                    this.setState({
                        empty:true
                    })
                }
                else{
             console.log("data::" +db.data)
             const res = db.data;
             
        
             let board= Object.values(res);
             console.log(board)
             for(let i = 0;i<board.length;i++){
                 const BName = board[i].Name;
                 console.log("bname:"+BName);
                    this.setState({
                        nameOfBoard:board,
                     })
                    }
                }
            })          
    } 
   
    render() { 
        const BtnName={
                textDecoration: "none",
                display: "inline-block",
                padding: "50px 120px",
                fontSize: "16px",
                border: "2 px solid black",
                margin: "2px 2px",
                cursor: "pointer",
                boxShadow: "5px 10px 18px #888888"    
            }
            const LiStyle={
                listStyle: "none"
            }
            const Grid={
                    display: "grid",
                    gridTemplateColumns: "370px 370px 370px",
                    overflowX: "hidden"
                }
        let Array_Board = this.state.nameOfBoard.map((boardV,index)=>{

            const {Name}  = boardV
                return(
                <li style={LiStyle}><NavLink to={`/${index}`}><button key={index} style={BtnName}>{Name}</button></NavLink></li>
                )
        })
        return ( 

            
            <div>
                <h1 style={{marginLeft:"50px"}}>Boards</h1>
                {
                    (this.state.isloading)
                    ?
                    <h1>Loading...</h1>
                    :
                (this.state.empty)
                ?
                <h1>You haven't created any boards. Kindly click on the 'Create Board' button in the navigation bar to create a board.</h1>
                :
                <ul style={Grid}>{Array_Board}</ul>
            }
                
            </div>
         );
    }
}
 
export default Home;