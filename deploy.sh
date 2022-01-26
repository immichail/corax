ng build --prod --configuration=production --base-href=./corax
scp -r ./dist/corax/* root@10.101.40.40:/usr/share/nginx/html/corax
