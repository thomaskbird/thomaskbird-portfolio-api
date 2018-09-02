<?php namespace App\Http\Controllers;

use App\Models\User;
use Request;
use Auth;

class AuthenticationController extends Controller {

    public function login() {
        $input = Request::except('_token');

        if(Auth::attempt($input)) {
            return redirect()->route('dashboard');
        } else {
            return back();
        }
    }

    public function logout() {
        Auth::logout();
        return back();
    }
}
