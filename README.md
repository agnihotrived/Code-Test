# Code-Test

Books & Authors
This is an application developed in Laravel Framework 5.2 and Angular JS

It is a single page application which helps maintain Books, Authors and their relationships. Fucntionality includes:
	Listing of all authors
	Add/ Update authors
	Delete authors
	Listing of all books
	Add/ Update books
	Delete books
	Author and Book association (with a Many-to-Many relationship in the DB)

Technology Stack
        Front-end 
        	Bootstrap 3.3.4
        	Angular 1.5
        	jQuery 2.1.4
        Back-end
                PHP Framework 5.6
                Laravel Framework 5.2
        
Requirements
        PHP >= 5.6.0
        Angular = 1.x
        
How to install

Windows : 
        Step 1: Get the code

                Option 1: Git Clone

                        $ git clone https://github.com/agnihotrived/Code-Test.git

                Option 2: Download the repository

                        https://github.com/agnihotrived/Code-Test/archive/master.zip

        Step 2: Use Composer to install dependencies

                        $ cd "Project Directory"

                        $ curl -s https://getcomposer.org/installer | php

                        $ php composer.phar install

                For Complete Reference see Laravel Installation

        Step 3: Configure Database

                Open the file app/config/database.php and edit it to match your local database settings.

                Open .env file and edit it to match your local database settings.
                
                Create the database

        Step 4: Create table

                Run the command to create tables:

                $ php artisan migrate

        Note: Run the above command wherever this project has been installed/ downloaded.

        see Laravel Migrations
        
 Linux:
 	Step 1:
		Clone the git code
	
	Step 2:
		Set up the server
			sudo apt-get update  
			sudo apt-get install php5 php5-mcrypt php5-curl php5-mysql
			sudo php5enmod mcrypt 
		
		Restart the apache server
			service apache2 restart 
	
	Step 3:
		Install & Run Composer
			cd /path/to/your/app
			curl -sS https://getcomposer.org/installer | php
			php composer.phar install 
	
	Step 4: 
		Configure Database

	                Open the file app/config/database.php and edit it to match your local database settings.
                	Open .env file and edit it to match your local database settings.
              		Create the database
              	
        Step 5: Create table

                Run the command to create tables:
                	$ php artisan migrate


Outside code

Bootstrap: http://getbootstrap.com/
jQuery: https://jquery.com/
AngularJS :https://angularjs.org/
