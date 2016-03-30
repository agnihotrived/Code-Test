<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuthorsBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*
         * Create a table with name authors with Id, First Name, Last Name and About me as column
         * This table will store detail about all authors
         */
        Schema::create('authors', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('aboutme');           
            $table->timestamps();
        });
        
        /*
         * Create a table with name 'books'. columns include: id, title,description, genre, isbn.
         * This table will store detail about all books
         */
         Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('description');            
            $table->string('genre');
             $table->string('isbn')->nullable();
            $table->timestamps();
        });      
        
        /*
         * Create a table with name 'Book_Associations', Columns include; id, bookId and authorid.
         * This table act as a mapping table between book and author with many-to-many relationship.
         * Many book can be written by many authors, and many author can have multiple books.  
         */
        Schema::create('Book_Associations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('bookid');
            $table->integer('authorid');            
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('books');
         Schema::drop('authors');
          Schema::drop('Book_Associations');
    }
}
