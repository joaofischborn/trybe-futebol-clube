import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamsModel from '../database/models/TeamsModel';
import teamsMock from './mocks/teamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testando a rota de /teams', () => {
    let chaiHttpResponse: Response

    afterEach(sinon.restore)

    it('Verifica se retorna todos os times', async () => {
        sinon.stub(TeamsModel, "findAll").resolves(teamsMock as TeamsModel[]);
        chaiHttpResponse = await chai.request(app).get('/teams').send()

    expect(chaiHttpResponse).to.have.status(200)
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
    })

    it('Verifica se encontra um time pelo id', async () => {
        sinon.stub(TeamsModel, "findOne").resolves(teamsMock[1] as TeamsModel);
        chaiHttpResponse = await chai.request(app).get('/teams/1').send()

    expect(chaiHttpResponse).to.have.status(200)
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock[1]);
    })
})