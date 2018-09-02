<?php namespace App\Http\Controllers;

use Config;
use Session;
use Validator;
use Illuminate\Http\Request;

use App\Models\Upload;

class UploadController extends Controller {

    public function upload(Request $request) {
        $destinationPath = public_path() .'/media';
        $file = $request->file('file');
        $filename = $this->cleanFilename($file->getClientOriginalName());

        $file->move($destinationPath, $filename);

        $file_data = [
            'title' => $filename,
            'filename' => $filename,
            'type' => $file->getClientMimeType()
        ];

        $uploaded = Upload::create($file_data);

        if($uploaded) {
            return json_encode(['location' => '/media/'. $filename]);
        } else {
            return json_encode(['msg' => 'Uh oh, something went wrong please try again!']);
        }
    }
}