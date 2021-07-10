const app = require('./app')
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const multer = require('multer')
// const upload = multer({
//     dest: 'docs',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/gm)) {
//             return cb(new Error('Please upload a Word document'))
//         }

//         cb(undefined, true)
//     }
// })

// const errorMiddleware = (req,res,next)=>{
//   throw new Error('From my middleware');
//   next();
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error,req,res,next)=>{ ///THIS SET OF CALLS MUST BE REQUIRED to let express know that we
//   res.status(400).send( {error:error.message});
// })

// app.use((req,res,next) => {
//   next();
//   // if (req.method==='GET'){
//   //   res.send('lol you did this to yourself GET is disabled');
//   // } else{
//   //   next();
//   // }
// })

// app.use((req,res,next)=>{
//   res.status(503).send('The website is under maintenance');
// })
// const main = async ()=>{
//   // const task = await Task.findById('607441528b6b9d0874261bad')
//   // await task.populate('owner').execPopulate() // go off find the user associated with this task and give its complete profile
//   // console.log(task);
//   const user = await User.findById('60743fbd39c08120cc1e7864');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);

// }

// main();

// const pet = {
//   name:"Hali"
// }
// pet.toJSON = function (){ // manipulating inside the function
//   console.log(this)
//   return this
// }
// console.log(JSON.stringify(pet));

// without middleware: new request -> run route handler

// With middleware: new request -> do something -> run route handler

// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'});
//   console.log(token);
//   const data = jwt.verify(token,'thisismynewcourse');
//   console.log(data)
// }

// myFunction();

// const myFunction = async () => {
//   const password = "ppblude2456";
//   const hashedPassword = await bcrypt.hash(password, 8); // 8 - nice efficient and good for many purposes... recommended by original creator
//   // console.log(password);
//   //console.log(hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   //console.log(isMatch);
// };

// myFunction();

// andrew -> oewjdiaojdiajdwio -> andrew = ENCRYPTION
// mypass -> jklefjaowjifoiajioawaj = HASHING not reversible.
