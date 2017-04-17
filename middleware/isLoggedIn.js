var isLoggedIn = function(req, res, next){
  if(!req.user){
    req.flash('error', 'Please log in to access this page')
    res.redirect('auth/login')
    }
  next()
}

module.exports = isLoggedIn
