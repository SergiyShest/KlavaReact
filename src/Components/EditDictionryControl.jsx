import React from 'react';
import ReactDOM from 'react-dom';
import Dicti from './dictionry.js';



export default class EditDictionry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        dictionry:{},
        dictionryName:'',
        wordSetList:[],
        selectedWordSet:[],
        sententionList:[],
        sententionSentation:[]
        };
     
    }
    //take avg speed in min

    componentWillReceiveProps(nextProps) {

    }

  

    render() {
        return (
            <div>
                <p>Словарь:{}</p>
                <p>Слова:</p>
                <p>Предложения:</p> 
            </div>
        );
    }
}