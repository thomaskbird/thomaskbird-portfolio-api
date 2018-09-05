@extends('layouts.base-public')

@section('content')
    <div id="content">

        <div class="container content-section">

            <div class="row">

                <div class="col-sm-8">

                    @if(!empty($content->portfolio) && $content->portfolio->featured !== '')
                    <div class="page-featured-image form-group img-thumbnail">
                        <img src="/img/{{$content->portfolio->featured}}" class="img-responsive" alt="{{$content->title}}" />
                    </div>
                    @endif

                    <h1>{{$content->title}}</h1>

                    <?php echo $content->body; ?>

                    <p datetime="{{ substr($content->updated_at, 0, 10) }}" pubdate>Posted: {{ substr($content->updated_at, 0, 10) }}</p>

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