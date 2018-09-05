( function ( $ ) {
    $.fn.scrollPage = function( options ) {

        var settings = $.extend({
            scroll_to_attr : 'href',
            nav_height : 70,
            speed : 500,
            totop : '.top'
        }, options );

        $(this).click(function(){
            var el = $(this).attr(settings.scroll_to_attr);
            var offset = $(el).offset().top;

            $('body,html').animate({
                scrollTop: offset-settings.nav_height
            }, settings.speed );

            return false;
        });

        $(settings.totop).click( function (){
            $('body,html').animate({
                scrollTop: 0
            }, settings.speed );
        });

    };
}) ( jQuery );

/*
 ***************************************************************************************
 ******************** Uncomment for basic slider implementation ************************
 ***************************************************************************************
 */
$(window).on('load', function() {
    $( '.flexslider' ).flexslider({
        animation: 'slide',
        controlNav: true,
        directionNav: false,
        start: function() {

            desktopClass = 'bounceInLeft';
            mobileClass = 'bounceInRight';
            contentClass = 'fadeInDown';

            $('.flex-active-slide').children('.col-sm-6').children('.slide-desktop').addClass( desktopClass );
            $('.flex-active-slide').children('.col-sm-6').children('.slide-mobile').addClass( mobileClass );
            $('.flex-active-slide').children('.slide-content').addClass( contentClass );

        },
        after: function(){

            desktopClass = 'bounceInLeft';
            mobileClass = 'bounceInRight';
            contentClass = 'fadeInDown';

            $( '.'+ desktopClass ).removeClass( desktopClass );
            $('.'+ mobileClass ).removeClass( mobileClass );
            $('.'+ contentClass ).removeClass( contentClass );

            $('.flex-active-slide').children('.col-sm-6').children('.slide-desktop').addClass( desktopClass );
            $('.flex-active-slide').children('.col-sm-6').children('.slide-mobile').addClass( mobileClass );
            $('.flex-active-slide').children('.slide-content').addClass( contentClass );
        }
    });
});

