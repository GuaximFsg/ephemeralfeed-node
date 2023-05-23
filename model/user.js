module.exports = class UserEntity {
    constructor(props) {
      this.username = props.username;       // extract the informations from the json
      this.message = props.message;
      this.password = props.password;
      this.date = new Date().toLocaleString('en-GB', {hour12: false,});
    }
  
    post(message) {

      console.log("New post " + {
        name: user.username,
        message: user.message,
        date: user.date,
      });

    }
  };