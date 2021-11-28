@echo off
echo Installing dependencies composer update...
call composer update
copy ".env.example" ".env"
php artisan key:generate
mysql -u root -e "CREATE DATABASE IF NOT EXISTS todo_list_ensolvers;"; 
php artisan migrate
echo Starting server in http://localhost:8000/...
php artisan serve