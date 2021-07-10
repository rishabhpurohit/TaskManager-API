const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {user1,user1Id,setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)


// beforeEach(async () =>  {
//     await User.deleteMany();
//     await new User(user1).save();
// })
// afterEach(()=>{

// })
 
test('Should create task for user', async () => {
    
})