var userLoggedIn = function(req, res, next){
  if(!req.user){
    req.flash('error', 'please log in to view page')
    res.redirect('auth/login')
    }
  next()
}

module.exports = userLoggedIn
