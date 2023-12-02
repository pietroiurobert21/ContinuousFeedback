const app = require('./app/app.js');
const port = 3000;

const User = require('./database/models/User.js');

const handleErrorResponse = (res, error, message) => { 
  console.error(`Error: ${message}`, error); 
  return res.status(500).json({ success: false, message: `Error ${message}.` }); 
};

app.get('/users', async (req, res) => {
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
  const user = await User.create({ email, password });  // Create a new user

  delete user.dataValues.password;  // Delete the password from the returned object so it doesn't get sent to the client
  res.json(user);  // Send the new user back as JSON
});

app.get('/user/:id', async (req, res) => {
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
        res.status(200).json(user);  // Send the user back as JSON
      }
      else {
        res.status(404).json({ success: false, message: 'Incorrect password.' });
      }

    }
  } catch (error) {
    handleErrorResponse(res, error, 'User not found')
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});