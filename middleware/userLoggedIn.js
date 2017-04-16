var userLoggedIn = function(req, res, next){
  if(!req.user){
    req.flash('error', 'Please log in to view your profile page')
    res.redirect('auth/login')
    }
  next()
}

module.exports = userLoggedIn
