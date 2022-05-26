require('module-alias/register')
import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import { epfserver } from "../../../../../index";

chai.use(chaiHttp);

describe("Non Existing API Error check", async () => {
    
    let app = await epfserver;

    it("It Should return a status 400", done => {
        chai
            .request(app)
            .get("/abcd")
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
})