# meet&jam

meet&jam is a web app for music enthusiasts and hobbyists to organize jam sessions and join ones they are interested in.  You can also share your audio clips of your performances and compositions with fellow members.  The main features are as follows:

1. Public viewers can see all events created on this platform.  However, they need to be authenticated as a user before they can join an event.
2. As a user, you will be able to:
- view all events
- create (and subsequently edit and delete these created events)
- join and withdraw from events created by other users
- upload files to your profile page
- view profiles of other events attendees

## Getting Started

Please run npm install before running the app.

### Prerequisites

This app is built on Node.js

```
npm install
```

## Live Version
###This app is deployed on https://meetandjam.herokuapp.com
###![demo](https://github.com/shirongfoo/project2/blob/master/READMEImages/meet_jam.gif)


## Built With
* [bCrypt]
* [Body-parser]
* [Bootstrap]
* [Cloudinary]
* [Connect-flash]
* [dotenv]
* [Ejs]
* [express]
* [express-ejs-layouts]
* [express-session]    
* [method-override]    
* [mongoose]
* [multer]
* [nodemon]
* [passport]
* [passport-local]

## Work Flow
User stories and task tracking done using trello
![trelloworkflow](https://github.com/shirongfoo/project2/blob/master/READMEImages/trelloWorkflow.png)

## WireFrames and ERD Sketches
![wireframe](https://github.com/shirongfoo/project2/blob/master/READMEImages/wireframe.png)
![erdDiagram](https://github.com/shirongfoo/project2/blob/master/READMEImages/erd.png)


## Development
### Some challenges I faced
#### 1. Handling audio uploads with cloudinary
The resource type had to be specified as video, and thereafter rendered to the page by using the HTML audio tag.
```
router.post('/profile', upload.single('myFile'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    console.log('trying to upload')
    console.log(req.user)
    User.findById(req.user.id, function (err, user) {
      if (err)console.log(err)
      Audio.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        audioProperties: result.url
      }, function (err, image) {
        if (err) {
          console.log(err)
        } else {
          console.log('before redirect')
          req.flash('success', 'File successfully uploaded')
          res.redirect('/auth/profile')
        }
      })
    })
  }, {resource_type: 'video'})
})

```
#### 2.  Populating the user's dashboard with events organized and events attending.
I ended up using the referencing method to link my user schema with the events schema.  As such, I was able to extract the events organized object and the events attending object linked to each user via the following:

```
router.get('/profile/events', isLoggedIn, function (req, res) {
  if (req.user) {
    User.findById(req.user.id)
    .populate('eventsOrganized')
    .populate('eventsAttending')
    .exec(function (err, user) {
      if (err) console.log(err)
      console.log('checking time' + user);
      res.render('usereventsdashboard', {
        user: user,
        req: req.user})
    })
  } else {
    req.flash('error', 'You need to log in to view your events')
    res.redirect('/auth/login')
  }
})
```
#### 3.  Ensuring that users are unable to join event if there are no more available spots, or if they have already joined the event.
A simple if else statement solved this problem - by using indexOf to check if the user id existed in the attendees array, and decreasing the number of spots each time a user was pushed into the attendees array.

```
router.put('/events/event/:id/joinevent', function (req, res) {
  eventVar.findOne({_id: req.params.id}, function (err, event) {
    if (err) {
      console.log(err)
      return
    } else {
      if (req.user && event.numberOfSpots && event.attendees.indexOf(req.user._id) < 0) {
        console.log('the user object is' + req.user)
        //reduce the number of spots by 1
        event.update({
          $push: {attendees: req.user},
          $set: {numberOfSpots: event.numberOfSpots-1}},
        function (err, data) {
          if (err) console.log(err)
        })
        event.save()
        // console.log(event);
        User.findById(req.user._id, function (err, user) {
          if (err) {
            console.log(err)
          } else {
            user.update({
              $push: {eventsAttending: event}}, function (err, data) {
                if (err)console.log(err)
            })
            user.save()
          }
        })
        req.flash('success', 'Your attendance has been saved')
        res.redirect('/public/events/event/' + req.params.id)
      }
```

## Further Developments
I hope to make a message board for each events so event attendees can communicate with one another.  A search function for events by event name/date would also be useful for quicker finds.


## Acknowledgments

* WDI instructor/TAs: Sharona YiSheng and Prima
* My extremely helpful and awesome WDI9-SG coursemates!
