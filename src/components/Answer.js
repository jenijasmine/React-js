import React, { Component } from 'react';
import axios from 'axios'

import ShowAnswer from './showAnswer'
import '../styles.css'

import profile from '../profilePic2.jpg';
import Question from './Question';

export default class Answer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            answers: [],
            users: [],
            answerFlag: true,
            backFlag: false
        }
    }
    getUsers = (aid) => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                console.log(aid);
                const data = JSON.parse(JSON.stringify(response.data));
                console.log('data ', data)
                this.setState({
                    users: data.filter(data => data.user_id === aid)
                });
            })
    }
    getRecent = (rid) => {
        axios.get('http://localhost:3000/answers')
            .then(response => {
                console.log(rid);
                const data = JSON.parse(JSON.stringify(response.data));
                console.log('data', data)
                this.setState({
                    answers: data.filter(data => data.user_id === rid)
                });
            })
    }

    sendData = () => {
        this.props.disableSearch(true)
    }

    back = () => {
        this.setState({
            backFlag: true
        })
    }

    render() {
        if (this.state.backFlag === true) {
            return <Question />
        }
        let answerlist = this.props.answer.map(
            p => (
                <div className="card">
                    <div className="row">
                        <div className="column left" >
                            <button className="btn btn-success" onClick={() => { this.getUsers(p.user_id) }}>Check user details</button>
                            <br />
                            Answer:  {p.answer}
                            <div className="column right" >
                                &nbsp;
                         <img src={profile} className="rounded" width="100" />
                            </div>
                        </div>
                        <div className="container">
                        </div>
                        <br></br>
                    </div>
                </div>
            )
        );
        let userlist = this.state.users.map(
            p => (

                <div className="card">
                    <button className="btn btn-success" onClick={() => { this.getRecent(p.user_id) }}>check recent answers given by the user</button>
                    <br />
                    UserId : {p.user_id}<br />
                    User profile: {p.userName}
                </div>
            )
        );
        let recentlist = this.state.answers.map(
            p => (

                <div className="card">
                    <li>{p.answer}</li>
                    
                </div>
            )
        );
        let displayAnswer = (this.state.answerFlag) ? <ShowAnswer answer={answerlist} /> : <div><h1>Answer not found</h1></div>
        let displayUser = <ShowAnswer user={userlist} />
        let displayRecent = <ShowAnswer recent={recentlist} />
        console.log(this.props.answer)
        return (
            <div className="container"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ paddingRight: "155px" }}>
                    <button style={{ float: "right" }} className="btn btn-primary" onClick={this.back}>Back </button>
                </span>
                <br />
                <br />
                {displayAnswer}
                {displayUser}
                {/* <h4>Recent answers given by the user</h4> */}
                {displayRecent}
            </div>
        )
    }
}