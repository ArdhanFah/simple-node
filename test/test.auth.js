const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app.js');

describe('Authentication', () => {
    let token;

    it('should register a new user', (done) =>{
        request(app)
            .post('/users/register')
            .send({ username: "usertest", password: "passtest", confirmPass: "passtest"})
            // .expect(201)
            .end((err, res) => {
                if(err) return done(err)
                // expect(res.body.message).to.equal('User created')
                done()
            })
    })

    it('should login and get token', (done) => {
        request(app)
            .post('/users/login')
            .send({ username: 'usertest', password: 'passtest'})
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                token = res.body.token
                expect(token).to.be.a('string')
                done()
            })
    })

    it('should access all user', (done) => {
        request(app)
            .get('/users')
            .set('auth', token)
            .expect(200)
            .end((err, res) => {
                if(err) return (err)
                // expect(res.body.message).to.equal('all user can be access')
                done()
            })
    })
})