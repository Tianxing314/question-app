import React, { Component } from "react";
import axios from 'axios';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {submitCount:0, 
                  selectedAns:null
                 }

    this.onAnsChange = this.onAnsChange.bind(this);
    this.onAnsSubmit = this.onAnsSubmit.bind(this);
    this.getNewQuestion = this.getNewQuestion.bind(this);
  }

  onAnsChange = (event) => {
    this.setState({
      selectedAns:event.target.value
    });
  }

  onAnsSubmit = (event) => {
    event.preventDefault();
    if (this.state.submitCount === 5) {
        alert("No more chance!");
        return;
    }
    let correctAns = this.props.currentQuestion.answer
    this.setState( prevState => ({ submitCount: prevState.submitCount + 1}));
    console.log(this.state.selectedAns);
    console.log(correctAns);
    if (this.state.selectedAns == correctAns) {
      alert("Correct!");
      this.state.setState({
        submitCount:0,
        selectedAns:null
      });

    } else {
      if (this.state.submitCount === 5) {
        alert("Incorrect! No more chance!");
      } else {
        alert("Incorrect! " + (4-this.state.submitCount) + " chance(s) left!");
        this.getNewQuestion();

      }
    }
  }
  
  getNewQuestion() {
    axios({
            method:"get", url:"http://localhost:5000/question"
            }).then(res => {
              console.log(res);
              console.log(res.data)
              this.props.getQuestion(res.data);
            }).catch(Error => {
              //handle Error for get question request
              console.log(Error);
            });
  }

  render() {

    let questionToShow = this.props.currentQuestion;
    
    return (
      <div>
        <h2>Question</h2>
 
        <p>This is question page</p>
        {questionToShow !== null && (
            <form onSubmit={this.onAnsSubmit}>
                  <div className="question">
                   Question: {questionToShow.expression}
                  </div>
                  <input type="radio" id="ans0" name="ans" value={questionToShow.options[0]} onChange={this.onAnsChange}/>
                  <label for="ans0">{questionToShow.options[0]}</label><br/>
                  <input type="radio" id="ans1" name="ans" value={questionToShow.options[1]} onChange={this.onAnsChange}/>
                  <label for="ans1">{questionToShow.options[1]}</label><br/>
                  <input type="radio" id="ans2" name="ans" value={questionToShow.options[2]} onChange={this.onAnsChange}/>
                  <label for="ans2">{questionToShow.options[2]}</label><br/>
                  <input type="radio" id="ans03" name="ans" value={questionToShow.options[3]} onChange={this.onAnsChange}/>
                  <label for="ans3">{questionToShow.options[3]}</label><br/>
                  <input type="submit" value="Submit"/>
             </form>
        )}

      </div>
    );
  }
}
 
export default Question;