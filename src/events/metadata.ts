import { Repository } from "../common";
import { Metadata } from "./model";
import { Context } from "probot";

export const constructMetadata = async (
  repo: Repository,
  event: string,
  context: Context<any>,
): Promise<Metadata> => {
  const getPRTitle = async () => {
    return await context.octokit.pulls
      .get({
        owner: repo.owner,
        repo: repo.name,
        pull_number:
          context.payload.check_run.check_suite.pull_requests[0].number,
      })
      .then((res) => res.data.title);
  };

  let pull_request =
    event.split(".")[0] === "pull_request"
      ? {
          ref: context.payload.pull_request.head.ref,
          sha: context.payload.pull_request.head.sha,
          title: context.payload.pull_request.title,
          author: context.payload.pull_request.user.login,
          number: context.payload.pull_request.number,
          updated_at: context.payload.pull_request.updated_at,
          html_url: context.payload.pull_request.html_url,
        }
      : {
          ref: context.payload.check_run.check_suite.pull_requests[0].head.ref,
          sha: context.payload.check_run.check_suite.pull_requests[0].head.sha,
          title: await getPRTitle(),
          author: context.payload.sender.login,
          number: context.payload.check_run.check_suite.pull_requests[0].number,
          updated_at: context.payload.check_run.check_suite.completed_at,
          html_url: context.payload.check_run.check_suite.pull_requests[0].url,
        };
  return {
    repo: repo.name,
    owner: repo.owner,
    default_branch: context.payload.repository.default_branch,
    html_url: context.payload.repository.html_url,
    pull_request,
  };
};
