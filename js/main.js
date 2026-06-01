// ====================================
// Vanila JS
// ====================================
const form =
    document.getElementById("contactForm");

// Set timestamp saat halaman load
document.getElementById("formTime").value =
    Date.now();

form.addEventListener("submit", function(e){
    // VALIDASI HTML5
    if (!form.checkValidity()) {
        return;
    }

    // Honeypot check
    const honeypot =
        document.getElementById("website").value;

    if(honeypot !== ""){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Spam Detected',
            text: 'Submission blocked.'
        });
        return false;
    }

    // Time trap check
    const start =
        document.getElementById("formTime").value;

    const seconds =
        (Date.now() - start) / 1000;

    if(seconds < 3){
        e.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Too Fast',
            text: 'Please wait a few seconds before submitting.'
        });
        return false;
    }

    // SUCCESS POPUP
    setTimeout(() => {

        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you for contacting us.',
            timer: 3000,
            showConfirmButton: false
        });

    }, 500);

    // RESET FORM SETELAH REQUEST SELESAI
    setTimeout(() => {

        form.reset();

        // reset timestamp lagi
        document.getElementById("formTime").value =
            Date.now();

    }, 2000);

});

document.querySelectorAll('.select-service').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();

    // ambil h4 di container yang sama
    const serviceName = this.closest('.col-lg-4, .col-md-6')
      .querySelector('h4')
      .innerText;

    // isi subject
    const subjectInput = document.getElementById('subject');
    if (subjectInput) {
      subjectInput.value = `Inquiry: ${serviceName}`;
      subjectInput.focus();
    }

    // scroll ke contact form
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  });
});


// var iso = new Isotope('.grid', {
//   itemSelector: '.grid-item',
//   layoutMode: 'fitRows'
// });

// let visibleCount = 8; // misalnya 2 baris awal (3 kolom x 2)

// function updateItems() {
//   iso.arrange({
//     filter: function (itemElem, index) {
//       return index < visibleCount;
//     }
//   });
// }

// updateItems();

// document.querySelector('#ShowMorePortfolioPortFolio').addEventListener('click', () => {
//   visibleCount += 8; // tambah 2 baris lagi
//   updateItems();

//   // optional: hide button kalau sudah habis
//   if (visibleCount >= iso.getItemElements().length) {
//     document.querySelector('#ShowMorePortfolioPortFolio').style.display = 'none';
//   }
// });


// ====================================
//  jQuery
// ====================================
(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // ===================================
    // Portfolio isotope and filter: Start
    // ===================================
    // Config 
    var itemsPerPagePortfolio = 8;
    var showCountPortfolio = itemsPerPagePortfolio;
    var currentFilterPortfolio = '*';

    // Init Isotope
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    // Apply filter & show more
    function applyFilterPortfolio() {

        var visibleIndex = 0;

        portfolioIsotope.isotope({
            filter: function () {

                var $item = $(this);

                // cek apakah item cocok dengan filter aktif
                var matchFilterPortfolio =
                    currentFilterPortfolio === '*' ||
                    $item.is(currentFilterPortfolio);

                if (!matchFilterPortfolio) {
                    return false;
                }

                // tampilkan hanya sejumlah showCount
                visibleIndex++;

                return visibleIndex <= showCountPortfolio;
            }
        });

        // hitung total item yang cocok dengan filter
        var totalFilteredItemsPortfolio = $('.portfolio-item').filter(function () {
            return currentFilterPortfolio === '*' || $(this).is(currentFilterPortfolio);
        }).length;

        // show/hide tombol
        if (showCountPortfolio >= totalFilteredItemsPortfolio) {
            $('#showMorePortfolio').hide();
        } else {
            $('#showMorePortfolio').show();
        }
    }

    // Filter click
    $('#portfolio-flters li').on('click', function () {

        $('#portfolio-flters li').removeClass('active');
        $(this).addClass('active');

        currentFilterPortfolio = $(this).data('filter');

        // reset ke halaman pertama
        showCountPortfolio = itemsPerPagePortfolio;

        applyFilterPortfolio();
    });

    // Show more click
    $('#showMorePortfolio').on('click', function () {

        showCountPortfolio += itemsPerPagePortfolio;

        applyFilterPortfolio();

        // refresh layout isotope
        portfolioIsotope.isotope('layout');
    });

    // Init load
    applyFilterPortfolio();
    
    // ===================================
    // Portfolio isotope and filter: End
    // ===================================


    // ===================================
    // Collaboration isotope and filter: Start
    // ===================================
    var collaborationIsotope = $('.collaboration-container').isotope({
        itemSelector: '.collaboration-item',
        layoutMode: 'fitRows'
    });
    $('#collaboration-flters li').on('click', function () {
        $("#collaboration-flters li").removeClass('active');
        $(this).addClass('active');

        collaborationIsotope.isotope({filter: $(this).data('filter')});
    });
    // ===================================
    // Collaboration isotope and filter: End
    // ===================================
    
    
    // ===================================
    // Back to top button: Start
    // ===================================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    // ===================================
    // Back to top button: End
    // ===================================


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

    // GLightbox
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        autoplayVideos: true
    });
    
})(jQuery);



