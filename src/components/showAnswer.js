import React from 'react'
import axios from 'axios';

export default class ShowAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    sendData = () => {
        this.props.showQuestions(true)
    }
    render() {
        return (
            <div>
                <div className="container">
                    {this.props.answer}
                    {this.props.user}
                
                    {this.props.recent}
                </div>
            </div>
        )
    }
}