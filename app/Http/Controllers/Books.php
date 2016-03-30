<?php

namespace App\Http\Controllers;

use App\Book;
//use App\BookAssociations;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

// Book controller class, Will interact with DB and perform required action.
class Books extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
              return response()->json(Book::orderBy('id', 'asc')->get());
        } else {
            return response()->json($this->show($id));
        }
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function storeBook(Request $request,$book) {
        $newBook = new Book;  
        // Decode the Json object to model.
        $book=json_decode($book,true);
        $book=$book['book'];
        
        // Validating object against the rules, 
        if($newBook->validate($book)) // If true
        {   
            // Update the object
            $newBook->title = $book['title'];
            $newBook->description = $book['description'];
            $newBook->genre = $book['genre'];         
            $newBook->isbn=$book['isbn'];
            
            // save the data in DB
            $newBook->save();
            // Return new id with message to Caller.
            $returnobj=array("id"=>""+$newBook->id, "message"=>'Book record successfully created');
            return response()->json($returnobj);
        }
        else // If false
        {
            // Get error information
            $errors = $newBook->errors();
            // Assign error code
            $returnobj=array($errors, "message"=>'99');
            // Return return object to caller.
            return response()->json($returnobj);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function fetchBookbyID($id) {        
        return response()->json(Book::find($id));        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Book  $book
     * @return Response
     */
    public function updateBook(Request $request,$book) {      
        // Convert Json data to Model object
        $book=json_decode($book,true);    
        
        $id=$book['id'];
        $book=$book['book'];  
        // Fetch data based on ID
        $fetchbook = Book::find($id);
        // Validate the Object as per Rules.
        if($fetchbook-> validate($book))
        { 
            // Updated the object with new data
            $fetchbook->title = $book['title'];
            $fetchbook->description = $book['description'];
            $fetchbook->genre = $book['genre'];         
            $fetchbook->isbn=$book['isbn'];
            
            // save the data
            $fetchbook->save();
            // update the return object with id and message
            $returnobj=array("id"=>""+$fetchbook->id, "message"=>'Successfully Updated Book'); 
            
            // return reponse to the caller.
            return  response()->json($returnobj);  
        } else   
        {
            $returnobj=array("error"=>"99", "message"=>'Validation Error');
            return response()->json($returnobj);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request  $request
     * @param int @$BookId
     * 
     * @return Response
     */
    public function destroyBook(Request $request,$BookId) {        
        $BookId=json_decode($BookId,true);
        $book = Book::find(""+$BookId);
        $returnobj=array("id"=>""+$book->id, "message"=>'Successfully Deleted Book'); 
        $book->delete();
        
        return  response()->json($returnobj); 
    }
}