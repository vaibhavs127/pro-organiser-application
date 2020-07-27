import React,{Component} from 'react';
import '../CreateBoard/CreateBoard.css';
import firebase from '../../Firebase/firebase';

let data;
class CreateBoard  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Name:'',
            NumberOfMembers:'',
            BoardName:''
         }
    }

   
    SaveData = (Name,NumberOfMembers,BoardName) =>{

            let NewData = data.push()
            NewData.set({

                Name:this.state.Name,

                NumberOfMembers:this.state.NumberOfMembers,

                BoardName:this.state.BoardName


            })
    }
   
                
                    HandleName = (event) =>{
                        this.setState({
                            Name:event.target.value
                        })
                    }

                    HandleMembers = (event) =>{
                        this.setState({
                            NumberOfMembers:event.target.value
                        })
                    }

                    HandleBoard = (event) =>{
                        this.setState({
                            BoardName:event.target.value
                        })
                    }
   
    render() { 
        data = firebase.database().ref('/Board');
        return ( 
            <div>
                <h1>Create a Board</h1>
                <form className="FormB">
                    
                    <label>Enter a name for your board </label><br></br>
                    <input id="name" type="text" value={this.state.Name} onChange={this.HandleName} placeholder="e.g. Agile Sprint Board" size="40"/><br></br><br></br>

                    <label>Add your team members </label><br></br>
                    <input id="team" type="text" value={this.state.NumberOfMembers} onChange={this.HandleMembers} placeholder="Add your team (seperated by commas)" size="40"/><br></br><br></br>

                    <label>Enter the type of your board </label><br></br>
                    <input id="type" type="text" value={this.state.BoardName} onChange={this.HandleBoard} placeholder="e.g. Design UX" size="40"/><br></br><br></br>

                    <button onClick={this.SaveData} className="BtnCreate" id="CreateBoard">Create</button>


                </form>
            </div>
         );
    }
}
 
export default CreateBoard;


