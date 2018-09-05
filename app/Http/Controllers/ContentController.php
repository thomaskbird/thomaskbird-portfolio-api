<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Tag;
use App\Models\Job;
use App\Models\Skill;
use App\Models\Service;
use App\Models\Content;

class ContentController extends Controller {

    public function home() {
        $portfolio = Content::with('portfolio')->where('status', 'published')->whereHas('tags', function($query) {
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

        return response(json_encode([
            'portfolio' => $portfolio,
            'skills' => $skills,
            'post_latest' => $post_latest,
            'post_news' => $post_news,
            'post_testimonials' => $post_testimonials
        ]));
    }

    public function create(Request $request) {
        $input = $request->except('_token');

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:content'
        ]);

        if($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {

            $input['slug'] = str_slug($input['title']);
            $content = Content::create($input);

            if($content) {

                $request->session()->put('notification', [
                    'class' => 'success',
                    'msg' => 'Content created'
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

    public function edit(Request $request, $id) {
        $temp_content = Content::find($id);

        $original_content = $temp_content->toArray();
        $original_content['version_of'] = $original_content['id'];
        $new_revision = $this->create_revision($original_content);

        $input = $request->except('_token');

        $input['slug'] = str_slug($input['title']);
        foreach( $input as $key => $val ) {
            $temp_content[$key] = $val;
        }

        $temp_content->save();

        return back();
    }

    public function edit_images(Request $request, $id) {
        $input = $request->except('_token');
        $url = $request->get('url');
        $mobile = $request->file('mobile');
        $desktop = $request->file('desktop');
        $featured = $request->file('featured');

        $uploaded = $this->upload_portfolio_images($id, $mobile, $desktop, $featured, $url);
        return back();
    }

    public function upload_portfolio_images($post_id, $mobile, $desktop, $featured, $url) {
        $existing = Portfolio::where('post_id', $post_id)->first();

        $destinationPath = public_path() .'/img';

        if($mobile) {
            $mobileFilename = $this->cleanFilename($mobile->getClientOriginalName());
        }

        if($desktop) {
            $desktopFilename = $this->cleanFilename($desktop->getClientOriginalName());
        }

        if($featured) {
            $featuredFilename = $this->cleanFilename($featured->getClientOriginalName());
        }

        if($existing) {
            if($desktop) {
                $desktop->move($destinationPath, $desktopFilename);
                $existing->desktop = $desktopFilename;
            }

            if($mobile) {
                $mobile->move($destinationPath, $mobileFilename);
                $existing->mobile = $mobileFilename;
            }

            if($featured) {
                $featured->move($destinationPath, $featuredFilename);
                $existing->featured = $featuredFilename;
            }

            if($url) {
                $existing->url = $url;
            }

            $saved = $existing->save();
        } else {
            $input = [
                'post_id' => $post_id
            ];

            if($url) {
                $input['url'] = $url;
            }

            if($desktop) {
                $input['desktop'] = $desktopFilename;
            }

            if($mobile) {
                $input['mobile'] = $mobileFilename;
            }

            if($featured) {
                $input['featured'] = $featuredFilename;
            }

            $saved = Portfolio::create($input);
        }

        return $saved;
    }

    public function view(Request $request) {
        $input = $request->all();

        if(isset($input['type']) && $input['type'] != 'all') {
            $inputSelected = $input['type'];
            $contents = Content::with('parent')->whereRaw('version_of = ? AND type = ?', [0, $input['type']])->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        } else {
            $inputSelected = 'all';
            $contents = Content::with('parent')->whereRaw('version_of = ?', [0])->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        }

        $content_list = ['' => 'Select parent...'] + Content::where('version_of', 0)->lists('title', 'id')->toArray();
        $filters = [
            'all' => 'All',
            'page' => 'Pages',
            'post' => 'Posts'
        ];

        return view('content.view', ['contents' => $contents, 'content_list' => $content_list, 'filters' => $filters, 'input_selected' => $inputSelected]);
    }

    public function single($identifier, $contentType = false) {
        switch($contentType) {
            case 'skill':
                if(is_numeric($identifier)) {
                    $content = Skill::where('id', $identifier)->first();
                } else {
                    $content = Skill::where('slug', $identifier)->first();
                }
            break;
            case 'job':
                if(is_numeric($identifier)) {
                    $content = Job::where('id', $identifier)->first();
                } else {
                    $content = Job::where('company', $identifier)->first();
                }
            break;
            case 'service':
                if(is_numeric($identifier)) {
                    $content = Service::where('id', $identifier)->first();
                } else {
                    $content = Service::where('slug', $identifier)->first();
                }
            break;
            default:
                if(is_numeric($identifier)) {
                    $content = Content::with('parent', 'portfolio')->whereRaw('id = ? AND version_of = ?', [$identifier, 0])->with('portfolio')->first();
                } else {
                    $content = Content::with('parent', 'portfolio')->whereRaw('slug LIKE ? AND version_of = ?', [$identifier, 0])->with('portfolio')->first();
                }
            break;
        }

        return response(json_encode($content));
    }

    public function history_view( $id ) {
        $content = Content::whereRaw( 'version_of = ? OR id = ?', [$id, $id] )->orderBy('id', 'asc')->get();
        $content_list = ['' => 'Select parent...'] + Content::where('parent_id', 0 )->lists('title', 'id')->toArray();

        return view('content.single-history', ['content' => $content, 'content_list' => $content_list]);
    }

    public function compare( $id ) {
        $version_old = Content::find( $id );
        $version_current = Content::find( $version_old->version_of );

        return view('content.compare', ['version_old' => $version_old, 'version_current' => $version_current]);
    }

    public function revert( $id ) {

        $change_values = Content::find( $id );
        $current_page = Content::find( $change_values->version_of );
        $new_version_values = $current_page->toArray();
        $new_version_values['version_of'] = $current_page->id;

        $iterator = $change_values->toArray();
        unset( $iterator['id'], $iterator['version_of'] );

        foreach( $iterator as $key => $val ) {
            $current_page->$key = $change_values[$key];
        }

        $current_page->save();
        $new_version_created = $this->create_revision( $new_version_values );

        return redirect()->route('content_single', ['id' => $current_page->id]);
    }

    public function create_revision($new_revision) {
        unset($new_revision['created_at'], $new_revision['updated_at']);
        return Content::create($new_revision);
    }

    public function remove($id) {
        $content = Content::find($id);
        $portfolio = Portfolio::where('post_id', $id)->first();
    }

    public function tag_view($slug) {
        $content = Content::with('portfolio')->whereHas('tags', function($query) use ($slug) {
            $query->whereRaw('slug = ? AND version_of = ? AND type = ?', [$slug, 0, 'post']);
        })->orderBy('created_at', 'desc')->paginate(3);

        return response(json_encode($content));
    }

    public function services() {
        $services = Service::orderBy('created_at', 'desc')->paginate(config('global.paginate'));
        return response(json_encode($services));
    }

    public function sidebar_data() {
        $tags = Tag::all();
        $recent_posts = Content::whereRaw('type = ? AND version_of = ? AND status = ?', ['post', 0, 'published'])->orderBy('created_at', 'desc')->take(5)->get();

        return response(json_encode(['tags' => $tags, 'recent_posts' => $recent_posts]));
    }

    public function search($term) {
        $content = Content::whereRaw('version_of = ? AND status = ? AND title LIKE ?', [0, 'published', '%'. $term .'%'])->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));

        return response(json_encode($content));
    }

    public function resume() {
        $jobs = Job::orderBy('start', 'desc')->get();
        return response(json_encode($jobs));
    }
}