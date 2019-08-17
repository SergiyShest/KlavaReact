import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter.jsx';
import KlavaInput from './klavaInput.jsx';


export default class KlavaMain extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            Example: "Проба пера",
            Inputed: "Проба пx",
            errorCount: 0,
            nextChar: ''

        };
        this.addClick = this.addClick.bind(this);
        this.ResetClick = this.ResetClick.bind(this);
    }
    updateResult = (value) => {
        this.setState({ currentSpeed: value })
    }

    addClick() {
        this.setState(state => ({
            count: this.state.count + 1
        }));
    }
    ResetClick() {
        this.setState(state => ({
            count: 0
        }));
    }


    errorCounter() {
        console.log('Error happend')
        // this.setState(state => ({
        //     errorCount: this.state.errorCount+1
        //})); 
    }

    next() {

    }


    setNextChar(value) {
        this.nextChar = value;
    }
    render() {
        return (
            <div>
                <KlavaInput
                    Example={this.state.Example}
                    Inputed={this.state.Inputed}
                    error={this.errorCounter}
                    next={this.next}
                    ok={this.setNextChar}
                />
                <p>{this.state.currentSpeed}</p>
                <Counter InputedCharCount={this.state.count} result={this.updateResult} />
                <button onClick={this.addClick}>click me - {this.state.count}</button>
                <button onClick={this.ResetClick}>reset  </button>
            </div >
        );
    }
}