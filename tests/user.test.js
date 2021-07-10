const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {user1,user1Id,setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

// beforeEach(async () =>  {
//     await User.deleteMany();
//     await new User(user1).save();
// })
// afterEach(()=>{

// })

test('Should sing up a new user',async ()=>{
    const response = await request(app).post('/users').send({
        name:'rp',
        email:'dem77@gmail.com',
        password:'MyPass222121281820#@^!82',
    }).expect(201);

    // Assert that the database was changed correctly (new user with same id)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();
    // Assertions about the response
    //expect(response.body.user.name).toBe('Xiao')
    expect(response.body).toMatchObject({
        user:{
            name:'rp',
            email:'dem77@gmail.com',
        },
        token:user.tokens[0].token
    })
    // password should be encrypted
    expect(user.password).not.toBe('MyPass222121281820#@^!82')
    
})

test('Should log in a test user', async ()=>{
    const response = await request(app).post('/users/login').send({
        email:user1.email,
        password:user1.password,
    }).expect(200);

    const user = await User.findById(response.body.user._id);
    expect( response.body.token).toBe(user.tokens[1].token);
})

test('Should not log in non-existent user', async()=>{
    await request(app).post('/users/login').send({
        email:user1.email,
        pass:'sakdajs.com'
    }).expect(400);
})

test('Should get profile for user',async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401);
})


test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById(user1Id)
    expect(user).toBeNull();
})

test('Should not delete account for unauthorized user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
})


test('Should upload avatar image', async ()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(user1Id)
    expect(user.avatar).toEqual(expect.any(Buffer))// objects cannot be compared firectly { } === { } this is worng false
})

test('Should update valid user fields', async ()=>{
    await request(app)
        .patch('/users/me')
        .send({
            name:'xxxo'
        })
        .set('Authorization',`Bearer ${user1.tokens[0].token}`)
        .expect(200);
    const user = await User.findById(user1Id);
    expect(user.name).toEqual('xxxo')
})

test('Should not update invalid user fields', async ()=>{
    await request(app)
    .patch('/users/me')
    .send({
        location:'Varanasi'
    })
    .set('Authorization',`Bearer ${user1.tokens[0].token}`)
    .expect(400);
})