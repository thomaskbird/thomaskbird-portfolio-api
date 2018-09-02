@extends('layouts.admin-two-column')

@section('content-main')

    <div class="row form-group">

        <div class="col-sm-12">
            <div class="btn-group pull-right">
                <button type="button" class="btn btn-default">Filters</button>
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    @foreach($filters as $k => $filter)
                    <li @if($input_selected === $k) class="active" @endif><a href="/admin/content?type={{ $k }}">{{ $filter }}</a></li>
                    @endforeach
                </ul>
            </div>
        </div>

    </div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Title</th>
                <th>Parent</th>
                <th>Description</th>
                <th>Version</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        @if( $contents->count() )
            @foreach( $contents as $content )
                <tr>
                    <td>{{ $content->title }}</td>
                    <td>
                        @if( isset( $content->parent ) )
                            {{ $content->parent->title }}
                        @else
                            <span class="label label-default">No parent</span>
                        @endif
                    </td>
                    <td>{{ substr(strip_tags($content->description), 0, 100) }}...</td>
                    <td>{{ $content->version_of }}</td>
                    <td>{{ $content->status }}</td>
                    <td>
                        <a href="{{ route('content_single', ['id' => $content->id]) }}">View</a>
                        <a href="{{ route('history_view', ['id' => $content->id]) }}">History</a>
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="6">No content found...</td>
            </tr>
        @endif
        </tbody>
    </table>

    {{ $contents->links() }}

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => 'content_add', 'method' => 'post']) }}

    <div class="form-group row">
        <div class="col-sm-6">
            {!! Form::label('title','Title') !!}
            {!! Form::text('title', null, ['class' => 'form-control']) !!}
        </div>

        <div class="col-sm-6">
            {!! Form::label('nav_text','Navigation title') !!}
            {!! Form::text('nav_text', null, ['class' => 'form-control']) !!}
        </div>
    </div>

    <div class="form-group">
        {!! Form::label('parent_id', 'Parent page') !!}
        {!! Form::select('parent_id', $content_list, null, ['class' => 'form-control selectpicker', 'data-live-search' => 'true']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('description','Description') !!}
        {!! Form::textarea('description', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('body','Body') !!}
        {!! Form::textarea('body', null, ['class' => 'form-control tinymce']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('keywords','Keywords') !!}
        {!! Form::text('keywords', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('type','Type') !!}
        {!! Form::select('type', ['page' => 'Page', 'post' => 'Post'], null, ['class' => 'form-control selectpicker', 'data-live-search' => 'true']) !!}
    </div>

    <button type="submit" class="btn btn-primary">Add content</button>

    {{ Form::close() }}

@stop