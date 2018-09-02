@extends('layouts.base-public')

@section('content')
    <div id="content">

        <div class="container content-section" id="resume">

            <div class="row">

                <div class="col-sm-8">

                    <h3>Get in touch!</h3>

                    <p>Feel free to contact me using the short form below and I will be sure to contact you back as soon as possible!</p>

                    {!! Form::open(['route' => 'contact_post', 'method' => 'post']) !!}

                    <div class="form-group">
                        {!! Form::label('name','Name:') !!}
                        {!! Form::text('name', null, ['class' => 'form-control']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('email','Email:') !!}
                        {!! Form::email('email', null, ['class' => 'form-control']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('phone','Phone:') !!}
                        {!! Form::text('phone', null, ['class' => 'form-control']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('message','Message:') !!}
                        {!! Form::textarea('message', null, ['class' => 'form-control']) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('answer','What is '. $prob['start'] .' + '. $prob['end']) !!}
                        {!! Form::text('answer', null, ['class' => 'form-control']) !!}
                    </div>

                    {!! Form::hidden('num_first', $prob['start']) !!}
                    {!! Form::hidden('num_end', $prob['end']) !!}

                    <button type="submit" class="btn btn-primary">Send message</button>

                    {!! Form::close() !!}

                </div>
                <div class="col-sm-4">

                    @include('structure.sidebar')

                </div>

            </div>

        </div>

    </div>
@stop