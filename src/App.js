import React, { Component } from 'react';
import Question from './components/Question';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mystyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial",
            alignText : "center"
            
          };
        return (
            <div align='center'>
                <h2 style={mystyle}><img src="https://cdn.freebiesupply.com/logos/large/2x/stackoverflow-com-logo-png-transparent.png" alt="" width="50" /> Stack Overflow</h2>
                <Question/>
            </div>
        );
    }
}

export default App;