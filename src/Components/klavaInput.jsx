import React from 'react';
import ReactDOM from 'react-dom';

const Header = {
    padding: "10px 20px",
    textAlign: "center",
    color: "white",
    fontSize: "22px"
}


const gr = {

    color: '#42b983',
    backgroundColor: 'rgb(212, 212, 236)'
}

const re = {
    color: '#fff',
    backgroundColor: 'rgb(243, 18, 2)'
}
const inputStr = {
    width: '100%',
    // font- family: { 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans - serif}
    fontSize: '42px',
    textAlign: 'left',
    backgroundColor: 'rgb(212, 212, 236)'

}

export default class KlavaInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             okText: '',
            erText: "",
            notInptText: ""
        };
    }

    compare(Example, Inputed) {
        if (Example.length == 0) return;
        var okText = '';  var erText = '';  var notInptText = '';
        if (Example == null) return;
        for (var i = 0; i < Example.length; i++) {
            var exChar = Example[i];
            console.log(exChar);
            var inpChar = '';
            if (i < Inputed.length) { inpChar = Inputed[i]; }

            if (inpChar == exChar && erText.length == 0) {
                okText += inpChar;
                continue;
            }
            if (inpChar == '') {
                notInptText += exChar; continue;
            }
            if (inpChar != exChar || erText.length > 0) {
                erText += exChar;
            }
        }
       
        if (this.state.erText.length == 0 && erText.length > 0) {//error begin
          
            this.props.error();
        }
        if (erText.length == 0) {
            if (Inputed.length >= Example.length) {
                this.props.next();//text ended
            }
            else {
              
                this.props.nextChar(Example.substr(Inputed.length, 1));//send next char
            }
        } else {
            this.props.nextChar(Example.substr('<='));
        }
        this.setState(state => ({
            okText: okText,erText:erText,notInptText:notInptText
        }));

    }

    componentDidMount() {
        this.compare(this.props.Example,this.props.Inputed);
    }

    componentWillReceiveProps(nextProps)
    {
        if (this.props.Example != nextProps.Example) //условие срабатывает когда значение меняется с 0 на 1
            { this.compare(nextProps.Example, this.props.Inputed); }
            if (this.props.Inputed != nextProps.Inputed) //условие срабатывает когда значение меняется с 0 на 1
                { this.compare(this.props.Example, nextProps.Inputed); }

    }

    render() {
        return (
            <div>

                <div style={inputStr}>
                    <span id={'okText'} style={gr}>{this.state.okText}</span>
                    <span id={'erText'} style={re}>{this.state.erText}</span>
                    <span id={'notInptText'} >{this.state.notInptText}</span>
                </div>
            </div>
        );
    }
}