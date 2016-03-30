<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BookAssociation;
use App\Book;
use App\Http\Requests;
use Illuminate\Http\Response;
use App\Http\Controllers\Controllers;
use Illuminate\Support\Facades\Input;

// Book Association controller class, Will interact with DB and perform required action.
class BookAssociations extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            return response()->json(BookAssociation::orderBy('id', 'asc')->get());
        } else {
            return response()->json($this->show($id));
        }
    }

    /**
     * Associate Author with book.
     * 
     * @param Request $request
     * @param type $authorbook
     * @return type
     */
    public function AssociateAuthorBooks(Request $request, $authorbook) {
        $author = json_decode($authorbook, true);
        $author = $author['authorbook'];

        for ($x = 0; $x < count($author['books']); $x++) {
            //$y=$x - 1;
            $authorbook1 = new BookAssociation;
            $authorbook1->authorid = $author['authorid'];
            $authorbook1->bookid = $author['books'][$x];
            $authorbook1->save();
            //return ($author['books'][$x]);
        }
        return ($author['books'][0]);
    }

    /**
     * Remove Book assocition from the author
     * 
     * @param Request $request
     * @param type $authorbook
     * @return type
     */
    public function removeBookAssociatedToAuthor(Request $request, $authorbook) {
        $author = json_decode($authorbook, true);
        $author = $author['authorbook'];

        $author = BookAssociation::where('authorid', '=', $author['authorid'])->whereIn('bookid', $author['books'])->delete();

        return "Author record successfully deleted #" + $author['authorid'];
    }
}