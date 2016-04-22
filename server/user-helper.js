var Chance      = require("chance"),
    chance      = new Chance();

module.exports = {
  generateRandomUser: () => {
    var gender    = chance.gender();
    var firstName = chance.first({gender: gender});
    var lastName  = chance.last();
    var userName  = firstName + " " + lastName;
    
    var userHandle = "@";
    if (Math.random() > 0.5) {
      var prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }
    
    userHandle += lastName;
    
    if (Math.random() > 0.5) {
      var suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }
    
    return {
      name: userName,
      handle: userHandle
    };
  }
};
