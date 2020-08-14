// 
// Authentication
// 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// app.post('/login', passport.authenticate('local',
//                                          { successRedirect: '/',
//                                            failureRedirect: '/',
//                                            failureFlash: true }), (req, res) => {
//   res.redirect('/')
// })

// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.'});
//       }
//     })
//   }
// ))