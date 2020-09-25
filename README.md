docker build -t 100111/webuser:1.0.13 . && docker push 100111/webuser:1.0.13
docker run -d -p 3002:3000 --name webuser:1.0.13 100111/webuser:1.0.13
docker push 100111/webuser:1.0.13
docker pull 100111/webuser:1.0.13
docker rm -f 100111/webuser:1.0.13
git add . && git commit -m "1.0.13"

prod: 
docker run -d -p 80:3000 --name webuser-1.0.13 100111/webuser:1.0.13
