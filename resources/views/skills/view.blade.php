@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        @if( $skills->count() )
            @foreach($skills as $skill)
                <tr>
                    <td>{{ $skill->title }}</td>
                    <td>{{ strip_tags($skill->body) }}</td>
                    <td>
                        <a href="{{ route('skill_single', ['id' => $skill->id]) }}">View</a>
                        <a href="{{ route('skill_delete', ['id' => $skill->id]) }}">Delete</a>
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="6">No skills found...</td>
            </tr>
        @endif
        </tbody>
    </table>

    {{ $skills->links() }}

@stop

@section('sidebar-primary')

    <a class="btn btn-default" href="{{ route('skills_ordering') }}">Set order</a>

    {{ Form::open(['route' => 'skill_add', 'method' => 'post']) }}

    <div class="form-group">
        {!! Form::label('title','Title') !!}
        {!! Form::text('title', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('body','Body') !!}
        {!! Form::textarea('body', null, ['class' => 'form-control']) !!}
    </div>

    <button type="submit" class="btn btn-primary">Add skill</button>

    {{ Form::close() }}

@stop