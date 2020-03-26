# node-gitlab-autodeploy

Automatic deployment for NodeJS apps with GitLab integration


# Description

This small NodeJS app provides a webhook for GitLab integration. No need for third-party auto-deployment services or apps, it uses pure NodeJS.


# Instructions

1. Prerequisites

- Node and npm are installed

- Your app is configured to run with PM2 app manager

2. Clone this repository to your server

3. Edit autodeploy.js:

- specify your app repository name

- change port number if needed

4. Edit bash shell deploy script:

- replace your_project_name with your project name

- replace your_project_folder with your target project folder, for example /home/user/app_folder

- replace your_app_name with your application name (assuming your are using PM2, otherwise restart your app different way) 

- add the following line after ```npm -i``` if your app requires npm build command:

```&& npm run build \```

- if your are using AdonisJS and want to run migrations on each deployment, add the following line before ```pm2 restart```:

```&& node ace migration:run```

5. Run ```npm -i``` in the autodeploy folder

6. Run the following command to include your autodeploy app to PM2 (don't forget to replace MyGitLabWebhookSecret with your secret token):

```MY_SECRET=MyGitLabWebhookSecret pm2 --name autodeploy start node -- ./autodeploy.js```

7. Open your project in GitLab and go to Settings -> Webhooks page. Specify http://your_server_ip_address:7345 (or another port if your changed it in autodeploy.js) as URL and MY_SECRET from the previous step as Secret Token. Save the webhook.

8. Once the webhook is added choose Test -> Push events for it on GitLab, check if you see ```Hook executed successfully: HTTP 200``` message. On your server run ```pm2 logs``` to check if the deployment has been processed successfully.


# Credits

Based on:

https://github.com/excaliburhan/node-gitlab-webhook

https://www.npmjs.com/package/github-webhook-handler

https://fsociety.at/automatic-deployment-from-github-to-your-server-with-no-third-party-app/

Uses:

https://www.npmjs.com/package/shelljs
