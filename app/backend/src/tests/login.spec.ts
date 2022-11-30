import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UsersModel';
import {admin, incorrectUser, role, token} from './mocks/loginMock.test'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testando a rota /login', () => {
    let chaiHttpResponse: Response;
    beforeEach(() => {
        sinon.stub(UserModel, "findOne").resolves({
            "email": "admin@admin.com",
            "password": "secret_admin"
          } as UserModel);
      });

    it('Verifica se ao fazer login com sucesso retorna um token', async () => {
        sinon.stub( bcrypt, "compareSync").returns(true),
        chaiHttpResponse = await chai.request(app).post('/login').send(admin);
        
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('Verifica login sem o campo de email', async () => {
        sinon.stub( bcrypt, "compareSync").returns(false),
        chaiHttpResponse = await chai.request(app).post('/login').send(admin.password)

        expect(chaiHttpResponse).to.have.status(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
    });

    it('Verifica login sem o campo de password', async () => {
        sinon.stub( bcrypt, "compareSync").returns(false),
        chaiHttpResponse = await chai.request(app).post('/login').send(admin.email)

        expect(chaiHttpResponse).to.have.status(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
    });

    it('Verifica login com email incorreto', async () => {
        sinon.stub( bcrypt, "compareSync").returns(false),
        chaiHttpResponse = await chai.request(app).post('/login').send(incorrectUser);

    expect(chaiHttpResponse).to.have.status(401)
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Incorrect email or password');
    });

    afterEach(sinon.restore);
});

