process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testUser;

beforeEach( async () => {
    const result = await db.query(`INSERT INTO users (name, type) VALUES ('mike','admin') RETURNING id, name, type`);
    testUser = result.rows[0]
    
})

afterEach( async () =>{
    
    await db.query('DELETE FROM users')})

afterAll( async () => { await db.end()})


// describe("testing test-user", ()=>{
//     test("USER", ()=>{
//         console.log(testUser);


//     })
//     expect(1).toBe(1);
// })


//  GET /users returns  all users

describe("GET /users", () => {

    test("Get a list with one user", async ()=>{
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({users:[testUser]})
    })
})

//  GET /users returns  all users

describe("GET /users/:id", () => {


    test("Get a single user", async ()=>{
        const res = await request(app).get(`/users/${testUser.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({user:testUser})
    })
})

describe("POST /users creates a single user", ()=>{
    test("Creates a single user", async ()=>{
        const res = await request(app).post(`/users`).send({name:"Billy", type:"staff"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ user:{id: expect.any(Number), name:"Billy",type:"staff"}}
        );
        })


} )

describe("PATCH /users updates a single user", ()=>{
    test("Updates a single user", async ()=>{
        const res = await request(app).patch(`/users/${testUser.id}`).send({name:"update", type:"admin"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ user:{id: expect.any(Number), name:"update",type:"admin"}}
        );
        })


} )

describe("DELETE /users updates a single user", ()=>{
    test("Deletes a single user", async ()=>{
        const res = await request(app).delete(`/users/${testUser.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({msg:"deleted"})
        })


} )