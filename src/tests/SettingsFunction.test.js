
import {SaveUserAchivment, LoadUserAchivment,AddUserAchivment, GetUserAchivment, LoadCurrUser, LoadUserSettings, SaveUserSettings, Set,MD5 } from "../components/settingFunctions.js";


describe(" UserAchivment Function Tests", () => {

    it("Save and load simple", () => {

        var setting = new Set();
        var user = 'denis';
        localStorage.setItem('currentUser', user);
        SaveUserSettings(user, setting);
        AddUserAchivment(45, 66);
        var ua = GetUserAchivment();
        console.log(ua);
    });


    it("Save and load simple", () => {

        const userAchivment = [{ date: 'data', Errors: 5, speed: 100 }]//simple userAchivment 
        SaveUserAchivment('userName', userAchivment, '1');//save 
        const LoadeduserAchivment = LoadUserAchivment('userName', '1')//load  userAchivment 
        expect(userAchivment).toEqual(LoadeduserAchivment);

    });

    it("load empty", () => {

        localStorage.removeItem('userName_1');
        const inp = JSON.stringify(LoadUserAchivment('userName', '1'));
        const ex = '[]'
        expect(ex).toMatch(inp);
    });
    // it("load error string", () => {
    //     localStorage.setItem('userName_1', 'notValid');//save not Valid items
    //     const inp = JSON.stringify(LoadUserAchivment('userName', '1'));
    //     const ex = '[]'
    //     expect(ex).toMatch(inp);
    // });
});

describe("LoadCurrUser Tests", () => {
    it("User exists ", () => {
        var user = 'den';
        localStorage.setItem('currentUser', 'den');
        const users = ["vac", "den", "pet"]//
        var loadedUser = LoadCurrUser(users);//save
        expect(user).toEqual(loadedUser);//compare
    });
    it("User not exists mast take first from Array", () => {

        localStorage.removeItem('currentUser');
        const users = ["vac", "den", "pet"]//
        var user = users[0];
        var loadedUser = LoadCurrUser(users);//save
        expect(user).toEqual(loadedUser);//compare
    });
    it("User not exists users Empty mast create name unckown", () => {
        localStorage.removeItem('currentUser');
        const users = [];//
        var user = 'unknown';
        var loadedUser = LoadCurrUser(users);//save
        expect(user).toEqual(loadedUser);//compare
    });
    it("User not in usersArray User mast by pushed in usersArray", () => {
        const usersArrey = ["vac", "den", "pet"];//
        var user = 'pig';
        localStorage.setItem('currentUser', user);
        var loadedUser = LoadCurrUser(usersArrey);//save
        expect(usersArrey.includes(user)).toBe(true);//compare
    });
    it("User not exists usersArrey=>Empty mast create name unckown", () => {

        localStorage.removeItem('currentUser');
        const users = [];//
        var user = 'unknown';
        var loadedUser = LoadCurrUser(users);//save
        expect(user).toEqual(loadedUser);//compare
        // console.log(users.length);
        expect(users.length).toBe(1);//compare
        expect(user).toEqual(users[0]);//compare
    });
});

describe("Load Save User Settings Tests", () => {


    it("LoadF Save setting  ", () => {
        var user = 'den';
        var userSettings = new Set();
        userSettings.selectedLang = { val: 'fr', test: 'Французский' }
        userSettings.SentationsCount = '3';
        SaveUserSettings(user, userSettings);//save
        const loadedSettings = LoadUserSettings(user);//save
        expect(userSettings).toEqual(loadedSettings);//compare
        expect(loadedSettings.Lang).toEqual('fr');

    });


});
