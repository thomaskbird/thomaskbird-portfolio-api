<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Service;

class ServiceController extends Controller {

    public function edit(Request $request, $id) {
        $service = Service::find($id);
        $input = $request->except('_token');
        $input['slug'] = str_slug($input['title']);

        foreach($input as $key => $item) {
            $service->$key = $item;
        }

        $service->save();

        return back();
    }

    public function view() {
        $services = Service::orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        return view('services.view', ['services' => $services]);
    }

    public function single($id) {
        $service = Service::find($id);
        return view('services.single', ['service' => $service]);
    }

    public function remove(Request $request, $id) {
        $service = Service::find($id);
        $service->delete();

        $request->session()->put('notification', [
            'class' => 'success',
            'msg' => 'Service deleted'
        ]);

        return back();
    }

    public function create(Request $request) {
        $input = $request->except('_token');

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:services'
        ]);

        if($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {

            $input['slug'] = str_slug($input['title']);

            $service = Service::create($input);

            if($service) {

                $request->session()->put('notification', [
                    'class' => 'success',
                    'msg' => 'Service created'
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