import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UsersModel';
import admin from './mocks/loginMock.test'

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
           // sinon.stub( bcrypt, "compareSync").returns(true),
        chaiHttpResponse = await chai.request(app).post('/login').send(admin);
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.have.property('token');
    });

    afterEach(sinon.restore);
});

