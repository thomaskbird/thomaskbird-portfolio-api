<?php
$filename = date('Y-m-d') ."-thomas-k-bird-resume.doc";

header("Content-type: application/msword");
header("Pragma: public"); // required
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false); // required for certain browsers
header("Content-Disposition: attachment; filename=\"".$filename."\";" );
header("Content-Transfer-Encoding: binary");

?>

<b>About me</b>

<p>I have a diverse skill set complemented by having worked in a wide range of environments, ranging from large teams to small teams and freelance work. This diversity has helped me understand the web development process from start to finish having held many roles with multiple skill sets ranging from client services, design, front end and backend programming. This has helped me create better, well rounded applications that are both extensible and easy to use while also being aesthetically pleasing.</p>

<p>I've created sophisticated web apps to help my clients manage complex process flows and increase productivity by bringing simplifying multiple processes through automation and building a web application to handle all of those requirements.</p>

<p>Specialties: angular, react, laravel, front end development, ui/ux, php, JavaScript, jQuery, html5, css3, design, emberjs, photoshop, ionic & backbone.</p>

<h2>Experience</h2>

@foreach($jobs as $i => $job)
<h3>{{ $job->company }} <small class="job-title">{{ $job->title }}</small></h3>
<small class="pull-right resume-timestamp">
    {{ date('M Y', strtotime($job->start)) }} - @if(date('Y-m-d') < $job->end) Present @else {{ date('M Y', strtotime($job->end)) }} @endif
    <span class="label label-default">{{ $job->type }}</span>
</small>

<p>{!! $job->body !!}</p>
@endforeach
