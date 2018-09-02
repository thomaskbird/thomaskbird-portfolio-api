@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <tbody>
            <tr>
                <td>Title:</td>
                <td>{{ $tag->title }}</td>
            </tr>
        </tbody>
    </table>

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => ['tag_update', $tag->id], 'method' => 'post']) }}

    <div class="input-group">
        {!! Form::text('title', $tag->title, ['class' => 'form-control', 'placeholder' => 'Enter title...']) !!}
        <span class="input-group-btn">
            <button type="submit" class="btn btn-primary">Create tag</button>
        </span>
    </div>

    {{ Form::close() }}

@stop