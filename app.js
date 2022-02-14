import { Octokit, App } from "octokit";
import * as http from 'http';
import crypto from 'crypto';

// don't proceed if no PAT is provided
if (!process.env.GITHUB_PAT || !process.env.SECRET_TOKEN) {
  throw new Error("Environment variable GITHUB_PAT and SECRET_TOKEN must be provided.")
}

// instantiate octokit with our PAT
const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
const port = 4567;

// reusable: writes the http status code and sends the message
function respond(resObject, code, message) {
  console.log(message);
  resObject.writeHead(code);
  resObject.end(message);
}

// set up local server
const server = http.createServer(async function (req, res) {

  //console.log(req.headers);

  // get body sent
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });

  // on end of receiving body
  req.on('end', async () => {

    // attempt to parse the response as JSON
    const data = JSON.parse(body);

    // make sure our request signature is valid
    const sigHeaderName = 'x-hub-signature-256';
    const sigHashAlg = 'sha256';
    const sig = Buffer.from(req.headers[sigHeaderName] || '', 'utf8');
    const hmac = crypto.createHmac(sigHashAlg, process.env.SECRET_TOKEN);
    const sigString = sigHashAlg + '=' + hmac.update(body).digest('hex')
    const digest = Buffer.from(sigString, 'utf8');
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      respond(
        res,
        403,
        `Signature did not match.`
      );
      return;
    }

    // attempt login
    const {data: { login },} = await octokit.rest.users.getAuthenticated();

    // determine if this is a repository related payload
    if (data.action && data.repository) {

      // set some static vars
      const owner = data.repository.owner.login;
      const repo = data.repository.name;

      // do tasks based off of
      switch (data.action) {

        // when a repository is created
        case "created":

          try {

            // create the main branch by adding an initial commit via contents
            const {data: createMainBranch} = await octokit.request(
              "PUT /repos/{owner}/{repo}/contents/README.md",
              {
                owner: owner,
                repo: repo,
                branch: "main",
                message: "Initial commit.",
                content: Buffer.from(`# ${repo}`).toString('base64')
              }
            );
            
            // secure the main branch
            await octokit.request(
              "PUT /repos/{owner}/{repo}/branches/{branch}/protection",
              {
                owner: owner,
                repo: repo,
                branch: "main",
                enforce_admins: true,
                required_status_checks: null,
                required_pull_request_reviews: {
                  dismissal_restrictions: {},
                  dismiss_stale_reviews: true,
                  require_code_owner_reviews: true,
                  required_approving_review_count: 2
                },
                restrictions: null,
                required_linear_history: false,
                allow_force_pushes: false,
                allow_deletions: false,
                required_conversation_resolution: true
              }
            );

            // create the dev branch
            await octokit.request(
              `POST /repos/{owner}/{repo}/git/refs`,
              {
                owner: owner,
                repo: repo,
                ref: "refs/heads/dev",
                sha: createMainBranch.commit.sha
              }
            );

            // secure the dev branch
            await octokit.request(
              "PUT /repos/{owner}/{repo}/branches/{branch}/protection",
              {
                owner: owner,
                repo: repo,
                branch: "dev",
                enforce_admins: false,
                required_status_checks: null,
                required_pull_request_reviews: {
                  dismissal_restrictions: {},
                  dismiss_stale_reviews: true,
                  require_code_owner_reviews: false,
                  required_approving_review_count: 1
                },
                restrictions: null,
                required_linear_history: false,
                allow_force_pushes: false,
                allow_deletions: false,
                required_conversation_resolution: false
              }
            );

            // send a response
            respond(res, 200, "Ok");

          } catch (err) {
            // send an error
            respond(res, 500, err);
          }
          
          
          break;
        default:
          respond(res, 405, "Unsupported action.");
          break;
      }
    } else {
      respond(res, 405, "Unsupported endpoint.")
    }

    return;
  });

});

server.listen(port);
console.log(`Listening on port ${port}...`)