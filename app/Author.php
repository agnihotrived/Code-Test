<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

// Author Class will hold the data related to Author Object.
class Author extends Model {

    protected $fillable = array('id', 'firstname', 'lastname', 'aboutme');
    // Rules to validate the data for the model
    private $rules = array(
        'firstname' => 'required', // First name is required feild
        'lastname' => 'required', // Last name is required feild
        'aboutme' => 'required' // About Me is required feild
    );
    private $errors;

    // Function to validate data
    public function validate($data) {
        // make a new validator object
        $v = \Validator::make($data, $this->rules);

        // check for failure
        if ($v->fails()) {
            // set errors and return false
            $this->errors = $v->errors();
            return false;
        }

        // validation pass
        return true;
    }

    // Will return error, if generated during validation check.
    public function errors() {
        return $this->errors;
    }
}
