import React, { Component } from "react";
 
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {submitCount:0, 
                  currentQuestionId:0,
                  questionList:[
                  {
                    id:0,
                    expression:"3 + 5 * 9 = _",
                    options:[47, 48, 72, 32],
                    answer:48,
                  },
                  {
                    id:1,
                    expression:"6 - 5 + 9 = _",
                    options:[12, 10, 34, 6],
                    answer:10,
                  },
                  {
                    id:2,
                    expression:"25 / 5 + 7 = _",
                    options:[23, 28, 12, 32],
                    answer:48,
                  },
                  {
                    id:3,
                    expression:"4 * 6 - 9 = _",
                    options:[22, 15, 1, 7],
                    answer: 15,
                  },
                  {
                    id:4,
                    expression:"24 / 2 * 3 = _",
                    options:[4, 24, 36, 48],
                    answer: 36
                  },]
                 }

    this.onAnsChange = this.onAnsChange.bind(this);
    this.onAnsSubmit = this.onAnsSubmit.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
  }

  onAnsChange = (event) => {
    this.setState({
      selectedAns:event.target.value
    });
  }

  onAnsSubmit = (event) => {
    event.preventDefault();
    let currentQuestionId = this.state.currentQuestionId
    let correctAns = this.state.questionList[currentQuestionId].answer
    this.setState( prevState => ({ submitCount: prevState.submitCount + 1}));
    if (this.state.selectedAns == correctAns) {
      alert("Correct!");
    } else {
      if (this.state.submitCount === 5) {
        alert("Incorrect! No more chance!");
      } else {
        alert("Incorrect! " + (4-this.state.submitCount) + "chance(s) left!");
        this.setQuestion();
      }
    }
  }
  setQuestion() {
    let max = this.state.questionList.length;
    let min = 0;
    let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setState({
      currentQuestionId:randomIndex
    });   
  }

  render() {
    
    let currentQuestionId = this.state.currentQuestionId;

    let questionToShow = this.state.questionList[currentQuestionId]
    
    return (
      <div>
        <h2>Question</h2>
 
        <p>This is question page</p>
        <form onSubmit={this.onAnsSubmit}>
           <div className="question">
              Question:  {questionToShow.expression}
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
      </div>
    );
  }
}
 
export default Question;