import React from 'react';
import ReactDOM from 'react-dom';;
import './index.css';


class Test extends React.Component {
	constructor() {
		super();
		this.state = {
      IDCounter: 1,
      title: "",
      questions: [
        this.getSampleQuestion(0)
      ]
    };

    this.addAnswer = this.addAnswer.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  getSampleQuestion(id) {
    return {
      question: "",
      answers: [],
      correctAnswer: -1,
      questionID: id,
      IDCounter: 0
    };
  }

  addQuestion() {
    var currQuestions = this.state.questions.slice();
    const id = this.state.IDCounter;
    currQuestions = currQuestions.concat(this.getSampleQuestion(id));
    this.setState({
      questions: currQuestions,
      IDCounter: id + 1
    });
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

  changeQuestion(event, index) {
    var currQuestions = this.state.questions.slice();
    var currQuestion = currQuestions[index];
    currQuestion.question = event.target.value;
    this.setState({
      questions: currQuestions
    });
  }

  changeAnswer(event, questionIndex, answerIndex) {
    var currQuestions = this.state.questions.slice();
    var currQuestion = currQuestions[questionIndex];
    var currAnswers = currQuestion.answers;
    currAnswers[answerIndex].answer = event.target.value;
    this.setState({
      questions: currQuestions
    });
  }

  deleteQuestion(questionIndex) {
    var currQuestions = this.state.questions.slice();
    currQuestions.pop(questionIndex);
    this.setState({
      questions: currQuestions
    });
  }

  deleteAnswer(questionIndex, answerIndex) {
    var currQuestions = this.state.questions.slice();
    var currQuestion = currQuestions[questionIndex];
    var currAnswers = currQuestion.answers;
    currAnswers.pop(answerIndex);
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
    addAnswerFunc={() => this.addAnswer(index)}
    changeAnswerFunc={(event, answerIndex) => this.changeAnswer(event, index, answerIndex)}
    changeQuestionFunc={(event) => this.changeQuestion(event, index)}
    deleteQuestionFunc={() => this.deleteQuestion(index)}
    deleteAnswerFunc={(answerIndex) => this.deleteAnswer(index, answerIndex)}/>;
  }

  render() {
    const questions = this.state.questions;
    return (
      <div>
        <input type="text" onChange={(event) => this.setState({title: event.target.value})} value={this.state.title}/>
        <ol id="test-start">
          {questions.map((question, index) => <li key={question.questionID}> {this.renderQuestion(question, index)} </li>)}
        </ol>
        <button onClick={() => this.addQuestion()}>
          Add Question
        </button>
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
      <input type="text" onChange={this.props.changeQuestionFunc} value={question}/>
      <ol type="a">
      {answers.map((answer, index) => 
        <li key={answer.answerID}>
        <input type="text" onChange={(event) => this.props.changeAnswerFunc(event, index)} value={answer.answer}/>
        <button onClick={() => this.props.deleteAnswerFunc(index)}>Delete Answer</button>
        </li>)
    }
    </ol>
    <button onClick={() => this.props.addAnswerFunc()}>Add Answer</button>
    <button onClick={() => this.props.deleteQuestionFunc()}>Delete Question</button>
    </div>
    );
  }
}
ReactDOM.render(
  <Test/>,
  document.getElementById('root')
  );
