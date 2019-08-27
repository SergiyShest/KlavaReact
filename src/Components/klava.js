import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter.jsx';
import KlavaInput from './klavaInput.jsx';
import { GetKvasiTextS } from "./TextCreation.js";
import Setting from "./setting.jsx";
import { AddUserAchivment, GetUserAchivment, LoadCurrUser, LoadUserSettings, SaveUserSettings, Set, MD5 } from "./settingFunctions.js";
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
            currentSentetion: 0,
            Example: '',
            Inputed: "",
            errorCount: 0,
            nextChar: '',
            lastSpeed: 0,
            placeholder: 'введите строку выше',
            UserAchivment: [],
            translatedInRussian:''
        }
    }

    GetExample = () => {
        if (this.state.ExampleArr.length == 0) return '';
        return this.state.ExampleArr[0];
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
            AddUserAchivment(this.refs.counter.GetSpeed(), this.state.errorCount);
            var ua = GetUserAchivment();
            this.setState(state => ({
                ExampleArr: [],
                Inputed: '',
                placeholder: "Ваша скорость " + this.refs.counter.GetSpeed() + ' нажмите Enter для продолжения.',
                UserAchivment: ua
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

    handleInputedText = (event) => {
        if (!this.refs.counter.state.running) { return false;}
        this.setState({ Inputed: event.target.value });
    }

    //restart by enter
    keyPress = (e) => {
        if (e.keyCode == 13) {
            this.Start();
        }
    }
    Start = () => {
        this.state.currentSentetion = 0;
        console.log('Start');
        this.refs.counter.Start();
        var trArr = [];
        var exampleArr = GetKvasiTextS(false, trArr);
        var ex = exampleArr[this.state.currentSentetion];
        var ua = GetUserAchivment();
        this.setState(state => ({
            errorCount: 0,
            Example: ex,
            Inputed: '',
            ExampleArr: exampleArr,
            UserAchivment: ua,
            translatedInRussian:trArr[this.state.currentSentetion]
        }));
    }
    componentDidMount() {//initial
        this.Start();
    }

    render() {
        return (
            <div>
                <p>Ошибок {this.state.errorCount}</p>
                <Counter ref='counter' InputedCharCount={this.state.InputedCharCount} />
                <div>{this.state.translatedInRussian}</div>
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
                <table>
                    <tbody>
                        <tr>
                            <td width="20%">
                                <Setting ref='setting' />
                            </td>
                            <td width="80%">
                                <Chart UserAchivment={this.state.UserAchivment} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}