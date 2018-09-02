<?php namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\User;
use App\Models\Skill;
use App\Models\Contact;
use App\Models\Content;
use App\Models\Service;

use Auth;
use Mail;
use Session;
use Validator;
use Illuminate\Http\Request;

class PublicController extends Controller {

    public function home() {
        $portfolio = Content::where('status', 'published')->whereHas('tags', function($query) {
            $query->where('slug', 'portfolio');
        })->orderBy('created_at', 'desc')->paginate(Config('global.slide_limit'));

        $post_latest = Content::whereHas('tags', function($query) {
            $query->where('slug', 'blog');
        })->orderBy('created_at', 'desc')->take(1)->first();

        $post_news = Content::whereHas('tags', function($query) {
            $query->where('slug', 'news');
        })->orderBy('created_at', 'desc')->take(1)->first();

        $post_testimonials = Content::whereHas('tags', function($query) {
            $query->where('slug', 'testimonials');
        })->orderBy('created_at', 'desc')->take(1)->first();

        $skills = $this->columnize(Skill::orderBy('priority', 'asc')->get()->toArray(), 3);

        return view('public.home', [
            'portfolio' => $portfolio,
            'skills' => $skills,
            'post_latest' => $post_latest,
            'post_news' => $post_news,
            'post_testimonials' => $post_testimonials
        ]);
    }

    public function content_index($type) {
        return view('public.content_list', []);
    }

    public function login() {
        if(Auth::check()) {
            return redirect()->route('dashboard');
        } else {
            return view('public.login');
        }
    }

    public function page($slug) {
        $content = Content::with('parent', 'portfolio')->whereRaw('slug = ? AND version_of = ?', [$slug, 0])->orderBy('created_at', 'desc')->first();        
        return view('public.page', ['content' => $content]);
    }

    public function resume() {
        $jobs = Job::orderBy('start', 'desc')->get();
        return view('public.resume', ['jobs' => $jobs]);
    }

    public function resume_print() {
        $jobs = Job::orderBy('start', 'desc')->get();
        return view('public.resume-print', ['jobs' => $jobs]);
    }

    public function services() {
        $services = Service::orderBy('created_at', 'desc')->paginate(config('global.paginate'));
        return view('public.services', ['services' => $services]);
    }

    public function contact() {
        $prob = [
            'start' => rand(1,10),
            'end' => rand(1,10)
        ];

        return view('public.contact', ['prob' => $prob]);
    }

    public function contact_post(Request $request) {
        $input = $request->except('_token');

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required'
        ]);

        if($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {

            if(($input['num_first'] + $input['num_end']) == $input['answer']) {
                $contact = Contact::create($request->except('_token', 'num_first', 'num_end', 'answer'));

                $sent = Mail::send('emails.contact-form', ['contact' => $contact], function ($m) use ($contact) {
                    $m->from($contact['email'], $contact['name']);

                    $m->to('thomas.bird1984@gmail.com', 'ThomasKBird.com')->subject('New website message from ThomasKBird.com');
                });

                $request->session()->put('notification', [
                    'class' => 'success',
                    'msg' => 'Your message has been submitted we\'ll contact you back as soon as possible!'
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

    public function search(Request $request) {
        $input = $request->all();
        $content = Content::whereRaw('version_of = ? AND status = ? AND title LIKE ?', [0, 'published', '%'. $input['term'] .'%'])->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));

        return view('public.content_list', ['content' => $content]);
    }

    public function blog() {
        $content = Content::where('version_of', 0)->whereHas('tags', function($query) {
            $query->where('slug', 'blog');
        })->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));

        return view('public.content_list', ['content' => $content]);
    }
}