$(document).ready( function() {
    $('.service').on('click', function() {

        if( !$( this ).hasClass('open') ) {

            $('.service.open').children('.fa').attr('class', 'fa fa-angle-down');
            $('.service.open').removeClass('open').children('.service-description').slideUp( 250 );

            $( this ).addClass('open');

            $( this ).children('.service-description').slideDown( 250 );

            $( this ).children('.fa').attr('class', 'fa fa-angle-up');

        }

    });

    $('.toTop').on('click', function( e ) {

        $('body,html').animate({
            scrollTop: 0
        }, 500 );

        e.preventDefault();
    });

    $( window ).on( 'scroll', function( e ) {

        var $body = $('body'),
            $resumeActions = $('.resume-actions');

        // if not at the top of the window add class to body tag
        if( $( document ).scrollTop() > 0 ) {
            if( !$body.hasClass('nav-scrolling') ) {
                $body.addClass('nav-scrolling');
                $resumeActions.addClass('scrolling');
            }
        } else {
            $body.removeClass('nav-scrolling');
            $resumeActions.removeClass('scrolling');

        }

    });

    if( $('body').hasClass('resume') ) {

        var offset = pos = 0;
        offset = $('.scrollSpyWrap').offset().top;

        $( window ).on( 'load scroll', function( e ) {

            // handles scroll spy
            pos = $( window ).scrollTop();

            if( pos > offset ) {
                if( !$('.scrollSpyWrap').hasClass('fixed' ) ) {
                    $('.scrollSpyWrap').addClass('fixed');
                }
            } else {
                $('.scrollSpyWrap').removeClass('fixed');
            }

        });

    }

    $('.widgettitle').on('click', function() {

        $( this ).siblings().slideToggle( 250 );

    });

    $('body').on({
        mouseover: function() {
            $( this ).children('.dropdown-menu').stop(true, true).show();
            $(this).addClass('open');
        }, mouseleave: function() {
            $( this ).children('.dropdown-menu').stop(true, true).hide();
            $(this).removeClass('open');
        }
    }, '.dropdown' );

    $('.tag-selectable').on('click', function(e) {
        var $this = $(this);
        var isAdd = $this.hasClass('label-default');

        var params = {
            tag_id: $this.data('tag-id'),
            content_id: $this.data('content-id')
        };

        if(isAdd) {
            $.ajax({
                method: "POST",
                url: "/content/tag/add",
                data: params
            }).done(function( msg ) {
                console.log('Success');

                $this.removeClass('label-default');
                $this.addClass('label-primary');
            }).fail(function(jqXHR, textStatus) {
                console.log('Failure', textStatus);
            });
        } else {
            $.ajax({
                method: "POST",
                url: "/content/tag/delete",
                data: params
            }).done(function( msg ) {
                console.log('Success');

                $this.removeClass('label-primary');
                $this.addClass('label-default');
            }).fail(function(jqXHR, textStatus) {
                console.log('Failure', textStatus);
            });
        }
    });

    $('#scrollSpy-nav a').scrollPage({ 'speed' : 500 });

    if($('.administration').length) {
        $('select.selectpicker').selectpicker({});
    }

    tinymce.init({
        selector: '.administration textarea',
        plugins: 'image code',
        toolbar: 'undo redo | link image | code',
        // enable title field in the Image dialog
        image_title: true,
        // enable automatic uploads of images represented by blob or data URIs
        automatic_uploads: true,
        // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
        images_upload_url: '/upload',
        // here we add custom filepicker only to Image dialog
        file_picker_types: 'image',
        // and here's our custom image picker
        file_picker_callback: function(cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            // Note: In modern browsers input[type="file"] is functional without
            // even adding it to the DOM, but that might not be the case in some older
            // or quirky browsers like IE, so you might want to add it to the DOM
            // just in case, and visually hide it. And do not forget do remove it
            // once you do not need it anymore.

            input.onchange = function() {
                var file = this.files[0];

                // Note: Now we need to register the blob in TinyMCEs image blob
                // registry. In the next release this part hopefully won't be
                // necessary, as we are looking to handle it internally.
                var id = 'blobid' + (new Date()).getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var blobInfo = blobCache.create(id, file);
                blobCache.add(blobInfo);

                // call the callback and populate the Title field with the file name
                cb(blobInfo.blobUri(), { title: file.name });
            };

            input.click();
        }
    });

    var sortableElement = $('#sortable-skills');
    if(sortableElement.length) {
      var sortableSkills = new Sortable(sortableElement[0], {
        onEnd: function(evt) {console.log(sortableElement);
          var newOrder = [],
              $this = $(this);
          sortableElement.find('li').each(function(i) {
            newOrder.push({
              id: $(this).data('id'),
              seq: ++i
            });
          });

          console.log(newOrder);

          $.ajax({
            method: "POST",
            url: "/api/skills/ordering",
            data: {
                _token: $('body').data('token'),
                sequence: JSON.stringify(newOrder)
            }
          }).done(function( msg ) {
            console.log('Success');
          }).fail(function(jqXHR, textStatus) {
            console.log('Failure', textStatus);
          });
        }
      });
    }

  // var sortable = new Sortable( $('#sortable-projects')[0], {
  //   onEnd: function(evt) {
  //     var order = {};
  //
  //     $('#sortable-projects tr').each( function( i ) {
  //       $(this).attr('data-priority', ( i + 1 ) );
  //       order[$(this).attr('data-id')] = ( i + 1 );
  //     });
  //
  //     $('.order').html( JSON.stringify( order ) );
  //
  //     $.getJSON('/projects/priority', { projects: order }).success( function( data ) {
  //
  //     });
  //
  //   }
  // });
});
//# sourceMappingURL=app.js.map
