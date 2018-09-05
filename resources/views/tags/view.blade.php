@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Title</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        @if( $tags->count() )
            @foreach($tags as $tag)
                <tr>
                    <td>{{ $tag->title }}</td>
                    <td>
                        <a href="{{ route('tag_single', ['id' => $tag->id]) }}">View</a>
                        <a href="{{ route('tag_delete', ['id' => $tag->id]) }}">Delete</a>
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="6">No tags found...</td>
            </tr>
        @endif
        </tbody>
    </table>

    {{ $tags->links() }}

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => 'tag_add', 'method' => 'post']) }}

    <div class="form-group">
        {!! Form::label('title','Title') !!}
        {!! Form::text('title', null, ['class' => 'form-control']) !!}
    </div>

    <button type="submit" class="btn btn-primary">Add tag</button>

    {{ Form::close() }}

@stop