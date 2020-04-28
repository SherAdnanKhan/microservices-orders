async function validateForm(wrapperFields) {
  let validationErr = 0;
  $(`
    ${wrapperFields} input[required],
    ${wrapperFields} textarea[required],
    ${wrapperFields} select[required],
    ${wrapperFields} file[required]
  `).each(function () {
    const checkInputVal = $(this).val();
    if (checkInputVal === '') {
      $(this)
        .removeClass('is-valid is-invalid')
        .addClass('is-invalid');
      validationErr++;
    } else {
      $(this)
        .removeClass('is-valid is-invalid')
        .addClass('is-valid');
    }
  });
  return validationErr;
}
