up:	do own nginxpermission chmod 

do:
	docker exec catchshape_nodejs_1 $(COM)

own:
	docker exec catchshape_nodejs_1 chown 1000:1000 -R ./

nginxpermission:
	docker exec catchshape_nodejs_1 chown 1000:1000 -R ./

chmod:
	chmod 777 -R ./