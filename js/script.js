/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.
  // Show hidden function.
  var showHiddenFunction = function (btn, flag, clickOutside, dropDown, childSelector) {
    var $btn = btn,
        $parent = $btn.parent(),
        $childSelector = childSelector;
    dropDown = dropDown === true ? true : false;
    clickOutside = clickOutside === false ? false : true;
    $btn.on('click', function (e) {
      e.preventDefault();
      if (!$parent.hasClass(flag)) {
        $parent.addClass(flag);
        if (dropDown === true) {
          $childSelector.slideDown("slow");
        }
      }
      else {
        $parent.removeClass(flag);
        if (dropDown === true) {
          $childSelector.slideUp("slow");
        }
      }
    });
    if (clickOutside === true) {
      $(document).on('click', function (e) {
        if ($parent.has(e.target).length === 0 && $parent.hasClass(flag)) {
          $parent.removeClass(flag);
          if (dropDown === true) {
            $childSelector.slideUp("slow");
          }
        }
      });
    }
  };

  var faqAccordionFlag = 'show-faq',
      $jsFaqAccordion= $('.js-faq-accordion');
  $jsFaqAccordion.each(function(index, el) {
    var $this = $(this),
        $question = $('.faq-accordion__question', $this),
        $answer = $('.faq-accordion__answer', $this);
    showHiddenFunction($question, faqAccordionFlag, false, true, $answer);
  });

  $('.js-stats-counter').counterUp({
    delay: 10,
    time: 1000
  });

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

  // Table responsive
  Drupal.behaviors.tableResponsive = {
    attach: function (context, settings) {
      var $table = $('table', context);
      if ($table.length &&
        !$table.parent().hasClass('table-responsive')) {
        $table.not($table.find('table')).wrap('<div class="table-responsive"></div>');
      }
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
