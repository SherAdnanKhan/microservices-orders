function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $(`label[for="avatar"]`).html(`
        <img src="${e.target.result}">
      `);
    };
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}