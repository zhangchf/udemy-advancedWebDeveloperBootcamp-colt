import React, {Component} from "react";
import "./Question.css";

const STATE = {
    Question: 0,
    Complete: 1
}

const Answer = ({correct, correctAnswer, onNext}) => {
    let msg = correct ? "Correct!" : `Wrong! The correct answer is: ${correctAnswer}`;
    return (
        <div>
            <p className="answerMsg">{msg}</p>
            <button className="nextButton" onClick={() => onNext()}>Next</button>
        </div>
    )
}

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: STATE.Question,
            correct: false,
            correctAnswer: "",
            selectId: -1
        }
    }

    onAnswer(answerId) {
        let {options, answer: correctAnswerIndex} = this.props.question;
        console.log(options, correctAnswerIndex);
        let correctAnswer = options[correctAnswerIndex].name;
        let correct = answerId === correctAnswerIndex;
        this.setState({state: STATE.Complete, correct, correctAnswer, selectId: answerId})
    }

    onNext() {
        this.props.onNext();
        this.setState({state: STATE.Question, selectId: -1});
    }

    render() {
        let {options, answer} = this.props.question;
        let OptionView = options.map((opt, index) => {
            return (
                <div key={index}>
                    <input type="radio" name="country" value={index} checked={index === this.state.selectId} onClick={this.onAnswer.bind(this, index)}/>
                    {opt.name}
                </div>
            )
        });
        return (
            <div className="question">
                <img src={options[answer].flag} alt="Country Flag"/>
                <div className="options">
                    {OptionView}
                </div>
                { this.state.state === STATE.Question ?
                    null :
                    <Answer correct={this.state.correct} correctAnswer={this.state.correctAnswer} onNext={this.onNext.bind(this)}/>
                }
            </div>
        )
    }
}

export default Question;