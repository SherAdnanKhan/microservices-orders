async function validateAndGo ( this_ ) {
  const getStepNo = $(this_).parents().closest('.registerationScreen').find('[active="true"]').attr('step') * 1;
  if ( getStepNo === 1 ) {
    $(`div[step="${getStepNo}"]`)
      .addClass('slideOutUp');

    hideStep( getStepNo );
    nextStep( getStepNo + 1 );
  } else if ( getStepNo === 2 || getStepNo === 3 || getStepNo === 4 ) {
    const checkRes = await requireOnce(`${PATH}formvalidation.js`, 'validateForm', `div[step="${getStepNo}"]`);
    if ( checkRes === 0 ) {
      hideStep( getStepNo );
      nextStep( getStepNo + 1 );
    }
  } else if ( getStepNo === 5 ) {
    const checkRes = await requireOnce(`${PATH}formvalidation.js`, 'validateForm', `div[step="${getStepNo}"]`);
    if ( checkRes === 0 ) {
      const p1  = $(`#password_1`).val(),
            p2  = $(`#password_2`).val();
      if ( p1 !== p2 ) {
        $(`div[step="5"] .error`).remove();

        $(`div[step="5"]`).append(`
          <div class="error">
            Password and confirm password not matched
          </div>
        `);
      } else if ( p1 === p2 && p1.length < 8 ) {
        $(`div[step="5"] .error`).remove();

        $(`div[step="5"]`).append(`
          <div class="error">
            Password must have at least eight characters
          </div>
        `);
      } else {
        hideStep( getStepNo );
        nextStep( getStepNo + 1 );
      }
    }
  } else if ( getStepNo === 6 ) {
    hideStep( getStepNo );
    nextStep( getStepNo + 1 );
  }

  $('.return').attr('current-step', getStepNo + 1);

}

async function nextStep ( stepIs ) {
  setTimeout( () => {
    $(`div[step="${stepIs}"]`)
      .attr('active', 'true')
      .addClass('fadeIn');
  }, 800);
  setTimeout(() => {
    $(`div[step="${stepIs}"]`)
      .removeClass('fadeIn');
  }, 900);
}

async function hideStep ( stepIs ) {
  setTimeout( () => {
    $(`div[step="${stepIs}"]`)
      .removeAttr('active')
      .removeClass('slideOutUp');
  }, 800);
}

