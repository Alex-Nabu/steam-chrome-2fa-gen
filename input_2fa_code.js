var account_input = document.getElementById("input_username");

if(!account_input) {
  account_input = document.getElementById("steamAccountName");
}

var auth_input = document.getElementById("twofactorcode_entry");
var totpObj = new TOTP();

// var account_name = account_input.value.toUpperCase();
//
// account_input.addEventListener("change", e => {
//   account_name = account_input.value.toUpperCase();
// })

chrome.storage.local.get('accounts', accounts => {
  var accounts = JSON.parse(accounts.accounts);
  var uppercase_account_names = {};

  Object.keys(accounts).forEach(key => {
    uppercase_account_names[key.toUpperCase()] = accounts[key];
    var otp = totpObj.getOTP(accounts[key].shared_secret);
    console.log(`otp steam:`, otp);
  })

  // if(uppercase_account_names[account_name]) {
  // }
})

auth_input.addEventListener("focus", function(e) {
  chrome.storage.local.get('accounts', accounts => {
    var accounts = JSON.parse(accounts.accounts);
    var uppercase_account_names = {};

    Object.keys(accounts).forEach(key => {
      uppercase_account_names[key.toUpperCase()] = accounts[key];
    })

    if(uppercase_account_names[account_name]) {
      var otp = totpObj.getOTP(uppercase_account_names[account_name].shared_secret);
      auth_input.value = otp;
    }
  })
});
