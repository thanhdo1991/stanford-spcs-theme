/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.
  // Toggle mobile menu.

  $( document ).ready(function() {
    //Show hidden menu-info.
    var toggleFunction = function (btn, flag) {
      var $btn = btn,
        $parent = $btn.parent();

      $btn.on('click', function () {
        if (!$parent.hasClass(flag)) {
          $parent.addClass(flag);
          $('html').addClass(flag);
        }
        else {
          $parent.removeClass(flag);
          $('html').removeClass(flag);
        }
      });
    };
    var openFlag = 'is-active',
      $open = $('.js-show-hide');
    toggleFunction($open, openFlag);


    // Save color to cookiess
    // Update style of color and font
    var updateStyle = function() {
      var $colorInput = $('.js-color-picker'),
        $currentBody = $('body'),
        styleCode = '';

      $colorInput.each(function(){
        var thisName = $(this).attr("name"),
          thisValue = $(this).val();

        // Conver Name of input into css Variable name
        var cssVar = thisName.replace(/([A-Z])/g, '-$1').trim().toLowerCase();
        styleCode += '--' + cssVar + ': ' + thisValue + ';';
        styleCode += '--' + cssVar + '-code: "Code: ' + thisValue + '";';
      });

      $currentBody.attr('style', styleCode);
    };

    // Set color set to custom when custom color
    var setToCustom = function(setName) {
      $colorSet = $('.js-color-set');
      $fontSet = $('.js-font-set');
      switch(setName) {
        case 'color':
          $colorSet.val('userCustom');
          break;
        case 'font':
          $fontSet.val('userCustom');
          break;
        default:
      }
    };

    //Change picker color.
    var changeColorPicker = function($colorPicker) {
      $colorPicker.on("change",function(){
        var $parent = $(this).parents(".panel-switch__item__inner"),
            $input = $parent.find('.js-color-input'),
            colorVal = $(this).val();
        // Change color for input
        $input.val(colorVal);

        // Reset color set to custom
        setToCustom('color');
        // Change color for css variable
        updateStyle();
      });
    };

    var $colorPicker = $(".js-color-picker");
    changeColorPicker($colorPicker);

    //Change input color.
    var changeColorInput = function($colorInput) {
      $colorInput.keyup(function(){
        var $parent = $(this).parents(".panel-switch__item__inner"),
            $picker = $parent.find('.js-color-picker'),
            colorVal = $(this).val();
        // Change color for input
        $picker.val(colorVal);

        // Reset color set to custom
        setToCustom('color');
        // Change color for css variable
        updateStyle();
      });
    };

    var $colorInput = $(".js-color-input");
    changeColorInput($colorInput);

    // Color set.
    var selectboxColorSet = $(".js-color-set");
    var objectColorSet = {
      default: {
        primary: "#8c1515",
        secondary: "#b1040e",
        sub: "#00505c",
        link: "#006cb8",
      },
      colorSet1: {
        primary: "#3f647e",
        secondary: "#dfbf8d",
        sub: "#d0b9cd",
        link: "#bbbbbb",
      },
      colorSet2: {
        primary: "#9f0000",
        secondary: "#185b80",
        sub: "#00505c",
        link: "#3d274d",
      },
      colorSet3: {
        primary: "#7691f2",
        secondary: "#004fd6",
        sub: "#cc9a00",
        link: "#a280c5",
      }
    };

    selectboxColorSet.change(function() {
      var colorSet = $(this).val(),
        $colorPalette = $(this).parents('.panel-switch__color'),
        $primaryInput = $colorPalette.find('.primary-color'),
        $secondaryInput = $colorPalette.find('.secondary-color'),
        $subInput = $colorPalette.find('.sub-color');
        $linkInput = $colorPalette.find('.link-color');

      if(colorSet != 'userCustom') {
        $primaryInput.val(objectColorSet[colorSet]["primary"]);
        $secondaryInput.val(objectColorSet[colorSet]["secondary"]);
        $subInput.val(objectColorSet[colorSet]["sub"]);
        $linkInput.val(objectColorSet[colorSet]["link"]);
          // Change color for css variable
        updateStyle();
      }
    });

    // Save action
    // Save configs via Json, readmore here: https://github.com/js-cookie/js-cookie
    var saveConfig = function() {
      var configs = {
        // Get color values
        colorSet: $('.js-color-set').val(),
        feb: 'feb2',
        primaryColor: $('.primary-color').val(),
        secondaryColor: $('.secondary-color').val(),
        subColor: $('.sub-color').val(),
        linkColor: $('.link-color').val()
      };
      Cookies.set('saveConfigs', configs );
    };

    // Click button save
    $('.js-save').click(function(){
      saveConfig();
      $(this).addClass('is-active');
      setTimeout(function(){
        $('.js-save').removeClass('is-active')
      }, 1000);
    });

    var loadCurrentConfig = function() {
      // Get cookies
      var configsSaved = Cookies.getJSON('saveConfigs');
      if (!!configsSaved) {
        $.each( configsSaved, function( key, value ) {
          $("[name='" + key + "']").val(value);
        });

        // Update style for font and color
        updateStyle();
      }
    }

    loadCurrentConfig();

    // Click button cancel
    $('.js-cancel').click(function(){
      $(this).addClass('is-active');
    });

    // Click button Confirm cancel
    var $jsConfirm = $('.js-confirm');
    $jsConfirm.click(function(){
      $jsConfirm.removeClass('is-active');
      $jsConfirm.removeClass('hide');

      if ($(this).hasClass('approve')) {
        $(this).addClass('is-active');
        $(this).next().addClass('hide');
        // Load current config variable
        loadCurrentConfig();
      } else {
        $(this).addClass('is-active');
        $(this).prev().addClass('hide');
      }
      setTimeout(function(){
        $('.js-cancel').removeClass('is-active');
      }, 1000);
      setTimeout(function(){
        $jsConfirm.removeClass('is-active');
        $jsConfirm.removeClass('hide');
      }, 1500);
    });

  });
}(this, this.document, this.jQuery));
