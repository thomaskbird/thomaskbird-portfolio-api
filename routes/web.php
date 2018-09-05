<?php

Route::group(['middleware' => 'web'], function () {

    Route::get('/login', ['as' => 'login_form', 'uses' => 'PublicController@login']);
    Route::post('/login', ['as' => 'login_attempt', 'uses' => 'AuthenticationController@login']);
    Route::get('/logout', ['as' => 'logout', 'uses' => 'AuthenticationController@logout']);

});

Route::group(['prefix' => 'admin', 'middleware' => ['web','auth']], function() {

    Route::get('dashboard', ['as' => 'dashboard', 'uses' => 'AdminController@dashboard']);

    // content routes
    Route::get('content', ['as' => 'content', 'uses' => 'ContentController@view']);
    Route::get('content/{id}', ['as' => 'content_single', 'uses' => 'ContentController@single']);
    Route::post('content/add', ['as' => 'content_add', 'uses' => 'ContentController@create']);
    Route::get('content/delete/{id}', ['as' => 'content_delete', 'uses' => 'ContentController@remove']);
    Route::post('content/edit/{id}', ['as' => 'content_edit', 'uses' => 'ContentController@edit']);
    Route::post('content/images/{id}', ['as' => 'content_edit_images', 'uses' => 'ContentController@edit_images']);
    Route::get('content/compare/{id}', ['as' => 'content_compare', 'uses' => 'ContentController@compare']);
    Route::get('content/revert/{id}', ['as' => 'content_revert', 'uses' => 'ContentController@revert']);
    Route::get('history/{id}', ['as' => 'history_view', 'uses' => 'ContentController@history_view']);

    // jobs routes
    Route::get('jobs', ['as' => 'jobs', 'uses' => 'JobController@view']);
    Route::get('jobs/delete/{id}', ['as' => 'job_delete', 'uses' => 'JobController@remove']);
    Route::post('jobs/update/{id}', ['as' => 'job_update', 'uses' => 'JobController@edit']);
    Route::post('jobs/add', ['as' => 'job_add', 'uses' => 'JobController@create']);
    Route::get('jobs/{id}', ['as' => 'job_single', 'uses' => 'JobController@single']);

    // message routes
    Route::get('messages', ['as' => 'message_list', 'uses' => 'MessageController@view']);
    Route::get('messages/{id}', ['as' => 'message_single', 'uses' => 'MessageController@single']);
    Route::get('messages/delete/{id}', ['as' => 'message_delete', 'uses' => 'MessageController@remove']);

    // services routes
    Route::get('services', ['as' => 'admin_services', 'uses' => 'ServiceController@view']);
    Route::get('services/delete/{id}', ['as' => 'service_delete', 'uses' => 'ServiceController@remove']);
    Route::post('services/update/{id}', ['as' => 'service_update', 'uses' => 'ServiceController@edit']);
    Route::post('services/add', ['as' => 'service_add', 'uses' => 'ServiceController@create']);
    Route::get('services/{id}', ['as' => 'service_single', 'uses' => 'ServiceController@single']);

    // skill routes
    Route::get('skills', ['as' => 'skills', 'uses' => 'SkillController@view']);
    Route::get('skills/ordering', ['as' => 'skills_ordering', 'uses' => 'SkillController@ordering']);
    Route::get('skills/delete/{id}', ['as' => 'skill_delete', 'uses' => 'SkillController@remove']);
    Route::post('skills/update/{id}', ['as' => 'skill_update', 'uses' => 'SkillController@edit']);
    Route::post('skills/add', ['as' => 'skill_add', 'uses' => 'SkillController@create']);
    Route::get('skills/{id}', ['as' => 'skill_single', 'uses' => 'SkillController@single']);

    // tags routes
    Route::get('tags', ['as' => 'tags', 'uses' => 'TagController@view']);
    Route::get('tags/delete/{id}', ['as' => 'tag_delete', 'uses' => 'TagController@remove']);
    Route::post('tags/update/{id}', ['as' => 'tag_update', 'uses' => 'TagController@edit']);
    Route::post('tags/add', ['as' => 'tag_add', 'uses' => 'TagController@create']);
    Route::get('tags/{id}', ['as' => 'tag_single', 'uses' => 'TagController@single']);
});

View::composer(['layouts.base-public'], function($view) {
    $current_route = Request::route()->getName();
    $slug = Request::route('slug');
    $page_title = $current_route !== 'page' ? ucfirst($current_route) : Content::where('slug', $slug)->pluck('title')->first();
    $view->with(['title' => $page_title]);
});
View::composer(['structure.sidebar'], function($view) {
    $tags = Tag::all();
    $recent_posts = Content::whereRaw('type = ? AND version_of = ? AND status = ?', ['post', 0, 'published'])->orderBy('created_at', 'desc')->take(5)->get();

    $view->with(['tags' => $tags, 'recent_posts' => $recent_posts]);
});