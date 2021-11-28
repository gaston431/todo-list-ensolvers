Develoment Tools:
	Operating System: Microsoft Windows 10
	XAMPP v3.3.0
		Apache/2.4.51 (Win64) OpenSSL/1.1.1l PHP/7.3.31 MariaDB 10.4.21
	Composer: dependency manager for php 2.1.12 
	API Backend:
		Laravel 8
	Frontend App:
		React 17.0.2 (with Node.js installation)

GitHub repository: https://github.com/gaston431/todo-list-ensolvers.git
	backend branch: "master"
	frontend orphan branch: "frontendReact"

Instructions to run app:
	API Backend:
		Run git clone https://github.com/gaston431/todo-list-ensolvers.git
		Run batch file script_backend.bat (for Windows), if not work run:
			-composer update (install dependencies)
			-copy ".env.example" ".env" (create file .env with content .env.example)
			-php artisan key:generate (generate key for .env file)
			-mysql -u root -e "CREATE DATABASE IF NOT EXISTS todo_list_ensolvers;" (create database named todo_list_ensolvers)
			-php artisan migrate (create database tables)
			-php artisan serve (start server)
		url api: http://localhost:8000/api/items
	Frontend App:
		In different folder run: git clone -b frontendReact https://github.com/gaston431/todo-list-ensolvers.git
		Run batch file script_frontend.bat (for Windows), if not work run:
			npm install (Dependencies: bootstrap, reactstrap lastest versions)
			npm start (Start server)
		url app: http://localhost:3000/