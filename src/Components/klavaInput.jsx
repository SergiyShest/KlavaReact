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

    compare() {
        var okText = '';  var erText = '';  var notInptText = '';
        if (this.props.Example == null) return;
        for (var i = 0; i < this.props.Example.length; i++) {
            var exChar = this.props.Example[i];
            console.log(exChar);
            var inpChar = '';
            if (i < this.props.Inputed.length) { inpChar = this.props.Inputed[i]; }

            if (inpChar == exChar && erText.length == 0) {
                okText += inpChar;
                continue;
            }
            if (inpChar == '') {
                notInptText += exChar; continue;
            }
            if (inpChar != exChar || this.erText.length > 0) {
                erText += exChar;
            }
        }
        console.log(erText);
        if (this.state.erText.length == 0 && erText.length > 0) {
          
            this.props.error();
        }

        this.setState(state => ({
            okText: okText,erText:erText,notInptText:notInptText
        }));

    }

    componentDidMount() {
        console.log(this.props.Example + '============' + this.props.Inputed)
        this.compare();
    }

    componentWillReceiveProps(nextProps)
    {
       // if (this.props.InputedCharCount == 0 && nextProps.InputedCharCount == 1) {//условие срабатывает когда значение меняется с 0 на 1
        this.state.Log = ('Start=>'+nextProps);
this.compare();
      //      this.state.startTime = Date.now();//установил время старта


      //  }
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