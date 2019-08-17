import React from 'react';
import ReactDOM from 'react-dom';



export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            startTime: null,
            avgSpeed: 0
        };
        setInterval(this.updateByTimer.bind(this), 1000);
    }
    //take avg speed in min
    getMin(milliSec, count) {
        return Math.round(60 / ((milliSec / count) / 1000), 10);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.InputedCharCount == 0 && nextProps.InputedCharCount == 1) {//условие срабатывает когда значение меняется с 0 на 1
            this.state.Log = ('Start=>');
            this.state.startTime = Date.now();//установил время старта


        }
        else
            if (nextProps.InputedCharCount > 0 &&
                this.props.InputedCharCount != nextProps.InputedCharCount) {//любое изменение
                this.calculateAvgSpeed(nextProps.InputedCharCount)
        }

        if (this.props.InputedCharCount > 0 && nextProps.InputedCharCount == 0) {
            this.props.result(this.state.avgSpeed);//передаю результирующую  среднюю скорость в родительский контрол
            this.setState(state => ({ time: 0 , avgSpeed:0}));
        }
        

    }
    calculateAvgSpeed(inputedCharCount) {
        let time = Date.now() - this.state.startTime;
        this.state.avgSpeed = this.getMin(time, inputedCharCount);
        this.setState(state => ({ time: time }));
    }


    updateByTimer() {
        if (!('state' in this)) return;//до инициализации
        if (this.props.InputedCharCount > 0) {
            this.calculateAvgSpeed(this.props.InputedCharCount)
        }
        this.state.Log += 'u ';
    }

    render() {
        return (
            <div>
                <p>Времени с начала: {Math.round(this.state.time / 1000, 10)} sec</p>
                <p id={'speed'} >Скорость: {this.state.avgSpeed} символов в минуту</p>
                <p id={'inputedCharCount'} >Введено символов: {this.props.InputedCharCount} </p>
                <div style={{ backgroundColor: '#F0F0F0', width: '300px', minHeight: '200px' }} > {this.state.Log} </div>

            </div>
        );
    }
}