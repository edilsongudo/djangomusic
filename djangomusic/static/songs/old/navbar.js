$(document).ready(function() {

    var hamburger_icon = $('nav ul li i')

    $('.hamburger').click(function() {
        $('.sidebar').toggleClass('active')

        if (hamburger_icon.hasClass('fas fa-bars')) {
            hamburger_icon.removeClass('fas fa-bars')
            hamburger_icon.addClass('fas fa-times')
        } else {
            hamburger_icon.removeClass('fas fa-times')
            hamburger_icon.addClass('fas fa-bars')
        }
    })
});
