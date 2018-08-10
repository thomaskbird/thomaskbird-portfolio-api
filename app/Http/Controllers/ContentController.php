<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Content;
use App\Models\Tag;
use App\Models\ContentTag;

class ContentController extends Controller {

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
                return response(json_encode($content));
            } else {
                return response(json_encode([
                    'errors' => [
                        'Uh oh, something went wrong please try again!'
                    ]
                ]), 500);
            }
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

        return response(json_encode($temp_content));
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
            $contents = Content::with('parent')->whereRaw('version_of = ? AND type = ?', [0, $input['type']])->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        } else {
            $contents = Content::with('parent')->whereRaw('version_of = ?', [0])->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        }

        return response(json_encode($contents));
    }

    public function single($id) {
        $content = Content::where('id', $id)->with('portfolio')->first();
        return response(json_encode($content));
    }

    public function history_view( $id ) {
        $content = Content::whereRaw('version_of = ? OR id = ?', [$id, $id])->orderBy('id', 'asc')->get();
        return response(json_encode($content));
    }

    public function compare( $id ) {
        $version_old = Content::find($id);
        $version_current = Content::find( $version_old->version_of );

        return response(json_encode([
            'previous' => $version_old,
            'current' => $version_current
        ]));
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

        return response(json_encode($current_page));
    }

    public function create_revision($new_revision) {
        unset($new_revision['created_at'], $new_revision['updated_at']);
        return Content::create($new_revision);
    }

    public function remove($id) {
        $content = Content::find($id);
        $portfolio = Portfolio::where('post_id', $id)->first();
    }
}