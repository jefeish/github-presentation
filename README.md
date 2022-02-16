# Github Presentation
This project is centered around a mock-customer scenario in which security for branches needs to be applied.

## Questions
1. What is the client name?
2. Who are the attendees (their names)?
3. What is the "langugage of choice" for client's developers?

## Notes
1. Official "octokit" wrapper has support for Ruby, .NET, and JavaScript. Other wrappers exist, but are third-party.
2. Free organizations can only protect public repositories.

## Demo
To see the code in action, follow the steps below.

### Steps
__Note__: all terminal commands should be ran from the cloned repository directory.

1. Clone this repository
2. Install Prerequisites
   1. Ngrok ([instructions](https://ngrok.com/download))
   2. Node.JS ([instructions](https://nodejs.org/en/download/))
3. Install node dependencies with the command `npm i`
4. Create a secret with the command `npm run secret`
5. Create a personal access token ([instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token))
6. Create env file:
   1. Make a copy of `env.demo` and save it as `env`.
   2. Update the contents, replacing all `<variables>` with the appropriate values from steps 4 and 5, then save.
   3. Source the environment file with the command `. ./env`
7. Create a new organization ([instructions](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch))
8.  Run Ngrok with the command `npm run server` (must stay running).
9.  Create a new webhook for your organization ([instructions](https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks))
    1.  Use `application/json` for `content type`
    2.  Use the Ngrok url from the terminal that is running it for `Payload URL`
    3.  For secret, paste the value from step #4.
    4.  For events, choose `Let me select individual events.` and check `Repositories`
    5.  Make sure `Active` is checked.
10. In a separate terminal, run command `npm run app`
11. Attempt to create a new public repository in your organization

### Outcome
The new repository will have two branches (`main` and `dev`) created automatically, as well as branch protection rules.

### Troubleshooting
- If the code fails after trying to protect the main branch, make sure you set the repository as public and NOT private.

### To Do
- Add an issue to the repository with an @ mention for myself. ***`???`***
---

## Additional Files
- `github-presentation.pptx`: contains the presentation slide deck.
