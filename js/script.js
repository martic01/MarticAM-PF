$(document).ready(function() {
    // Toggle file explorer
    $('.fa-folder').click(function() {
        $('#wildspl').fadeToggle();
    });

    // Start typing animation
    if (typeof startTypingLoop === 'function') {
        startTypingLoop();
    }

    // Scroll reveal observer
    const revealEls = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        }, {
            threshold: 0.2,
        }
    );

    revealEls.forEach((el) => observer.observe(el));

    // Theme toggle
    let isNight = false;

    $('.theme').click(function() {
        let $this = $(this);
        isNight = !isNight
        const [dayicon, nighticon, sun, moon] = [
            '<i class="bi bi-brightness-high"></i>',
            '<i class="bi bi-moon-stars"></i>',
            '<i class="bi bi-brightness-high-fill sun"></i>',
            '<i class="bi bi-moon-stars-fill moon"></i>'
        ]
        let newIcon = !isNight ? nighticon : dayicon;
        let weatherIcon = !isNight ? moon : sun;
        $this.html(newIcon);
        $('.weather').html(weatherIcon)
        $('body').toggleClass('night day');
        $('.weather').toggleClass('skyn skyd');
    });

    // Initialize trail after a delay
    setTimeout(initializeTrail, 1000);

    // Initialize portfolio
    if (typeof initializePortfolio === 'function') {
        initializePortfolio();
    }

    // Reinitialize on window resize
    $(window).on('resize', function() {
        if (typeof initializeTrail === 'function') {
            initializeTrail();
        }
    });

    // Smooth scroll for navigation
    $('nav a, .iconsdisplay a').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target && target !== '#') {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 50
            }, 500);
        }
    });

    // Add scroll spy for active nav
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop();
        
        $('section, .topbg, .about, .service, .folio, .contact-section').each(function() {
            const top = $(this).offset().top - 100;
            const bottom = top + $(this).outerHeight();
            
            if (scrollPos >= top && scrollPos <= bottom) {
                const id = $(this).attr('id');
                $('nav ul li a').removeClass('active');
                $(`nav ul li a[href="#${id}"]`).addClass('active');
            }
        });
    });
});

// Add some additional utility functions
function changeBackgroundPattern(pattern) {
    $('body').removeClass('chevron-bg geometric-bg diamond-bg subtle-bg alternative-bg');
    $('body').addClass(pattern);
}

// Preload images for better performance
$(window).on('load', function() {
    $('img').each(function() {
        if (!this.complete) {
            $(this).on('load', function() {
                $(this).css('opacity', 1);
            });
        } else {
            $(this).css('opacity', 1);
        }
    });
});