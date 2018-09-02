<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Job;

class JobController extends Controller {

    public function edit(Request $request, $id) {
        $job = Job::find($id);
        $input = $request->except('_token', 'logo');
        $logo = $request->file('logo');

        if($logo) {
            $destinationPath = public_path() .'/img';
            $logoFilename = $this->cleanFilename($logo->getClientOriginalName());
            $logo->move($destinationPath, $logoFilename);

            $input['logo'] = $logoFilename;
        }

        foreach($input as $key => $item) {
            $job->$key = $item;
        }

        $job->save();

        return back();
    }

    public function view() {
        $jobs = Job::orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        return view('jobs.view', ['jobs' => $jobs]);
    }

    public function single($id) {
        $job = Job::find($id);
        return view('jobs.single', ['job' => $job]);
    }

    public function remove(Request $request, $id) {
        $job = Job::find($id);
        $job->delete();

        $request->session()->put('notification', [
            'class' => 'success',
            'msg' => 'Job deleted'
        ]);

        return back();
    }

    public function create(Request $request) {
        $input = $request->except('_token', 'logo');
        $logo = $request->file('logo');

        $validator = Validator::make( $request->all(), [
            'title' => 'required'
        ]);

        if($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {

            $destinationPath = public_path() .'/img';
            $logoFilename = $this->cleanFilename($logo->getClientOriginalName());
            $logo->move($destinationPath, $logoFilename);

            $input['logo'] = $logoFilename;

            $job = Job::create($input);

            if($job) {

                $request->session()->put('notification', [
                    'class' => 'success',
                    'msg' => 'Job created'
                ]);

            } else {

                $request->session()->put('notification', [
                    'class' => 'danger',
                    'msg' => 'Uh oh, something went wrong please try again!'
                ]);

            }

            return back();
        }
    }
}