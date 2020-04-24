async function showHidePassword (this_) {
  const checkEyeStatus = $(this_).attr('eye');
  if ( checkEyeStatus === 'off' ) {
    $(this_)
      .attr('eye', 'on')
      .find('i.far')
      .removeClass('fa-eye-slash fa-eye')
      .addClass('fa-eye')
      .parents()
      .closest('label')
      .find('input')
      .prop({'type' : 'text'});
  } else if ( checkEyeStatus === 'on' ) {
    $(this_)
    .attr('eye', 'off')
    .find('i.far')
    .removeClass('fa-eye-slash fa-eye')
    .addClass('fa-eye-slash')
    .parents()
    .closest('label')
    .find('input')
    .prop({'type' : 'password'});
  }
}