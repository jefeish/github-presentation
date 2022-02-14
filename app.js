import { Octokit, App } from "octokit";

// don't proceed if no PAT is provided
if (!process.env.GITHUB_PAT) {
  throw new Error("The environment variable GITHUB_PAT must be provided.")
}

// instantiate octokit with our PAT
const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

// attempt login
const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();

console.log("Hello, %s", login);