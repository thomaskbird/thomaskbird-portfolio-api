<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Company;

class CompanyController extends Controller {
    public function companies() {
        $companies = Company::orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        return view('companies.view', ['companies' => $companies]);
    }

    public function single($id) {
        $company = Company::find($id);
        return view('companies.single', ['company' => $company]);
    }
}