<?php
// header('Access-Control-Allow-Origin: http://thomaskbird.com');
header('Access-Control-Allow-Origin: http://localhost:8020');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, User-Agent");

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/home', ['as' => 'home', 'uses' => 'ContentController@home']);

Route::post('/contact', ['as' => 'contact', 'uses' => 'CommunicationController@contact']);
Route::get('/sidebar_data', ['as' => 'sidebar_data', 'uses' => 'ContentController@sidebar_data']);
Route::get('/resume', ['as' => 'resume', 'uses' => 'ContentController@resume']);
Route::get('/resume/print/{type}', ['as' => 'resume_print_word', 'uses' => 'ContentController@resume_print_word']);
Route::get('/search/{term}', ['as' => 'search', 'uses' => 'ContentController@search']);

Route::get('/services', ['as' => 'services', 'uses' => 'ContentController@services']);
Route::get('/content/', ['as' => 'content', 'uses' => 'ContentController@view']);
Route::get('/content/{identifier}/{contentType?}', ['as' => 'content_single', 'uses' => 'ContentController@single']);


Route::get('/tag/{slug}', ['as' => 'tag_view', 'uses' => 'ContentController@tag_view']);

// todo: Integrate old content editing routes and functionality into api