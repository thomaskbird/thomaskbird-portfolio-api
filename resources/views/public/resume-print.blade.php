@extends('layouts.base-public-print')

@section('content')
<div class="resume-header top">
    @include('structure.resume-contact')
</div>

<div class="container-fluid" id="resume">

    <h2 class="page-header" id="about-me">About me</h2>

    <p>I have a diverse skill set complemented by having worked in a wide range of environments, ranging from large teams to small teams and freelance work. This diversity has helped me understand the web development process from start to finish having held many roles with multiple skill sets ranging from client services, design, front end and backend programming. This has helped me create better, well rounded applications that are both extensible and easy to use while also being aesthetically pleasing.</p>

    <p>I've created sophisticated web apps to help my clients manage complex process flows and increase productivity by bringing simplifying multiple processes through automation and building a web application to handle all of those requirements.</p>

    <p>Specialties: front end development, ui/ux, php, angularjs, JavaScript, jQuery, html5, css, design, emberjs, photoshop, ionic, backbone &amp; laravel.</p>

    <div id="work-wrap">

        <h2 class="page-header" id="work-experience">Experience</h2>

        @foreach($jobs as $i => $job)
            <div class="work-item row">
                <div class="col-sm-12">
                    <h4 class="page-header">
                        {{ $job->company }}
                        <small class="job-title">{{ $job->title }}</small>
                        <small class="pull-right resume-timestamp">
                            {{ date('M Y', strtotime($job->start)) }} - @if(date('Y-m-d') < $job->end) Present @else {{ date('M Y', strtotime($job->end)) }} @endif
                            <span class="label label-default">{{ $job->type }}</span>
                        </small>
                    </h4>
                    <p>{!! $job->body !!}</p>
                </div>
            </div>
        @endforeach
    </div>
</div>

<div class="resume-header bottom">
    @include('structure.resume-contact')
</div>

@stop