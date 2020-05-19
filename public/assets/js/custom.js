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

$(document).on('click', '.menuBlock', function () {
  const checkNav = $('nav').css('display');
  if (checkNav == 'none') {
    $('nav').show();
    $(this).find('.fas').removeClass('fa-arrow-left fa-ellipsis-v').addClass('fa-arrow-left');
  } else {
    $('nav').hide();
    $(this).find('.fas').removeClass('fa-arrow-left fa-ellipsis-v').addClass('fa-ellipsis-v');
  }
});

$(document).on('click', 'nav a ', function () {
  $('nav').hide();
  $('.menuBlock').find('.fas').removeClass('fa-arrow-left fa-ellipsis-v').addClass('fa-ellipsis-v');
});

$(document).on('click', '#search', function () {
  $("#search-bar").css("display", "flex");
  $("#main-menu").hide();
  $(".do-not-delete").hide();
  $("#search-result").show();
});
$(document).on('click', '#go-back', function () {
  $("#search-bar").css("display", "none");
  $("#main-menu").show();
  $(".do-not-delete").show();
  $("#search-result").hide();
});

// $(document).on('click', '.item-box-1', function (e) {
//   $(".item-box-1").css({ "transform": "scale(1.2)", "z-index": "9" });
//   $(".item-box-2").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-3").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-4").css({ "transform": "scale(1)", "z-index": "1" });
//   e.stopPropagation();
// });
// $(document).on('click', '.item-box-2', function (e) {
//   $(".item-box-2").css({ "transform": "scale(1.2)", "z-index": "9" });
//   $(".item-box-1").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-3").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-4").css({ "transform": "scale(1)", "z-index": "1" });
//   e.stopPropagation();
// });
// $(document).on('click', '.item-box-3', function (e) {
//   $(".item-box-3").css({ "transform": "scale(1.2)", "z-index": "9" });
//   $(".item-box-2").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-1").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-4").css({ "transform": "scale(1)", "z-index": "1" });
//   e.stopPropagation();
// });
// $(document).on('click', '.item-box-4', function (e) {
//   $(".item-box-4").css({ "transform": "scale(1.2)", "z-index": "9" });
//   $(".item-box-2").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-3").css({ "transform": "scale(1)", "z-index": "1" });
//   $(".item-box-1").css({ "transform": "scale(1)", "z-index": "1" });
//   e.stopPropagation();
// });

$(document).click(function () {
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
  $(".right").css("right", "-42px");
  $(".bottom").css("bottom", "-42px");
  e.stopPropagation();
});
$(document).on('click', '.right', function (e) {
  $(".right").css("right", "0px");
  $(".bottom").css("bottom", "-42px");
  $(".left").css("left", "-42px");
  e.stopPropagation();
});
$(document).on('click', '.bottom', function (e) {
  $(".bottom").css("bottom", "0px");
  $(".left").css("left", "-42px");
  $(".right").css("right", "-42px");
  e.stopPropagation();
});

$(document).on('click', '.result-box', function () {
  $("#search-bar").hide();
  $("#main-menu").show();
});