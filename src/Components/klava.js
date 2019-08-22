import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter.jsx';
import KlavaInput from './klavaInput.jsx';
import { GetSentation } from "./TextCreation.js";
import Setting from "./setting.jsx";

export const inputStrStyle = {
    width: '100%',
    // font- family: { 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans - serif}
    fontSize: '42px',
    textAlign: 'left',
    backgroundColor: 'rgb(212, 212, 236)'
}
export default class KlavaMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InputedCharCount: 0,
            Example: "Проба пера",
            Inputed: "",
            errorCount: 0,
            nextChar: '',
            lastSpeed: 0,
            placeholder: 'input sting above'

        };
    }
    handleInputedText = (event) => {
        this.setState({ Inputed: event.target.value });
    }
    errorCounter = () => {
        this.setState(state => ({
            errorCount: this.state.errorCount + 1
        }));
    }
    next = () => {
        this.refs.counter.Stop();
        this.setState(state => ({

            Example: '',
            Inputed: '',
            placeholder: "Уour speed is " + this.refs.counter.GetSpeed() + 'press Enter for continue'
        }));
    }
    setNextChar = (value) => {
        this.setState(state => ({
            nextChar: value,
            InputedCharCount: this.state.Inputed.length
        }));
    }
    keyPress=(e)=> {
        if (e.keyCode == 13) {
            this.Start();
        }
    }
    Start=()=>
    {

        this.refs.counter.Start();
        this.setState(state => ({ errorCount: 0, Example: GetSentation() }));
    }


    componentDidMount() {
        this.Start();
    }
    render() {
        return (
            <div>
                <p>Ошибок {this.state.errorCount}</p>
                <Counter ref='counter' InputedCharCount={this.state.InputedCharCount} />
                <KlavaInput
                    Example={this.state.Example}
                    Inputed={this.state.Inputed}
                    error={this.errorCounter}
                    next={this.next}
                    nextChar={this.setNextChar}
                />
                <input placeholder={this.state.placeholder}
                    onKeyDown={this.keyPress}
                    autoFocus type="text" style={inputStrStyle}
                    value={this.state.Inputed}
                    onChange={this.handleInputedText} />
                <Setting/>
            </div >
        );
    }
}