import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    Set,
    LoadUserAchivment,
    SaveUserAchivment,
    LoadCurrUser,
    LoadUserSettings
} from "./settingFunctions.js";


const settingStyle = {
    border: '2px',
    borderRadius: '2',
    borderWidth: '2px',
    color: '#4335bb',
    textAlign: 'left',
    height: '200px',
    background: 'red'
}



export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: new Set(),

            avaiableUsers: [],
            AvaiableLangriges: []
        };

    }

    handleUserChange = (event) => {
        this.setState({ userName: event.target.value });
    }
    handleLangChange = (event) => {
        this.state.setting.Lang = event.target.value;
        this.setState({ userName: this.state.userName });
    }

      handleSentationsCountChange = (event) => {
        this.state.setting.SentationsCount = event.target.value;
        this.setState({ userName: this.state.userName });
    }

    componentDidMount() {
        this.state.avaiableUsers = Set.AvaiableUsers();
        this.state.AvaiableLangriges = Set.AvaiableLangriges();
        this.state.userName = LoadCurrUser(this.state.avaiableUsers);
    }

    componentWillReceiveProps(nextProps) {

    }
    //<input type="number" value="{this.state.settings.SentationsCount}" />
    render() {
        return (
            <div  >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h3>User:</h3>
                            </td>
                            <td>
                                <select value={this.state.userName} onChange={this.handleUserChange}>
                                    {this.state.avaiableUsers.map((name) => <option key={name}>{name}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Language: {this.state.setting.selectedLang.val}</h3>
                            </td>
                            <td>
                                <select value={this.state.setting.Lang} onChange={this.handleLangChange}  >
                                    {this.state.AvaiableLangriges.map(x => <option key={x.val} value={x.val} >{x.text}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Centanion count:</h3>
                            </td>
                            <td>
                                <input type="number"
                                    value={this.state.setting.SentationsCount}
                                    onChange={this.handleSentationsCountChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Ignore Capital:</h3>
                            </td>
                            <td>
                                <input type="checkbox" value="{this.state.settings.IgnoreCapital}" />
                            </td>
                        </tr>
                    </tbody>
                </table >


            </div >
        );
    }
}