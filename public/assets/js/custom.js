const PATH = './assets/js/functions/';
async function loader(option) {
  if (option === 'show') {
    $('.loader').show();
  } else if (option === 'hide') {
    $('.loader').hide();
  }
}

async function requireOnce(file, functionName, args) {
  await $.getScript(file);
  const getRes = await window[functionName](args);
  return getRes;
}

$(document).on('click', '.passwordEye', async function () {
  await requireOnce(`${PATH}showHidePassword.js`, 'showHidePassword', this);
});

$(document).ready(function () {
  $('.view').keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});


$(document).on('click', '.feelIcon', async function (e) {
  e.preventDefault();
  e.stopPropagation();

  $('.dropdown-content').hide();
  $('.colorChangerScreen').toggle();
});

$(document).on('click', 'nav a ', function () {
  $('nav').hide();
  $('.menuBlock').find('.fas').removeClass('fa-arrow-left fa-ellipsis-v').addClass('fa-ellipsis-v');
});

$(document).on('click', '#search', function () {
  $("#search-bar").css("display", "flex");
  $("#search-field").focus();
  $("#main-menu").hide();
  $(".do-not-delete").hide();
  $('nav').hide();
  $("#search-result").show();
});

$(document).on('click', '#go-back', function () {
  $("#search-bar").css("display", "none");
  $("#main-menu").show();
  $(".do-not-delete").show();
  $("#search-result").hide();
  $('nav').show();
});

$(document).click(function () {
  let scroll = $(window).scrollTop();
  let opacity = 0.3;

  if (scroll === 0) {
    opacity = 1;
  } else {
    opacity = 0.3
  }

  $(".left").css("opacity", opacity);
  $(".right").css("opacity", opacity);
  // $(".bottom").css("opacity", opacity);

  $(".left").removeClass("toggle");
  $(".right").removeClass("toggle");
  // $(".bottom").removeClass("toggle");

  $('.colorChangerScreen').hide();
  $('.dropdown-content').hide();

  $(".add-img-vid-box, .add-img-vid-box-viewpost").hide();
  $("body").css("overflow-y", "auto");

});

$(document).on('click', '.item-box', function () {
  $(".my-studio-edit").show();
  $(".edit-user-page").hide();
});
$(document).on('click', '.go-to-profile', function () {
  $(".my-studio-edit").hide();
  $(".edit-user-page").show();
});

$(document).on('click', '.left', function (e) {
  $(".left").css("opacity", "1");
  $('.left').addClass('toggle')
  $('.right').removeClass('toggle')
  // $('.bottom').removeClass('toggle')

  e.stopPropagation();
});

$(document).on('click', '.invisible-left', function (e) {
  $(".left").css("opacity", "1");
  $('.left').addClass('toggle')
  $('.right').removeClass('toggle')
  // $('.bottom').removeClass('toggle')

  e.stopPropagation();
});

$(document).on('click', '.invisible-right', function (e) {
  $(".right").css("opacity", "1");
  $('.right').addClass('toggle')
  $('.left').removeClass('toggle')
  // $('.bottom').removeClass('toggle')
  e.stopPropagation();
});

$(document).on('click', '.right', function (e) {
  $(".right").css("opacity", "1");
  $('.right').addClass('toggle')
  $('.left').removeClass('toggle')
  // $('.bottom').removeClass('toggle')
  e.stopPropagation();
});

$(document).on('click', '.bottom', function (e) {
  // $(".bottom").css("opacity", "1");
  // $('.bottom').addClass('toggle')
  $('.right').removeClass('toggle')
  $('.left').removeClass('toggle')

  e.stopPropagation();
});

$(document).on('click', '.result-box', function () {
  // $("#search-bar").hide();
  $("#search-bar").css("display", "none");
  $("#main-menu").show();
  $(".do-not-delete").show();
  $("#search-result").hide();
  $('nav').show();
  $("#main-menu").show();
});

$(document).on('click', '.fa-square', function () {
  $(".fa-square , .post-picture").hide();
  $(".show-list , .fa-th").show();
  $(".gallery-cover").css({ 'display': 'flex' })
});

$(document).on('click', '.fa-th', function () {
  $(".show-list , .fa-th").hide();
  $(".fa-square , .post-picture").show();
  $(".gallery-cover").css({ 'display': 'block' })
});

$(document).on('input', '#addbio', function () {
  this.style.width = this.value.length + "ch";
});

//use for opacity
let position = $(window).scrollTop();

