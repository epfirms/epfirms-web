import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { GithubService } from '@modules/github/services/github.service';
import { Service } from 'typedi';
import { Octokit } from '@octokit/core';

@Service()
export class GithubController {
  constructor() {}

  public async createGHIssue(req: Request, res: Response): Promise<any> {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_SECRET_TOKEN });
      const data = await octokit.request("POST /repos/{owner}/{repo}/issues", {
  owner: "epfirms",
  repo: "epfirms-web",
  title: req.body.type === 'bug' ? 'Bug Report' : 'Feature Request',
  body: req.body.details,
  assignees: ["BridgerJones", "jaerqs"],
  label: req.body.type === 'bug' ? ['bug'] : ['feature request'],
});
      console.log('octokit', data);
      res.status(StatusConstants.CREATED).send(data);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }
}
