<?php

namespace App\Http\Controllers;

use App\Author;
//use App\BookAssociation;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

//use App\Http\Requests;
//use App\Http\Controllers\Controllers;
//use Illuminate\Support\Facades\Input;

// Author controller class, Will interact with DB and perform required action.
class Authors extends Controller {

    /**
     * Display a listing of the resource.
     * @param  int  $id
     * @return Response
     */
    public function index($id = null) {
        if ($id === null) {
            return response()->json(Author::orderBy('id', 'asc')->get());
        } else {
            return response()->json($this->show($id));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Author  $author
     * @return Response
     */
    public function updateAuthor(Request $request, $author) {
        $author = json_decode($author, true);
        $id = $author['id'];
        $author = $author['author'];
        // Fetch the data based on ID.
        $authordb = Author::find($id);

        // Validate the data from the View
        if ($authordb->validate($author)) { // If valid
            
            // Update the object
            $authordb->firstname = $author['firstname'];
            $authordb->lastname = $author['lastname'];
            $authordb->aboutme = $author['aboutme'];
            // Save the object in DB.
            $authordb->save();
          
            $returnobj = array("id" => "" + $authordb['id'], "message" => 'Successfully Updated Author');
           
            // Return reponse to the caller function.
            return response()->json($returnobj);
        } else {
            $returnobj = array("error" => "99", "message" => 'Validation Error');
            return response()->json($returnobj);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @param Author $author
     * @return Response
     */
    public function storeAuthor(Request $request, $author) {
        $authornew = new Author;
        // Decode the Json object in Model.
        $author = json_decode($author, true);
        
        $author = $author['author'];
        // Validate the data.
        if ($authornew->validate($author)) { // If true.
            $authornew->firstname = $author['firstname'];
            $authornew->lastname = $author['lastname'];
            $authornew->aboutme = $author['aboutme'];
            // Save the data in DB
            $authornew->save();
            $returnobj = array("id" => "" + $authornew->id, "message" => 'Author record successfully created');
            
            return response()->json($returnobj);
        } else {
            $errors = $authornew->errors();
            $returnobj = array($errors, "message" => '99');
            return response()->json($returnobj);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function fetchAuthorbyID($id) {
        return response()->json(Author::find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * param Request $request
     * @param  int  $AuthorId
     * @return Response
     */
    public function destroyAuthor(Request $request, $AuthorId) {
        // Deecode the json data
        $AuthorId = json_decode($AuthorId, true);
        // Find the record based 
        $author = Author::find("" + $AuthorId);
        $author->delete();
        return "Author record successfully deleted #" + $author['id'];
    }
}
