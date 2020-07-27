import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    
    render() { 
        const Navbar={
            listStyleType: "none",
            margin: 0,
            padding: 0,
            overflow: "hidden",
            backgroundColor:"rgba(47, 105, 170, 0.863)"
        }
        const NavHead=
        {
            display: "block",
            color: "white",
            textAlign: "center",
            padding: "12px 14px",
            fontSize: "25px",
            float: "left",
            textDecoration: "none",
            fontWeight: "lighter"
        }
        const Navlink=
        {
            display: "block",
            color: "white",
            textAlign: "center",
            padding: "12px 14px",
            fontSize: "25px",
            float: "right",
            textDecoration: "none",
            marginTop: "20px",
            marginLeft: "5px"
        }
        return ( 
            
            <div style={Navbar}>
                <h2 style={NavHead}>Pro-Organizer</h2>
                <NavLink style={Navlink} to="/createboard">Create a board</NavLink>
                <NavLink style={Navlink} to="/">Home</NavLink> 
             </div>
         );
         
    }
}
 
export default NavBar;



