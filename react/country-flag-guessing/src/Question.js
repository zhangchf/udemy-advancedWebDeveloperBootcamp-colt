import React, {Component} from "react";
import "./Question.css";

class Question extends Component {

    onAnswer(answer) {
        this.props.onAnswer(answer === this.props.question.answer);
    }

    render() {
        let {options, answer} = this.props.question;
        let OptionView = options.map((opt, index) => {
            return (
                <div key={index}>
                    <input type="radio" name="country" value={index} onClick={this.onAnswer.bind(this, index)}/>
                    {opt.name}
                </div>
            )
        });
        return (
            <div className="question">
                <img src={options[answer].flag} alt="Country Flag"/>
                <form className="options">
                    {OptionView}
                </form>
            </div>
        )
    }
}

export default Question;