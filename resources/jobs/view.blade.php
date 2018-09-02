@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <thead>
            <tr>
                <td>Company</td>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        @if( $jobs->count() )
            @foreach($jobs as $job)
                <tr>
                    <td>{{ $job->company }}</td>
                    <td>{{ $job->title }}</td>
                    <td>{{ substr($job->body, 0, 200) }}</td>
                    <td>
                        <a href="{{ route('job_single', ['id' => $job->id]) }}">View</a>
                        <a href="{{ route('job_delete', ['id' => $job->id]) }}">Delete</a>
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="6">No jobs found...</td>
            </tr>
        @endif
        </tbody>
    </table>

    {{ $jobs->links() }}

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => 'job_add', 'method' => 'post', 'files' => true]) }}

    <div class="form-group">
        {!! Form::label('company','Company') !!}
        {!! Form::text('company', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('title','Title') !!}
        {!! Form::text('title', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('start','Start') !!}
        {!! Form::text('start', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('end','End') !!}
        {!! Form::text('end', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('body','Body') !!}
        {!! Form::textarea('body', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('type', 'Type') !!}
        {!! Form::select('type', ['Ongoing Contract' => 'Ongoing Contract', 'Contract' => 'Contract', 'Contract to hire' => 'Contract to hire', 'Direct Hire' => 'Direct Hire'], null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('skills','Skills') !!}
        {!! Form::text('skills', null, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {{ Form::label('files','File') }}
        {{ Form::file('logo', ['class' => 'form-control']) }}
    </div>

    <button type="submit" class="btn btn-primary">Add job</button>

    {{ Form::close() }}

@stop