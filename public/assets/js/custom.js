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

// $(document).on('click', '.registerationScreen button.btn', async function (e) {
//   e.preventDefault();
//   await requireOnce(`${PATH}registerationSteps.js`, 'validateAndGo', this);
// });

// $(document).on('change', '#avatar', async function () {
//   await requireOnce(`${PATH}readFile.js`, 'readURL', this);
// });

// $(document).on('click', '.return', async function () {
//   let currentStep = await getCurrentStepNo();
//   backStepIs = currentStep * 1 - 1;
//   if (backStepIs > 0) {
//     $('.return').attr('current-step', backStepIs);
//     $('.registerationScreen div[step]').removeAttr('active');
//     $(`.registerationScreen div[step="${backStepIs}"]`).attr('active', 'true');
//   }
//   console.log('currentStep', currentStep);
// });

// $(document).ready(function () {
//   $('.view').keydown(function (event) {
//     if (event.keyCode == 13) {
//       event.preventDefault();
//       return false;
//     }
//   });
// });

// async function getCurrentStepNo() {
//   return $('.registerationScreen div[active="true"]').attr('step');
// }

$(document).on('click', '.feelIcon', async function (e) {
  e.preventDefault();
  $('.colorChangerScreen').show();
});

$(document).on('click', '.colorChangerScreen img[color]', async function () {
  const getColor = $(this).attr('color');
  if (getColor != undefined) {
    $('.frameReady')
      .removeClass('gold gray red purple dodgerblue orange limegreen')
      .addClass(getColor);
  }
  $('.colorChangerScreen').hide();
});

// $(document).on('click', '.menuBlock', function () {
//   const checkNav = $('nav').css('display');
//   if (checkNav == 'none') {
//     $('nav').show();
//     $(this).find('.fas').removeClass('fa-arrow-left fa-ellipsis-v').addClass('fa-arrow-left');
//   } else {
//     $('nav').hide();
//     $(this).find('.fas').removeClass('fa-arrow-left fa-ellipsis-v').addClass('fa-ellipsis-v');
//   }
// });

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
  $(".bottom").css("opacity", opacity);

  $(".left").css("left", "-42px");
  $(".right").css("right", "-42px");
  $(".bottom").css("bottom", "-42px");
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
  $(".left").css("left", "0px");
  $(".left").css("opacity", "1");
  $(".right").css("right", "-42px");
  $(".bottom").css("bottom", "-42px");

  e.stopPropagation();
});

$(document).on('click', '.right', function (e) {
  $(".right").css("right", "0px");
  $(".right").css("opacity", "1");
  $(".bottom").css("bottom", "-42px");
  $(".left").css("left", "-42px");
  e.stopPropagation();
});

$(document).on('click', '.bottom', function (e) {
  $(".bottom").css("bottom", "0px");
  $(".bottom").css("opacity", "1");
  $(".left").css("left", "-42px");
  $(".right").css("right", "-42px");
  e.stopPropagation();
});

$(document).on('click', '.result-box', function () {
  // $("#search-bar").hide();
  console.log("closed")
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
});

$(document).on('click', '.fa-th', function () {
  $(".show-list , .fa-th").hide();
  $(".fa-square , .post-picture").show();
});

$(document).on('click', '.open-commet', function () {
  $(".comments-box").show();
});

$(document).on('click', '.close-comment', function () {
  $(".comments-box").hide();
});
//for input
$(document).on('input', '#addbio', function () {
  this.style.width = this.value.length + "ch";
});
//use for opacity
let position = $(window).scrollTop();

$(window).scroll(function () {
  const scroll = $(window).scrollTop();
  if (scroll > position) {
    $(".frameReady .top").css({ 'opacity': '0.5' });
    $(".frameReady .bottom").css({ 'opacity': '0.5' });
    $(".frameReady .left").css({ 'opacity': '0.5' });
    $(".frameReady .right").css({ 'opacity': '0.5' });

    $(".left").css("left", "-42px");
    $(".right").css("right", "-42px");
    $(".bottom").css("bottom", "-42px");
  } else {
    if (scroll === 0) {
      $(".frameReady .top").css({ 'opacity': '1' });
      $(".frameReady .bottom").css({ 'opacity': '1' });
      $(".frameReady .left").css({ 'opacity': '1' });
      $(".frameReady .right").css({ 'opacity': '1' });

      $(".left").css("left", "-42px");
      $(".right").css("right", "-42px");
      $(".bottom").css("bottom", "-42px");
    }
  }
  position = scroll;
});

//image preview js

// var modal = document.getElementById("myModal-img");

// Get the image and insert it inside the modal - use its "alt" text as a caption
// var img = document.getElementById("myImg");
// var modalImg = document.getElementById("img01");
// img.onclick = function () {
//   modal.style.display = "block";
//   modalImg.src = this.src;
//   captionText.innerHTML = this.alt;
// }

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// }

// $(document).on('click', '.post-body', function () {
//   $(this).next().find('.lobby-icon').toggleClass("lobby-icon-slide");
//   $(this).prev().toggleClass("lobby-icon-slide");
// });


// $(document).on('click', '.list-body', function () {
//   $(this).find('.lobby-icon').toggleClass("lobby-icon-slide");
//   $(this).prev().toggleClass("lobby-icon-slide");
// });


// $(document).on('click', '.action-w', function () {
//   if ($(this).parents('.post-footer').find('.duplicate-img').length <= 0) {
//     let src = $(this).parents('.post-footer').prev().find('img').attr('src');
//     $(this).parents('.post-footer').find('.post-title').after(`
//     <div class="duplicate-img">
//     <img src="${src}"/>
//     </div>
//     `);
//   } else {
//     $(this).parents('.post-footer').find('.duplicate-img').remove();
//   }
// });

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

(function () {

  // how many milliseconds is a long press?
  var longpress = 2000;
  // holds the start time
  var start;

  // $(document).on('mousedown', ".post-body > img", function (e) {
  //   start = new Date().getTime();
  // });

  // $(document).on('mouseleave', ".post-body > img", function (e) {
  //   start = 0;
  // });

  // $(document).on('mouseup', ".post-body > img", function (e) {
  //   if (new Date().getTime() >= (start + longpress)) {
  //     $(this).parent().find('.right-clicked').show();
  //   }
  // });

}());
// $(document).on('click', '.action-w', function () {
//   $('.my-slider').css({
//     'height': '150px',
//     'color': 'white',
//     'font-size': '44px'
//   });
// })