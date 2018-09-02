<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Skill;

class SkillController extends Controller {

    public function edit(Request $request, $id) {
        $skill = Skill::find($id);
        $input = $request->except('_token');
        $input['slug'] = str_slug($input['title']);

        foreach($input as $key => $item) {
            $skill->$key = $item;
        }

        $skill->save();

        return back();
    }

    public function view() {
        $skills = Skill::orderBy('priority', 'asc')->paginate(Config('global.paginate'));
        return view('skills.view', ['skills' => $skills]);
    }

    public function ordering() {
        $skills = Skill::orderBy('priority', 'asc')->get();
        return view('skills.ordering', ['skills' => $skills]);
    }

    public function single($id) {
        $skill = Skill::find($id);
        return view('skills.single', ['skill' => $skill]);
    }

    public function remove(Request $request, $id) {
        $skill = Skill::find($id);
        $skill->delete();

        $request->session()->put('notification', [
            'class' => 'success',
            'msg' => 'Skill deleted'
        ]);

        return back();
    }

    public function skills_ordering_post(Request $request) {
        $input = $request->except('_token');

        $validator = Validator::make( $request->all(), [
            'sequence' => 'required'
        ]);

        if($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {
            $sequence = json_decode($input['sequence'], true);

            foreach($sequence as $item) {
                $skill = Skill::find($item['id']);
                $skill->priority = $item['seq'];
                $skill->save();
            }

            return response(json_encode([
                'completed' => 'success',
                'msg' => ['skills reordered']
            ]));
        }
    }

    public function create(Request $request) {
        $input = $request->except('_token');

        $validator = Validator::make( $request->all(), [
            'title' => 'required|unique:skills'
        ]);

        if($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {

            $input['slug'] = str_slug($input['title']);

            $skill = Skill::create($input);

            if($skill) {

                $request->session()->put('notification', [
                    'class' => 'success',
                    'msg' => 'Skill created'
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