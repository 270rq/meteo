# meteo
docker run --name meteo -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1111 -e MYSQL_USER=katy -e MYSQL_PASSWORD=111 -e MYSQL_DATABASE=meteo -v mysql:/var/lib/mysql mysql:latest
1) нужно запустить city.py
2) нужно запустить meteo.sql
3) нужно запустить test.sql
