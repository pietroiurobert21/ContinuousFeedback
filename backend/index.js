const app = require('./app/app.js');
const jwt = require('jsonwebtoken');

const port = 3000;

const User = require('./database/models/User.js');

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

app.post('/register', async (req, res) => {
  const { email, password } = req.body;  // Get the username and password from the request body
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

app.get('/users/:id', authenticate, async (req, res) => {
  const user = await User.findOne({ 
    where: { 
      id: req.params.id
    }
  });  // Find the user with the given username
  delete user.dataValues.password;
  res.status(200).json(user);  // Send the user back as JSON
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;  // Get the username and password from the request body
    const user = await User.findOne({ 
      where: { 
        email
      }
    });  // Find the user with the given username
    if (!user) {  
      handleErrorResponse(res, error, 'User not found')
    }
    else {      
      const isMatch = await user.verifyPassword(password);  // Verify the password
      if (isMatch) {

        const token = jwt.sign({id: user.dataValues.id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
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


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});