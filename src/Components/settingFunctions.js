export class Set {
    constructor(json = null) {
        if (json == null) {
            this.selectedLang = { val: 'ru', text: "русский" };
            this.Mode = "KvaziText";
            this.IgnoreCapital = false;
            this.IgnoreRepeetWhiteSpace = false;
            this.SentationsCount = 1;
        }
        else {
            this.selectedLang = json.selectedLang;
            this.Mode = json.Mode;
            this.IgnoreCapital = json.IgnoreCapital;
            this.IgnoreRepeetWhiteSpace = json.IgnoreRepeetWhiteSpace;
            this.SentationsCount = json.SentationsCount;
        }
    }

    get Lang() {
        return this.selectedLang.val;
    }
    set Lang(val)  
    {
        var al = Set.AvaiableLangriges();
        for (var i = 0; i < al.length; i++)
        {
            if (al[i].val == val) { this.selectedLang = al[i]}
        }
    }


    static AvaiableLangriges() {
        return [{ val: 'ru', text: "русский" }, { val: 'en', text: "английский" }];
    }

    static AvaiableModes() {
        return [
            { val: 'KvaziText', text: "Псевдо текст" },
            { val: 'chars', text: "набор букв" },
            { val: 'words', text: "набор слов" }];
    }

    static AvaiableUsers() {
      var  users = new Array(); //Create empty Array
        var usersStr = localStorage.getItem("users");
        if (usersStr == null) usersStr = "unknoun";
        usersStr = usersStr.replace("s+", " ").replace(";+", ";"); //remove white space
        if (usersStr.length > 0) {
            users.length = 0;
            users = usersStr.split(";");
        } 
        return users;
    }
}

//Load User Achivment from localStorage
export function LoadUserAchivment(userName, setingString) {
    var userAchivmentStr = localStorage.getItem(userName + "_" + setingString);//read as string
    if (userAchivmentStr != null) {
        try {
            console.log("load " + userName + "_" + setingString)
            return JSON.parse(userAchivmentStr);//

        } catch (e) {
            return [];
        }
    }

    return [];
}

//Save User Achivment to localStorage
export function SaveUserAchivment(userName, userAchivment, setingString) {
    const userAchivmentStr = JSON.stringify(userAchivment)
 // console.log("save " + userName + "_" + setingString)
    localStorage.setItem(userName + "_" + setingString, userAchivmentStr);
}

export function AddUserAchivment(res, error) {

    let userName = LoadCurrUser(Set.AvaiableUsers());
    let settings = LoadUserSettings(userName);
    let settingsSer= JSON.stringify(settings);

    const userAchivmentStr = JSON.stringify(userAchivment)
    localStorage.setItem(userName + "_" + setingString, userAchivmentStr);
}

export function LoadCurrUser(userArrey) {
    if (userArrey == null || userArrey == "undefinded")
        userArrey = [];
    var currentUser = localStorage.getItem("currentUser");
    if (currentUser == null || currentUser == "undefinded") {
        if (userArrey.length > 0) {
            currentUser = userArrey[0]; //take first user from Arrey
        }
        else {
            currentUser = "unknown";
        }
    }
    if (!userArrey.includes(currentUser)) {
        userArrey.push(currentUser);
    }
    return currentUser;
}

export function LoadUserSettings(userName) {

    var userSettingStr = localStorage.getItem(userName + "_setting");//read as string
    if (userSettingStr != null) {
        try {
            return JSON.parse(userSettingStr, function (key, val) {
                               if (typeof (val) === 'object' && key === '')
                    return new Set(val);
                return val;
            });
        } catch (ex) {
            console.error(ex);
        }
    }
    return new Set();

}

export function LoadCurrentUserSetting() {
    
   let userName = LoadCurrUser(Set.AvaiableUsers());
    return LoadUserSettings(userName);
}

export function SaveUserSettings(userName, userSetting) {
    try {
        var userSettingStr = JSON.stringify(userSetting);
        console.log("userSettingStr=" + userSettingStr);
        localStorage.setItem(userName + "_setting", userSettingStr);
    } catch (ex) {
        console.error("Err" + ex);
    }
}

export function SaveUser(userName) {
    var users = localStorage.getItem('users');
    users += ';' + userName;
    localStorage.setItem('users', users);
    SetUserCurrent( userName);
}

export function SetUserCurrent(userName) {

    localStorage.setItem('currentUser', userName);
}

function typeOf(obj) {
    return ({}).toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();
}

function checkTypes(args, types) {
    args = [].slice.call(args);
    for (var i = 0; i < types.length; ++i) {
        if (typeOf(args[i]) != types[i]) {
            throw new TypeError('param ' + i + ' must be of type ' + types[i]);
        }
    }
}