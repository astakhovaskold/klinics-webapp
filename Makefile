build:
	- docker build -t astakhovaskold/klinics-webapp -f Dockerfile .

run:
	- docker run -p 3000:3000 --name=klinics-webapp_prod --network=klinics-webapp_klinics-network --env-file .env.production -d astakhovaskold/klinics-webapp

rm:
	- docker rm -f klinics-webapp_prod

rebuild:
	- make rm && make build && make run

drone-ci:
	- docker run \
 		--detach \
        --volume=/var/lib/drone:/data \
        --env=DRONE_GITHUB_CLIENT_ID=0fd372a92edbd546133f \
        --env=DRONE_GITHUB_CLIENT_SECRET=8985f3f8dd55e0ee5fef0dafa0d48d8040dcb336 \
        --env=DRONE_RPC_SECRET=115cbc88b04ae6f6f9d61a16a1cc64c9 \
        --env=DRONE_SERVER_HOST=localhost \
        --env=DRONE_SERVER_PROTO=https \
        --env=DRONE_USER_CREATE=username:astakhovaskold,machine:false,admin:true \
        --publish=8888:80 \
        --restart=always \
        --detach=true \
        --name=drone \
        drone/drone:2

drone-runner:
	- docker run --detach \
        --volume=/var/run/docker.sock:/var/run/docker.sock \
        --env=DRONE_RPC_PROTO=http \
        --env=DRONE_RPC_HOST=localhost:8888 \
        --env=DRONE_RPC_SECRET=115cbc88b04ae6f6f9d61a16a1cc64c9 \
        --env=DRONE_RUNNER_CAPACITY=2 \
        --env=DRONE_RUNNER_NAME=drone-runner \
        --publish=3000:3000 \
        --restart=always \
        --name=runner \
        drone/drone-runner-docker:1

drone-up:
	- docker container rm -f drone runner && make drone-ci && make drone-runner

up:
	- docker run --detach \
            --label=traefik.enable=true \
            --label=traefik.port=3000 \
            --label=traefik.docker.network=web \
            --label=traefik.http.routers.drone.entrypoints=websecure \
            --label="traefik.http.routers.api.rule=(Host('klinics.webber.pw') && PathPrefix('/api'))" \
            --label=traefik.http.routers.mongo.tls.certresolver=letsEncrypt \
            --restart=always \
            --name=klinics-webapp_dev \
            astakhovaskold/klinics-webapp:develop
