up:	do own nginxpermission chmod 


do:
	docker exec practice_php-fpm_1 $(COM)

own:
	docker exec practice_php-fpm_1 chown 1000:1000 -R ./

nginxpermission:
	docker exec practice_nginx_1 chown 1000:1000 -R ./

chmod:
	chmod 777 -R ./


