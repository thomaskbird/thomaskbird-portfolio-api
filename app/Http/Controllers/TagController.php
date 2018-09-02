<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Tag;
use App\Models\ContentTag;
use App\Models\Content;

class TagController extends Controller {

    public function public_view($slug) {
        $content = Content::with('portfolio')->whereHas('tags', function($query) use ($slug) {
            $query->where('slug', $slug);
        })->orderBy('created_at', 'desc')->paginate(Config('global.paginate'));

        return view('public.content_list', ['content' => $content]);
    }

    public function edit(Request $request, $id) {
        $tag = Tag::find($id);
        $input = $request->except('_token');
        $input['slug'] = str_slug($input['title']);

        foreach($input as $key => $item) {
            $tag->$key = $item;
        }

        $tag->save();
        return back();
    }

    public function view() {
        $tags = Tag::orderBy('created_at', 'desc')->paginate(Config('global.paginate'));
        return view('tags.view', ['tags' => $tags]);
    }

    public function single($id) {
        $tag = Tag::find($id);
        return view('tags.single', ['tag' => $tag]);
    }

    public function remove(Request $request, $id) {
        $tag = Tag::find($id);
        $tag->delete();

        $request->session()->put('notification', [
            'class' => 'success',
            'msg' => 'Tag deleted'
        ]);

        return back();
    }

    public function create(Request $request) {
        $input = $request->except('_token');

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:tags'
        ]);

        if($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {

            $input['slug'] = str_slug($input['title']);

            $tag = Tag::create($input);

            if($tag) {

                $request->session()->put('notification', [
                    'class' => 'success',
                    'msg' => 'Tag created'
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

    public function content_tag_create(Request $request) {
        $input = $request->all();
        $content_tag = false;

        $existing_content_tag = ContentTag::whereRaw('tag_id = ? AND content_id = ?', [$input['tag_id'], $input['content_id']])->get();

        if(!$existing_content_tag->count()) {
            $content_tag = ContentTag::create($input);
        }

        if($content_tag) {
            return [
                'tag_id' => $input['tag_id'],
                'content_id' => $input['content_id'],
                'content_tag_id' => $content_tag->id
            ];
        } else {
            return 'Uh oh, something went wrong please try again!';
        }
    }

    public function content_tag_remove(Request $request) {
        $input = $request->all();
        $content_tag = ContentTag::whereRaw('tag_id = ? AND content_id = ?', [$input['tag_id'], $input['content_id']])->first();

        if($content_tag->count()) {
            $content_tag->delete();
        } else {
            return 'Uh oh, something went wrong please try again!';
        }
    }
}