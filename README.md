# automate-api-dockerization

* `docker build -t my-api .`
* `docker run -it -p 9000:3000 my-api`
* `docker run -d -p 9000:3000 my-api`
* `docker ps`
* `docker kill <container id>`
* `docker-compose up`

DONE
* CRUD API with unit tests
* Push to Docker Hub via github actions

TODO:
* Swagger
* ESLint
* update readme
* Find a way to use ENV variables safely

resources used:
* https://www.restapitutorial.com/httpstatuscodes.html
* https://stackabuse.com/deploying-node-js-apps-to-aws-ec2-with-docker/
* https://www.youtube.com/watch?v=09lZdSpeHAk
* https://www.youtube.com/watch?v=CsWoMpK3EtE&t=448s
* https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b
* https://github.com/GenFirst/swagger-to-existing-nodejs-project/blob/master/backend/swagger.json
