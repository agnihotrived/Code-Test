<?php

namespace App\Http\Controllers;
use App\AuthorBookRelation;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controllers;
use Illuminate\Support\Facades\Input;

class AuthorBookRelations extends Controller
{
    public function AssociateAuthorBooks(Request $request,$authorbook)
    {
        $authorbook1 = new AuthorBookRelation;
        $author=json_decode($authorbook,true);
        $author=$author['authorbook'];
        $authorbook1->authorid = $author['authorid'];
        $authorbook1->bookid = $author['bookid'];
        $authorbook1->save();
        $returnobj=array("id"=>""+$authorbook1->id, "message"=>'Author Book Associated successfully');

         return  response()->json($returnobj);
      //  return $authorbook1;
    }

    public  function  RemoveAssociateAuthorBooks(Request $request,$authorbook){
        $author=json_decode($authorbook,true);
        $author=$author['authorbook'];
       // for ($x = 0; $x < count($author['books']); $x++) {
            $author = AuthorBookRelation::where('authorid', '=', $author['authorid'])->whereIn('bookid',$author['books'])-> delete();
     //   }
     //   $whereArray = array('authorid' => $author['authorid'],'bookid' => $author['bookid']);
     //   $author = AuthorBookRelation::whereArray($whereArray)-> delete();
     //   $author = AuthorBookRelation::where('authorid', '=', $author['authorid'])->where('bookid','=',$author['bookid'])-> delete();
        return "Author record successfully deleted #"+$author['authorid'];
    }

    public function FetchBooksForAuthors($id){
        return  response()->json(AuthorBookRelation::find($id));
        //  return $id;
    }

    public  function AddAssociateAuthorBooks(Request $request,$authorbook){
        $author=json_decode($authorbook,true);
        $author=$author['authorbook'];

        for ($x = 0; $x < count($author['books']); $x++) {
            //$y=$x - 1;
            $authorbook1 = new AuthorBookRelation;
            $authorbook1->authorid = $author['authorid'];
            $authorbook1->bookid = $author['books'][$x];
            $authorbook1->save();
            //return ($author['books'][$x]);
        }
       // $returnobj=array("id"=>""+$authorbook1->id, "message"=>'Author Book Associated successfully');

       // return  response()->json($returnobj);
        return ($author['books'][0]);
    }
}