$(window).scroll(function () {
  const scroll = $(window).scrollTop();
  if (scroll > position) {
    // $(".frameReady .top").css({ 'opacity': '0.8' });
    $(".frameReady .popUpChatMsg").css({ 'opacity': '0.5' });
    $(".frameReady .bottom").css({ 'opacity': '0.5' });
    $(".frameReady .left").css({ 'opacity': '0.5' });
    $(".frameReady .right").css({ 'opacity': '0.5' });
    $(".left").removeClass("toggle");
    $(".right").removeClass("toggle");
    $(".bottom").removeClass("toggle");
  } else {
    if (scroll === 0) {
      $(".frameReady .top").css({ 'opacity': '1' });
      $(".frameReady .bottom").css({ 'opacity': '1' });
      $(".frameReady .left").css({ 'opacity': '1' });
      $(".frameReady .right").css({ 'opacity': '1' });

      $(".left").removeClass("toggle");
      $(".right").removeClass("toggle");
      // $(".bottom").removeClass("toggle");
    }
  }
  position = scroll;
});

$(document)
  .on('click', '.controls .arrow-up', function () {
    const getActiveSlide = $('.vSlider .slides .item.active').prev('.item').length;
    if (getActiveSlide > 0) {
      $('.vSlider .slides .item.active')
        .removeClass('active')
        .prev()
        .addClass('active');
      let top = 0;
      var stop = false;
      $('.vSlider .slides .item')
        .each(function (i) {
          const checkClass = $(this).hasClass('active');
          if (checkClass == false && stop == false) {
            top += $(this).outerHeight(true);
          } else if (checkClass == true && stop == false) {
            stop = true;
          }
        });

      $('.vSlider .slides').scrollTop(top);
    }
  });

$(document)
  .on('click', '.controls .arrow-down', function () {
    const getActiveSlide = $('.vSlider .slides .item.active').next('.item').length;
    if (getActiveSlide > 0) {
      $('.vSlider .slides .item.active')
        .removeClass('active')
        .next()
        .addClass('active');
      let top = 0;
      var stop = false;
      $('.vSlider .slides .item')
        .each(function (i) {
          const checkClass = $(this).hasClass('active');
          if (checkClass == false && stop == false) {
            top += $(this).outerHeight(true);
          } else if (checkClass == true && stop == false) {
            stop = true;
          }
        });
      $('.vSlider .slides').scrollTop(top);
    }
  });

$(document).on('click', '.postOptions', function (e) {
  e.stopPropagation();
  $(this)
    .closest('.post-page')
    .find('.add-img-vid-box')
    .toggle();
  $(this)
    .closest('.post-page')
    .find('.add-img-vid-box-viewpost')
    .toggle();
  $(this)
    .closest('.list-body')
    .find('.add-img-vid-box')
    .toggle();

  if ($(this)
    .closest('.post-page')
    .find('.add-img-vid-box').css('display') === "block") {
    $("body").css("overflow", "hidden");
  }
  else if ($(this)
    .closest('.list-body')
    .find('.add-img-vid-box')
    .css('display') === "block") {
    $("body").css("overflow", "hidden");
    $(".screen").css("overflow", "hidden");
  }
  else if ($(this)
    .closest('.post-page')
    .find('.add-img-vid-box-viewpost')
    .css('display') === "block") {
    $("body").css("overflow", "hidden");

  }
  else {
    $("body").css("overflow-y", "auto");
    $(".screen").css("overflow-y", "auto");
  }
})


// $('body').click(function (event) {
//   // event.stopPropagation();
//   if (!$(event.target).closest('.add-img-vid-box').length && !$(event.target).is('.add-img-vid-box')) {
//     $(".add-img-vid-box, .add-img-vid-box-viewpost").hide();
//     $("body").css("overflow-y", "auto");
//     $(".screen").css("overflow-y", "auto");
//   }
// });

// $(document).mouseup(function (e) {
//   const container = $(`.colorChangerScreen`);
//   if (!container.is(e.target) && container.has(e.target).length === 0) {
//     container.hide();
//   }
// });

// $(document)
//   .on('click', '.post-body', function (e) {
//     $('.add-img-vid-box').hide();
//     $(this)
//       .prev('.valut-icon')
//       .toggleClass('show-valut');

//     $(this)
//       .siblings('.onearttitle')
//       .find('.lobby-icon')
//       .toggleClass('lobby-icon-slide');
//   })
//   .on('click', '.ncomm-img', function (e) {
//     $(this)
//       .closest(`.post-page`)
//       .find(`.ncomm-slider`)
//       .toggleClass('show')
//   })

$(document).on('click', '.add-strq .dropdown', function (e) {
  e.stopPropagation();
  $(this).find('.dropdown-content').toggle()
})

$(document).on('click', '.notification', function (e) {
  e.stopPropagation();
  $(this).find('.dropdown-content').toggle();
})

$(document).on('click', '.notification .dropdown-content', function (e) {
  e.stopPropagation();
})


$(document).on('click', '.messageDots .fa-ellipsis-v', function (e) {
  e.stopPropagation();
  $(this).closest(`.messageDots`).find('.dropdown-content').toggle()
})


$(document)
  .on('click', '.lobby-img, .mystudio-img, .add-img, .mzflash-img, .strq-img', function (e) {
    e.stopPropagation();

    $(".left").removeClass("toggle");
    $(".right").removeClass("toggle");
  })