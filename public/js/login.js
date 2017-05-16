$('.login-input').on('focus', function() {
  $('.login').addClass('focused');
});

$('.login-form').on('submit', function(e) {
  $('.login').removeClass('focused').addClass('loading');
});
