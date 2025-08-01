

exports.login = (account)=> {
  return {
    id:           account._id,
    picture:      account.picture,
    name:         account.name,
    username:     account.username,
    email:        account.email,
    accountType:  account.accountType,
    createdAt:    account.createdAt,
    updatedAt:    account.updatedAt,
  }
}
exports.register = exports.login;