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