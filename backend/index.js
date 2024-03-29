const app = require('./app/app.js');
const jwt = require('jsonwebtoken');

const port = 3000;

// Database connection
const User = require('./database/models/User.js');
const Activity = require('./database/models/Activity.js');
const ActivityLog = require('./database/models/ActivityLog.js');
User.hasMany(Activity, { foreignKey: 'userId' });
Activity.hasMany(ActivityLog, { foreignKey: 'activityId' });

// Error response handler
const handleErrorResponse = (res, error, message) => { 
  console.error(`Error: ${message}`, error); 
  return res.status(500).json({ success: false, message: `Error ${message}.` }); 
};

// middleware to verify token
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (token == null) return res.sendStatus(401) 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user; 
    next();
  });
};

// Get all activities of a user
app.get('/my-profile', authenticate, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ 
      where: { 
        id: userId
      }
    });  // Find the user with the given username
    delete user.dataValues.password;
    res.status(200).json(user);  // Send the user back as JSON
  } catch (error) {
    handleErrorResponse(res, error, 'User not found')
  }
});

// Get all activities of a user
app.get('/my-activities/:userId', authenticate, async (req, res) => {
  const userId = req.params.userId;
  try {
    const activities = await Activity.findAll({ 
      where: { 
        userId
      }
    });  // Find the user with the given username
    res.status(200).json(activities);  // Send the user back as JSON
  } catch (error) {
    handleErrorResponse(res, error, 'Activities not found')
  }
});

// Get all users
app.get('/users', authenticate , async (req, res) => {
  try {
      const users = await User.findAll();
      users.forEach(user => {
        delete user.dataValues.password;  
      });
        
      res.status(200).json(users); 

  } catch (error) {
    handleErrorResponse(res, error, 'Users not found')
  }
});

// Get all activities
app.get('/activities', authenticate , async (req, res) => {
  try {
      const activities = await Activity.findAll();
      res.status(200).json(activities); 

  } catch (error) {
    handleErrorResponse(res, error, 'Activities not found')
  }
});


// Get a user by username
app.get('/activity/:code', async (req, res) => {
  const code = req.params.code;
  console.log(code)
  try {
      const activity = await Activity.findOne({ 
        where: { 
          code: code
        }
      });
      if (!activity) {  
        res.status(404).json({success:"false", message:'Activity not found' })
       }
      else
      res.status(200).json(activity); 

  } catch (error) {
    handleErrorResponse(res, error, 'Activity not found')
  }
});


// Create a new activity
app.post('/activities/:userId', authenticate , async (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, message: 'Missing fields' });
    return
  }
  try {
      const activity = await Activity.create({name, userId});
      res.status(200).json(activity); 
  } catch (error) {
    handleErrorResponse(res, error, `Error creating activity ${name}.`)
  }
});


// Register route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;  // Get the username and password from the request body
  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Missing fields' });
    return
  }
  try {
    const user = await User.create({ email, password });  // Create a new user
    delete user.dataValues.password;  // Delete the password from the returned object so it doesn't get sent to the client
    res.status(201).json({success: true, message: 'Successfully registered'})  // Send the new user back as JSON
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ success: false, message: 'User already exists' });
    }
  }
});


// Get a user by username
app.get('/users/:id', authenticate, async (req, res) => {
  const user = await User.findOne({ 
    where: { 
      id: req.params.id
    }
  });  // Find the user with the given username
  delete user.dataValues.password;
  res.status(200).json(user);  // Send the user back as JSON
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;  // Get the username and password from the request body
  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Missing email or password' });
    return
  }
  try {
    const user = await User.findOne({ 
      where: { 
        email
      }
    });  // Find the user with the given username
    if (!user) {  
     res.status(404).json({success:"false", message:'User not found' })
    }
    else {      
      const isMatch = await user.verifyPassword(password);  // Verify the password
      if (isMatch) {

        const token = jwt.sign({id: user.dataValues.id}, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ success: true, message: 'Authentication successful!', token: token });
      }
      else {
        res.status(401).json({ success: false, message: 'Incorrect password.' });
      }

    }
  } catch (error) {
    handleErrorResponse(res, error, 'User not found')
  }
});





// emoji_count_incrementation
app.post('/emoji_count_incrementation/:id', async (req, res) => {
  const id = req.params.id;
  const emoji = req.body.emoji;
  try {
    const activity = await Activity.findOne({ 
      where: { 
        id: id
      }
    });  // Find the user with the given username
    if (emoji == 1)
      activity.emoji_1_count += 1;
    else if (emoji == 2)
      activity.emoji_2_count += 1;
    else if (emoji == 3)
      activity.emoji_3_count += 1;
    else 
      activity.emoji_4_count += 1;
    await activity.save();
    res.status(200).json(activity); 
  } catch (error) {
    handleErrorResponse(res, error, 'Activity not found')
  }
});



// activate an activity
app.put('/changeactivity/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const activity = await Activity.findOne({ 
      where: { 
        id: id
      }
    });
    if (activity.isActive == true)
      activity.isActive = false;
    else
      activity.isActive = true;
    await activity.save();
    res.status(200).json({message: "activity is active", activity}); 
  } catch (error) {
    handleErrorResponse(res, error, 'Activity not found')
  }
})



// ActivityLog

app.get('/activitylog/:activityId', async (req, res) => {
  const activityId = req.params.activityId;
  try {
    const activitylog = await ActivityLog.findAll({ 
      where: { 
        activityId: activityId
      }
    });
    res.status(200).json(activitylog);
  } catch (error) {
    handleErrorResponse(res, error, 'Activity not found')
  }
})

app.post('/activitylog/:activityId', async (req, res) => {
  const activityId = req.params.activityId;
  const date = req.body.date;
  const emoji = req.body.emoji;
  try {
    const activitylog = await ActivityLog.create({activityId, date, emoji});
    res.status(200).json(activitylog);
  } catch (error) {
    handleErrorResponse(res, error, 'Activity not found')
  }
})



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});