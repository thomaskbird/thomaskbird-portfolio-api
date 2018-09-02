<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Contact;

class MessageController extends Controller {

    public function view() {
        $messages = Contact::orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        return view('messages.view', ['messages' => $messages]);
    }

    public function single($id) {
        $message = Contact::find($id);
        $message->status = 'viewed';
        $message->save();
        return view('messages.single', ['message' => $message]);
    }

    public function remove(Request $request, $id) {
        $message = Contact::find($id);
        $message->delete();

        $request->session()->put('notification', [
            'class' => 'success',
            'msg' => 'Message deleted'
        ]);

        return back();
    }
}