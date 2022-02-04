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

  //Handle answer selection from radio button input
  onAnsChange = (event) => {
    this.setState({
      selectedAns:event.target.value
    });
  }

  //Handle form submission
  onAnsSubmit = (event) => {
    event.preventDefault();
    if (this.state.submitCount === 5) { // submitCount reaches 5
        alert("No more chance!");
        return;
    }
    let correctAns = this.props.currentQuestion.answer // get correct answer from question
    this.setState( prevState => ({ submitCount: prevState.submitCount + 1})); //increment submitCount

    if (this.state.selectedAns == correctAns) { //Check for correctness
      alert("Correct!");
      this.setState({ //restart: reset state variable
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

  //make GET request to retrieve new question from the server
  getNewQuestion() {
    axios({
            method:"get", url:"http://localhost:5000/question"
            }).then(res => {
              this.props.getQuestion(res.data);
            }).catch(Error => {
              //handle Error for get question request
              console.log(Error);
            });
  }

  render() {
    //Get the question to be rendered
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