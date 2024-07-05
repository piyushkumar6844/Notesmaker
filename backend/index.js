const connectToMongo = require('./db');
connectToMongo();
// const express = require('express')

//const mongoose = require('mongoose');
// const app = express()
// const port = 5000npm npm

// // app.get('/',(req,res)=>{
// //     res.send('hello world')
// // })

// app.listen(port, () => {
//     console.log(`iNotebook backend listening at http://localhost:${port}`)
//   })
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
// // })
// app.listen(port, () => {
//         console.log(`iNotebook backend listening at http://localhost:${port}`)
//       })



const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(cors())
app.use(bodyParser.json())





// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

///Route for the root URL
app.get('/', (req, res) => {
  res.send('2+3=5');
});
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))


// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Start the server
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
