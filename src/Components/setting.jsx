import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    Set,
    LoadUserAchivment,
    SaveUserAchivment,
    SaveUserSettings,
    LoadCurrUser,
    LoadUserSettings,
    SaveUser,
    SetUserCurrent
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
            AvaiableLangriges: [],
            userName:''
        };

    }

    handleUserChange = (event) => {
        var userName = event.target.value;
            SetUserCurrent(userName)
        this.state.setting = LoadUserSettings(userName);
        this.setState({ userName: userName });
    }
    handleLangChange = (event) => {
        this.state.setting.Lang = event.target.value;
        this.update();
    }

      handleSentationsCountChange = (event) => {
        this.state.setting.SentationsCount = event.target.value;
          this.update();
    }

    componentDidMount() {
         this.init();
    }

    init = () => {
        this.state.avaiableUsers = Set.AvaiableUsers();
        this.state.AvaiableLangriges = Set.AvaiableLangriges();
        this.state.userName = LoadCurrUser(this.state.avaiableUsers);
        this.state.setting = LoadUserSettings(this.state.userName);
    }


    componentDidUpdate(prevProps ,  prevState) {
        //if (prevState.userName != this.state.userName) {
        //    SetUserCurrent(userName)
        //    this.state.setting = LoadUserSettings(this.state.userName);
        //    this.update(); 
        //}

    }
    update = () => {
        SaveUserSettings(this.state.userName,this.state.setting)
        this.setState({ userName: this.state.userName });
    }

    AddUser = () => {

        var user = prompt("Please enter your name", "");
        if (user != null) {
            if (this.state.avaiableUsers.includes("user"))
            {
                alert("This user exists");
                return;
            }
            SaveUser(user);
            this.state.avaiableUsers = Set.AvaiableUsers();

            this.setState({ userName: user });
        }

        
      
    }

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
                                <h3>Add user:</h3>
                            </td>
                            <td>
                                <button onClick={this.AddUser} >Add User</button>
                            </td>
                        </tr>
                    </tbody>
                </table >


            </div >
        );
    }
}
                        //<tr>
                        //    <td>
                        //        <h3>Centanion count:</h3>
                        //    </td>
                        //    <td>
                        //        <input type="number"
                        //            value={this.state.setting.SentationsCount}
                        //            onChange={this.handleSentationsCountChange} />
                        //    </td>
                        //</tr>
//<tr>
//    <td>
//        <h3>Ignore Capital:</h3>
//    </td>
//    <td>
//        <input type="checkbox" value="{this.state.settings.IgnoreCapital}" />
//    </td></tr>