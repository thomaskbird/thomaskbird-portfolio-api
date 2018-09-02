@extends('layouts.admin-two-column')

@section('content-main')

    <h1>{{ $content->title }}</h1>

    {!! $content->body !!}

    <p>Version of: {{ $content->version_of }}</p>

@stop

@section('sidebar-primary')

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#edit" aria-controls="home" role="tab" data-toggle="tab">Edit</a></li>
        <li role="presentation"><a href="#tags" aria-controls="profile" role="tab" data-toggle="tab">Tagging</a></li>
        <li role="presentation"><a href="#uploads" aria-controls="uploads" role="tab" data-toggle="tab">Uploads</a></li>
        <li class="pull-right" role="presentation"><a href="{{ route('content') }}">Back</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="edit">

            {!! Form::open(['url' => '/admin/content/edit/'. $content->id, 'method' => 'post', 'class' => 'form-group']) !!}

            <div class="form-group row">
                <div class="col-sm-6">
                    {!! Form::label('title','Title') !!}
                    {!! Form::text('title', $content->title, ['class' => 'form-control']) !!}
                </div>

                <div class="col-sm-6">
                    {!! Form::label('nav_text','Navigation title') !!}
                    {!! Form::text('nav_text', $content->nav_text, ['class' => 'form-control']) !!}
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-6">
                    {!! Form::label('parent_id', 'Parent page') !!}
                    {!! Form::select('parent_id', $content_list, $content->parent_id, ['class' => 'form-control selectpicker', 'data-live-search' => 'true']) !!}
                </div>

                <div class="col-sm-6">
                    {!! Form::label('status', 'Status') !!}
                    {!! Form::select('status', ['draft' => 'Draft', 'published' => 'Published'], $content->status, ['class' => 'form-control selectpicker', 'data-live-search' => 'true']) !!}
                </div>
            </div>

            <div class="form-group">
                {!! Form::label('description','Description') !!}
                {!! Form::textarea('description', $content->description, ['class' => 'form-control']) !!}
            </div>

            <div class="form-group">
                {!! Form::label('body','Body') !!}
                {!! Form::textarea('body', $content->body, ['class' => 'form-control tinymce']) !!}
            </div>

            <div class="form-group">
                {!! Form::label('keywords','Keywords') !!}
                {!! Form::text('keywords', $content->keywords, ['class' => 'form-control']) !!}
            </div>

            <div class="form-group">
                {!! Form::label('type','Type') !!}
                {!! Form::select('type', ['page' => 'Page', 'post' => 'Post'], $content->type, ['class' => 'form-control selectpicker', 'data-live-search' => 'true']) !!}
            </div>

            <button type="submit" class="btn btn-primary">Update content</button>
            {!! Form::close() !!}

        </div>
        <div role="tabpanel" class="tab-pane" id="tags">

            <div class="form-group">
                {{ Form::open(['route' => 'tag_add', 'method' => 'post']) }}

                <div class="input-group">
                    {!! Form::text('title', null, ['class' => 'form-control', 'placeholder' => 'Enter title...']) !!}
                    <span class="input-group-btn">
                        <button type="submit" class="btn btn-primary">Create tag</button>
                    </span>
                </div>

                {{ Form::close() }}
            </div>

            @foreach($tags as $tag)
                <span class="tag-selectable label @if(in_array($tag->id, $content_tags)) label-primary @else label-default @endif" data-tag-id="{{ $tag->id }}" data-content-id="{{ $content->id }}">{{ $tag->title }}</span>
            @endforeach

        </div>
        <div role="tabpanel" class="tab-pane" id="uploads">

            @if($content->type === 'post')
                {!! Form::open(['url' => '/admin/content/images/'. $content->id, 'method' => 'post', 'files' => true]) !!}

                <div class="form-group row">
                    <div class="form-group col-sm-6">
                        {{ Form::label('mobile','Mobile image') }}
                        {{ Form::file('mobile', ['class'=>'form-control']) }}
                        @if(!empty($content->portfolio) && $content->portfolio->mobile !== '')
                            <pre>{{$content->portfolio->mobile}}</pre>
                        @endif
                    </div>

                    <div class="form-group col-sm-6">
                        {{ Form::label('desktop','Desktop image') }}
                        {{ Form::file('desktop', ['class'=>'form-control']) }}
                        @if(!empty($content->portfolio) && $content->portfolio->desktop !== '')
                            <pre>{{$content->portfolio->desktop}}</pre>
                        @endif
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-sm-6">
                        {{ Form::label('featured','Featured image') }}
                        {{ Form::file('featured', ['class'=>'form-control']) }}
                        @if(!empty($content->portfolio) && $content->portfolio->featured !== '')
                            <pre>{{$content->portfolio->featured}}</pre>
                        @endif
                    </div>
                    <div class="form-group col-sm-6">
                        {!! Form::label('url','URL') !!}
                        {!! Form::text('url', $content->portfolio['url'], ['class' => 'form-control']) !!}
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Upload</button>

                {!! Form::close() !!}

            @endif
        </div>
    </div>

@stop