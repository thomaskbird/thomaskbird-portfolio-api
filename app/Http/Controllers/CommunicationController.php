<?php namespace App\Http\Controllers;

use Mail;
use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Content;
use App\Models\Skill;
use App\Models\Contact;

class CommunicationController extends Controller {

    public function contact(Request $request) {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required'
        ]);

        if($validator->fails()) {
            return response(json_encode($validator->errors()), 400);
        } else {

            $contact = Contact::create($input);

            $sent = Mail::send('emails.contact-form', ['contact' => $contact], function ($m) use ($contact) {
                $m->from($contact['email'], $contact['name']);

                $m->to('thomas.bird1984@gmail.com', 'ThomasKBird.com')->subject('New website message from ThomasKBird.com');
            });

            return response(json_encode([
                'class' => 'success',
                'msg' => 'Your message has been submitted we\'ll contact you back as soon as possible!'
            ]));
        }
    }
}