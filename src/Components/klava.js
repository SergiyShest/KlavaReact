import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter.jsx';
import KlavaInput from './klavaInput.jsx';
import { GetKvasiTextS } from "./TextCreation.js";
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
            ExampleArr: [],
            Example:'',
            Inputed: "",
            errorCount: 0,
            nextChar: '',
            lastSpeed: 0,
            placeholder: 'input sting above'

        }
        
    }

     GetExample = () => {
        if ( this.state.ExampleArr.length == 0) return '';
        return  this.state.ExampleArr[0];
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

            ExampleArr: [],
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
    keyPress = (e) => {

        if (e.keyCode == 13) {
            this.Start();
        }
    }
    Start=()=>
    {
        this.refs.counter.Start();
        var exampleArr = GetKvasiTextS(false);
        var ex = exampleArr[0];
        this.setState(state => ({ errorCount: 0, Example: ex,ExampleArr:exampleArr }));
    }


    componentDidMount() {
     var exampleArr = GetKvasiTextS(false);
        var ex = exampleArr[0];
        this.setState(state => ({ Example: ex, ExampleArr: exampleArr  }));

    }
    render() {
        return (
            <div>
                <p>Ошибок {this.state.errorCount}</p>
                <Counter ref='counter' InputedCharCount={this.state.InputedCharCount} />
                <KlavaInput
                    Example={this.state.Example }
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
                <Setting   />
            </div >
        );
    }
}