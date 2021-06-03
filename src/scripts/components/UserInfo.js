export default class UserInfo {
    constructor({profileNameSelector, profileProfessionSelector, profileAvatarSelector}) {
      this._userName = document.querySelector(profileNameSelector);
      this._userProfession = document.querySelector(profileProfessionSelector);
      // this._avatar = document.querySelector(profileAvatarSelector);
    }
  
    getUserInfo() {
      const userData = {
        name: this._userName.textContent,
        profession: this._userProfession.textContent,
        // avatar: this._avatar.src
      }
      
      return userData;
    }
  
    setUserInfo({name, profession}) {
      this._userName.textContent =  name;
      this._userProfession.textContent = profession;
      // this._avatar.src = avatar;
    }
  }