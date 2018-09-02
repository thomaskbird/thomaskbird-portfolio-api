@extends('layouts.base-public')

@section('content')
    <div id="content">

        <div class="container content-section" id="resume">

            <div class="row">

                <div class="col-sm-8">

                    <div class="btn-group resume-actions" role="group" aria-label="Actions">
                        <a href="#" class="btn btn-default toTop"><span class="fa fa-arrow-up"></span> Back to top</a>
                        <a href="{{ route('resume_print') }}" class="btn btn-default"><span class="fa fa-print"></span> Print</a>
                    </div>

                    <h2 class="page-header" id="about-me">About me</h2>

                    <p>I have a diverse skill set complemented by having worked in a wide range of environments, ranging from large teams to small teams and freelance work. This diversity has helped me understand the web development process from start to finish having held many roles with multiple skill sets ranging from client services, design, front end and backend programming. This has helped me create better, well rounded applications that are both extensible and easy to use while also being aesthetically pleasing.</p>

                    <p>I've created sophisticated web apps to help my clients manage complex process flows and increase productivity by bringing simplifying multiple processes through automation and building a web application to handle all of those requirements.</p>

                    <p>Specialties: front end development, ui/ux, php, angularjs, JavaScript, jQuery, html5, css, design, emberjs, photoshop, ionic, backbone &amp; laravel.</p>

                    <div id="work-wrap">

                        <h2 class="page-header" id="work-experience">Experience</h2>

                    @foreach($jobs as $i => $job)
                        <div class="work-item row">

                            @if($i % 2 === 0)
                                @if($job->logo)
                                <div class="col-sm-3">
                                    <img src="/img/{{ $job->logo }}" alt="{{ $job->company }}" class="img img-responsive img-thumbnail" />
                                </div>
                                @endif

                                <div class="@if($job->logo) col-sm-9 @else col-sm-12 @endif">
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
                            @else
                                <div class="@if($job->logo) col-sm-9 @else col-sm-12 @endif">
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
                                @if($job->logo)
                                    <div class="col-sm-3">
                                        <img src="/img/{{ $job->logo }}" alt="{{ $job->company }}" class="img img-responsive img-thumbnail" />
                                    </div>
                                @endif
                            @endif

                        </div>
                    @endforeach
                    </div>

                    <!-- Go to www.addthis.com/dashboard to customize your tools -->
                    <div class="addthis_sharing_toolbox"></div>

                </div>
                <div class="col-sm-4">

                    @include('structure.sidebar')

                </div>

            </div>

        </div>

    </div>
@stop