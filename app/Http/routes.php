<?php

use Illuminate\Http\Request;
use App\Author;
use App\Book;
use App\Author_Book;
use Illuminate\Http\Response;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::post('/codetest/public/authors/update/{author}', 'Authors@updateAuthor');
Route::post('/codetest/public/authors/{author}/', 'Authors@storeAuthor');
Route::delete('/codetest/public/authors/{id}', 'Authors@destroyAuthor');
Route::get('/codetest/public/authors/{id?}', 'Authors@index');

Route::post('/codetest/public/authors_book_relation/AddBooksToAuthor/{authorbook}', 'BookAssociations@AssociateAuthorBooks');
Route::delete('/codetest/public/authors_book_relation/RemoveBooksFrmAuthor/{authorbook}/', 'BookAssociations@removeBookAssociatedToAuthor');
Route::get('/codetest/public/authors_book_relation/data/{id?}', 'BookAssociations@index');

Route::post('/codetest/public/books/update/{book}', 'Books@updateBook');
Route::post('/codetest/public/books/{book}', 'Books@storeBook');
Route::delete('/codetest/public/books/{id}', 'Books@destroyBook');
Route::get('/codetest/public/books/{id?}', 'Books@index');

Route::get('/', function () {
    return view('index');
});

Route::group(['middleware' => 'web'], function () {
    //
});