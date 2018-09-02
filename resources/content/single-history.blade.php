@extends('layouts.admin-two-column')

<?php $count = $content->count() + 1; ?>

@section('content-main')

    <table class="table table-striped">
        <thead>
        <tr>
            <th>Version</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        @foreach( $content as $i => $item )
            <tr>
                <td>{{ ( --$count ) }}</td>
                <td>{{ $item->title }}</td>
                <td>{{ $item->description }}</td>
                <td>
                    @if( $i > 0 )
                        <a href="{{ route('content_compare', ['id' => $item->id]) }}">Compare</a>
                        <a href="{{ route('content_revert', ['id' => $item->id]) }}">Use this version</a>
                    @endif
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

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
        {!! Form::select('parent_id', $content_list, null, ['class' => 'form-control']) !!}
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
        {!! Form::select('type', ['page' => 'Page', 'post' => 'Post'], null, ['class' => 'form-control']) !!}
    </div>

    <button type="submit" class="btn btn-primary">Add content</button>

    {{ Form::close() }}

@stop