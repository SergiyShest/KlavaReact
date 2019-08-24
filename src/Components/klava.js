import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter.jsx';
import KlavaInput from './klavaInput.jsx';
import { GetKvasiTextS } from "./TextCreation.js";
import Setting from "./setting.jsx";
import Chart from './chart.jsx';

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
            currentSentetion:0,
            Example:'',
            Inputed: "",
            errorCount: 0,
            nextChar: '',
            lastSpeed: 0,
            placeholder: 'введите строку выше'

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
        this.state.currentSentetion++;
        if (parseInt(this.refs.setting.state.setting.SentationsCount) <= this.state.currentSentetion) {
            this.refs.counter.Stop();

            this.setState(state => ({
                ExampleArr: [],
                Inputed: '',
                placeholder: "Ваша скорость " + this.refs.counter.GetSpeed() + ' нажмите Enter для продолжения.'
            }));
        } else {
            this.setState(state => ({
                Example: this.state.ExampleArr[this.state.currentSentetion],
                Inputed: '',
                placeholder: "Текущая скорость " + this.refs.counter.GetSpeed() + ' продолжайте печатать!'
            }));

        }
    }
    setNextChar = (value) => {
        this.setState(state => ({
            nextChar: value,
            InputedCharCount: this.state.Inputed.length
        }));
    }
    keyPress = (e) => {
        if (e.keyCode == 13) {//restart by enter
            this.Start();
        }
    }
    Start=()=>
    {
        this.refs.counter.Start();
        var exampleArr = GetKvasiTextS(false);
        var ex = exampleArr[this.state.currentSentetion];
        this.setState(state => ({ errorCount: 0, Example: ex,ExampleArr:exampleArr }));
    }
    componentDidMount() {//initial

        var exampleArr = GetKvasiTextS(false);
        var ex = exampleArr[this.state.currentSentetion];
        this.setState(state => ({ Example: ex, ExampleArr: exampleArr  }));

    }
    render() {
        return (
            <div>
                <p>Ошибок {this.state.errorCount}</p>
                <Counter ref='counter' InputedCharCount={this.state.InputedCharCount} />
                <div>{this.state.RusTranslatedExample}</div>
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
                <table><tbody>
                    <tr><td width="20%">    <Setting ref='setting' /></td><td width="80%">
            <Chart/></td></tr></tbody></table>
            </div >
        );
    }
}