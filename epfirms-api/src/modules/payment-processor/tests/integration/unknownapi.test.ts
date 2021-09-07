require('module-alias/register')
import { server } from "@src/core/Server";
import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import { Express } from 'express'
import { StatusConstants } from "@src/constants/StatusConstants";
import { epfserver } from "../../../../../index";

chai.use(chaiHttp);

describe("Non Existing API Error check", async () => {
    
    let app = await epfserver;

    it("It Should return a status 400", done => {
        chai
            .request(app)
            .get("/abcd")
            .end((err, res) => {
                expect(res).to.have.status(StatusConstants.NOT_FOUND);
                expect(res.text).to.equals(StatusConstants.NOT_FOUND_MSG);
                done();
            });
    });
})