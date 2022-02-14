# Demo Presentation
Below are my notes, how-to, and original instructions in regards to this solution.

## Notes

### Outline

1. Why to secure?
2. How to secure repositories in Github?
   1. Create a webhooks for the organization (https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks)
   2. 
3. References
   1. REST API: https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api
   2. 

---

## How-To

---

## Original Instructions
Customers frequently request our assistance in progressing their business objectives. Articulating how we can help them achieve a solution is a key capability to be successful. These requests are often centered around a technical topic. We would like to gain insight into how you approach a topic and how you describe a proposed solution. Since these requests may require you to learn new technical concepts, this exercise will provide an opportunity for us to see your approach and aptitude in meeting these customers' needs.

Be prepared to demo/present your solution to the team. We want to understand your thought process and want you to walk us through your results. Feel free to use any presentation tool/method you are comfortable with. If you use a presentation (PowerPoint, Google Slides, etc.), a default theme is preferred (no need to add advanced features as the overall aesthetic of the presentation isn’t evaluated).

### Customer scenario
Let’s take a look at the customer scenario: "Our security team is asking for help ensuring proper reviews are being done to code being added into our repositories. We have hundreds of repositories in our organization. What is the best way we can achieve at scale? We are new to some of the out-of-the-box settings and the GitHub API. Can you please help us create a solution that will accomplish this for our security team?"

### Background knowledge and assumptions
- You can create and use a new GitHub repository to develop and present the solution
- Assume you are the named GitHub contact for the customer. You will build and present the example to the customer
- GitHub has more than one API interface along with API libraries. Be prepared to explain the hows and whys in your design
- Technical guidance: Organization events and protected branches are useful features to help drive your solution. Also, don’t forget to check the GitHub Docs
- The first branch in a new GitHub repository will be created once a commit has been made. One idea is to have a README created with each new repository, so that the first branch is created
- Documentation is highly valued at GitHub

### Solution Requirements
We are most interested in your approach, the mindset you apply, and how the solution is presented to your customer. The technical solution to accomplish this is to listen for organization events to know when a repository has been created. When the repository is created, please automate the protection of the default branch. Notify yourself with an @mention in an issue within the repository that outlines the protections that were added.

### Some things you will need:
- A GitHub account
- An organization (you can create one for free)
- A repository to store your solution/presentation. We will look at this together in our next conversation
- A component that listens for webhook deliveries. We don’t require a specific technology/runtime, use languages and tools you are already familiar with We strongly recommend using languages and tools you are already familiar with.
- A README.md file in your web service's repository that documents how to run and use your solution. 
 
### Challenge delivery
Please use the Greenhouse link in this email to submit the web address of your GitHub org for the solution you created upon completion. If you make the repository public our team members can view the repository.

### Attribution
Feel free to use existing resources to complete this task. If you use external resources please note them in the README of your repository. Let me know if you have any questions.