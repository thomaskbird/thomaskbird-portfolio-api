@extends('layouts.admin-two-column')

@section('content-main')

    <table class="table table-striped">
        <tbody>
            <tr>
                <td>Title:</td>
                <td>{{ $job->title }}</td>
            </tr>
            <tr>
                <td>Body:</td>
                <td>{{ $job->body }}</td>
            </tr>
        </tbody>
    </table>

@stop

@section('sidebar-primary')

    {{ Form::open(['route' => ['job_update', $job->id], 'method' => 'post', 'files' => true]) }}

    <div class="form-group">
        {!! Form::label('company','Company') !!}
        {!! Form::text('company', $job->company, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('title','Title') !!}
        {!! Form::text('title', $job->title, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('start','Start') !!}
        {!! Form::text('start', $job->start, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('end','End') !!}
        {!! Form::text('end', $job->end, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('body','Body') !!}
        {!! Form::textarea('body', $job->body, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('type', 'Type') !!}
        {!! Form::select('type', ['Ongoing Contract' => 'Ongoing Contract', 'Contract' => 'Contract', 'Contract to hire' => 'Contract to hire', 'Direct Hire' => 'Direct Hire'], $job->type, ['class' => 'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::label('skills','Skills') !!}
        {!! Form::text('skills', $job->skills, ['class' => 'form-control']) !!}
    </div>

    <div class="row">
        <div class="form-group col-sm-6">
            {{ Form::label('files','File') }}
            {{ Form::file('logo', ['class' => 'form-control']) }}
        </div>
        <div class="form-group col-sm-6">
            <img src="/img/{{ $job->logo }}" class="img img-responsive img-thumbnail" />
        </div>
    </div>

    <button type="submit" class="btn btn-primary">Update job</button>

    {{ Form::close() }}

@stop