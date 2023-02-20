docker rmi -f $(docker images -q)
docker tag server:latest server:previous
docker tag client:latest client:previous
docker-compose up -d --build
