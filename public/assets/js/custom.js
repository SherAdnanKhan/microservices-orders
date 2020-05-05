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
