const PATH = './assets/js/functions/';
async function loader( option ) {
  if ( option === 'show' ) {
    $('.loader').show();
  } else if ( option === 'hide' ) {
    $('.loader').hide();
  }
}

async function requireOnce ( file, functionName, args ) {
  await $.getScript( file );
  const getRes = await window[functionName]( args );
  return getRes;
}

$(document).on('click', '.passwordEye', async function() {
  await requireOnce( `${PATH}showHidePassword.js`, 'showHidePassword', this );
});