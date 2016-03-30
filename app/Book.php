<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = array('id', 'title', 'description','genre','isbn');
        
    // Create rule for validation.
    private $rules = array(
        'title' => 'required', // title is required
        'description'  => 'required', // description is required
        'genre'  => 'required', // genre is required
        'isbn' => 'required' // isbn is required
    );

    // variable to hold the error data, which will assigned if any validation check fails.
    private $errors;

    // Validate the data as per rules
    public function validate($data)
    {
        // make a new validator object
        $v = \Validator::make($data, $this->rules);

        // check for failure
        if ($v->fails())
        {
            // set errors and return false
            $this->errors = $v->errors();
            return false;
        }

        // validation pass
        return true;
    }
    
    // will provide controller with error information if any.
    public function errors()
    {
        return $this->errors;
    }
}
