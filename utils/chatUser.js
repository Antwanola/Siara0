function user(){
    let user = req.user
    return user
}

module.exports = {
    user
}