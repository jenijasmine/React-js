import React, { Component } from 'react';
import axios from 'axios';

import '../styles.css'

import Answer from './Answer'
import profile from '../profilePic2.jpg';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            answers: [],
            users: [],
            flag:false,
            myFlag:true 
        }
    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    }
    getPosts = () => {
        axios.get(`http://localhost:3000/posts?q=${this.state.name}`)
            .then(response => {
                console.log(response);
                const data = JSON.parse(JSON.stringify(response.data));
                if(data.length ===0)
                window.alert("Results Not found!!!");
                else{
                this.setState({
                    posts: data.slice()
                });
            }
            })
    }

    componentDidUpdate(){
        console.log(this.state.answers)
    }

    getAnswers = (qid) => {
        axios.get(`http://localhost:3000/answers`)
            .then(response => {
                console.log(qid);
                const data = JSON.parse(JSON.stringify(response.data));
                console.log('data ', data)
                this.setState({
                    answers: data.filter(data => data.ques_id === qid)
                });
            })

        this.setState({
            answerFlag: true
        })
    }
    search = (myFlag) => {

        this.setState({
            flag:false
        })
    }

    render() {
        const mystyle = {
            color: "white",
            backgroundColor: "green",
            padding: "3px",
            fontFamily: "Arial",
            alignText : "center"
            
          };
        let postlist = this.state.posts.map(
            p => (
                <div>
                <div key={p.ques_id} className="card">
                    <div className="container">
                    <div className="row">
                        <div className="column left" > 
                        <button className="btn btn-success" onClick={() => {this.getAnswers(p.ques_id)}}>Check answer</button>
                            <br/>
                            Title: {p.title}
                            <br/>
                            Question: {p.question}  
                        </div> 
                         <div className="column right" >
                             &nbsp;
                         <img src={profile} className="rounded" width="100" />
                        </div>
                    </div>
                    <div className="container">
                    </div>
               </div>      
            </div>
            <br></br>
            </div>
            )
        );
    
         let showPost = (this.state.answerFlag) ? <Answer answer = {this.state.answers}/> : (
           
           
           <div className="container">
            <hr></hr>
            <input type="text" class="form-control" name="name" placeholder="Search Items" value={this.state.name} onChange={this.handleChange}></input>
            &nbsp; &nbsp;
            <br/><br/>

            <button className="btn btn-success" onClick={this.getPosts} disabled={this.state.name === ''}>Search</button>
            <br/><br/><br/>
            <h3 style={mystyle}>QUESTIONS</h3>
            {postlist} 
         </div>
         )
        
        return (
            <div>
           {showPost}
           </div>
        )
    }
}