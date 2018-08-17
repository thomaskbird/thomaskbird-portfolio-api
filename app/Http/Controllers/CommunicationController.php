<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Content;
use App\Models\Skill;

class CommunicationController extends Controller {

    public function contact(Request $request) {
        $input = $request->all();

        $input['status'] = 'SUCCESS';

        return response(json_encode($input));
    }
}