import React from 'react';
import ReactDOM from 'react-dom';;
import './index.css';


class Test extends React.Component {
	constructor() {
		super();
		this.state = {
      IDCounter: 1,
			questions: [
        {
          question: "What is 2 + 2?",
          answers: [
            {answer: "3",
            answerID: 0},
            {answer: "4",
            answerID: 1},
            {answer: "5",
            answerID: 2}
          ],
          correctAnswer: 1,
          questionID: 0,
          IDCounter: 3
        }
			]
		};

    this.addAnswer = this.addAnswer.bind(this);
	}

  addAnswer(questionIndex) {
    var currQuestions = this.state.questions.slice();
    var currQuestion = currQuestions[questionIndex];
    currQuestion.answers = currQuestion.answers.concat({answer: "", answerID: currQuestion.IDCounter});
    currQuestion.IDCounter += 1;
    this.setState({
      questions: currQuestions
    });
  }

  renderQuestion(question, index) {
    return <Question 
    question={question.question} 
    answers={question.answers} 
    correctAnswer={question.correctAnswer}
    questionID={question.questionID}
    addAnswerFunc={() => this.addAnswer(index)}/>;
  }

  render() {
    const questions = this.state.questions;
    return (
      <div>
        <h1>Test Title</h1>
        <ol id="test-start">
          {questions.map((question, index) => <li key={question.questionID}> {this.renderQuestion(question, index)} </li>)}
        </ol>
      </div>
    );
  }

}

class Question extends React.Component {

  render() {
    const answers = this.props.answers;
    const question = this.props.question;
    return (
      <div>
        <h3>{question}</h3>
        <ol type="a">
          {answers.map((answer, index) => <li key={answer.answerID}>{answer.answer}</li>)}
        </ol>
        <button onClick={() => this.props.addAnswerFunc()}>
          Add Answer
        </button>
      </div>
    );
  }
}
ReactDOM.render(
  <Test/>,
  document.getElementById('root')
);
