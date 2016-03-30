<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

// Model Class to hold data related to relation between Author and Book
class BookAssociation extends Model
{
    protected $fillable = array('id', 'bookid', 'authorid');
    
    // Thought of creating parent child relation ship, not following the approach due to time constraint.
     function Author(){
        return $this->hasMany('App\Author');
    }
    
    // Thought of creating parent child relation ship, not following the approach due to time constraint.
    function Book(){
        return $this->hasMany('App\Book');
    }
}
