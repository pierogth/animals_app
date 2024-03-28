# How to run instructions
## Prerequisites
In order to run this project you have to install Docker v24.0.7 (or greater) in your system

## Terminal Commands
Clone the project with: <code>git clone https://github.com/pierogth/animals_app.git</code>
Then go in the folder just created with: <code>cd animals_app</code><br />

In order to build the app and the DB in Docker, simply launch the command:

<code>docker compose up -d</code>

Wait that all is built, this may take a while because Docker have to pull the three images, then you can launch the automatic tests in the docker terminal of the container <b>animals_app-app-1</b>

To do this, first launch <code>docker exec -it animals_app-app-1 sh</code> to enter in the container running the backend nest JS app.

Once you are in the container terminal, you can launch the automatic test (Unit, Features and e2e) from the command:

<code>npm run test</code>

If you want launch only the automatic e2e test run the command <code>npm run test:e2e</code>

After that all docker containers are up and running, with browser if you go to <link>http://localhost:4200</link> you can see the Home Page of the frontend Angular JS app,

clicking the buttons you can create random animals, interact with them by the buttons in the card displaying single animal (speak, sleep, eat).

You can also create a personalized animal by clicking the button "create your animal"

The OpenAPI swagger documentation is available at <link>http://localhost:3000/api</link>
