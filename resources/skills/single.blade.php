@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <tbody>
            <tr>
                <td>Title:</td>
                <td>{{ $skill->title }}</td>
            </tr>
            <tr>
                <td>Body:</td>
                <td>{{ $skill->body }}</td>
            </tr>
        </tbody>
    </table>

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => ['skill_update', $skill->id], 'method' => 'post']) }}

    <div class="form-group">
        {!! Form::label('title','Title') !!}
        {!! Form::text('title', $skill->title, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('body','Body') !!}
        {!! Form::textarea('body', $skill->body, ['class' => 'form-control']) !!}
    </div>

    <button type="submit" class="btn btn-primary">Update skill</button>

    {{ Form::close() }}

@stop