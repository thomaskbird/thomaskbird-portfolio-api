<?php namespace App\Http\Controllers;

use App\Models\User;

class AdminController extends Controller {

    public function dashboard() {
        return view('admin.dashboard');
    }
}