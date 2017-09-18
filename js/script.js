/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.

  // js-play-video
  var $jsPlayVideo = $('.js-play-video'),
      playVideo = function (e) {
    var $iframeVimeo = $(this).find('.vimeo-embed'),
        $iframeYoutube = $(this).find('.youtube-embed');
    $(this).addClass("play-video");
    if ($iframeVimeo.length) {
      var player = Froogaloop($iframeVimeo[0]);
      player.api('play');
    }
    if ($iframeYoutube.length) {
      $iframeYoutube[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }
  };
  if ($jsPlayVideo.length) {
    $jsPlayVideo.on('click', playVideo);
  }

  // Chosen
  var configChosen = {
      width: "auto",
      disable_search_threshold: 15,
      placeholder_text_multiple: ' '
    };

  Drupal.behaviors.selectChosen = {
    attach: function (context, settings) {
      $('select').chosen(configChosen);
    }
  };

  var $jsGridImage = $('.js-grid-image'),
      $gridImageGrid = $('.grid-image__grid', $jsGridImage),
      $gridImageBtnPrev = $('.js-block-slider-navigation .prev', $jsGridImage),
      $gridImageBtnNext = $('.js-block-slider-navigation .next', $jsGridImage),
      gridImageConfig = {
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        adaptiveHeight: true,
        prevArrow: "<a href='#' class='slick-prev invisible'>Prev</a>",
        nextArrow: "<a href='#' class='slick-next invisible'>Next</a>",
      };
  enquire.register(mobileOnly, {
    match: function () {
      $gridImageGrid.not('.slick-initialized').slick(gridImageConfig).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var $parent = $(this).closest('.js-grid-image'),
            $numberActive = $('.js-block-slider-navigation .number-active', $parent),
            numberActive = nextSlide + 1;
        $numberActive.text(numberActive);
      });

      $gridImageBtnPrev.click(function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.js-grid-image'),
            $caurosel = $('.grid-image__grid', $parent);
        $caurosel.slick('slickPrev');
      });

      $gridImageBtnNext.click(function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.js-grid-image'),
            $caurosel = $('.grid-image__grid', $parent);
        $caurosel.slick('slickNext');
      });
    },
    unmatch: function () {
      if($gridImageGrid.hasClass('slick-initialized')) {
        $gridImageGrid.slick("unslick");

        $gridImageBtnPrev.off("click");
        $gridImageBtnNext.off("click");
      }
    },
  });

}(this, this.document, this.jQuery));
