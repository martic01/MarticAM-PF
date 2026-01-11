

// Texts that will appear on the p8 line (rotated each loop)
const phrases = [
    'Aboyade Matthew a Developer. Problem Solver. Creator.',
    'A skillful programmer with critical thinking to solve real life problems using code',
    'Turning ideas into reliable, user-focused web experiences.',
    'I solve problems with clean, efficient, and modern code.',
    'Focused on simple, readable solutions that actually work.'
];

let phraseIndex = 0;  // will move to the next phrase each loop

function type(phrase, onComplete) {
    const lines = [
        {
            el: '.p1',
            tokens: [
                { type: 'text', text: '<!' },
                { type: 'span', className: 'pb', text: 'DOCTYPE' },
                { type: 'span', className: 'atr', text: ' html' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p2',
            tokens: [
                { type: 'text', text: '<' },
                { type: 'span', className: 'pb', text: 'html' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p3',
            tokens: [
                { type: 'text', text: '  <' },
                { type: 'span', className: 'pb', text: 'head' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p4',
            tokens: [
                { type: 'text', text: '    <' },
                { type: 'span', className: 'pb', text: 'title' },
                { type: 'text', text: '>' },
                { type: 'span', className: 'wh', text: 'MartcAM-PF' },
                { type: 'text', text: '</' },
                { type: 'span', className: 'pb', text: 'title' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p5',
            tokens: [
                { type: 'text', text: '  </' },
                { type: 'span', className: 'pb', text: 'head' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p6',
            tokens: [
                { type: 'text', text: '<' },
                { type: 'span', className: 'pb', text: 'body' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p7',
            tokens: [
                { type: 'text', text: '  <' },
                { type: 'span', className: 'pb', text: 'p' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p8',
            tokens: [
                { type: 'text', text: '    ' },
                {
                    type: 'span',
                    className: 'wh',
                    text: phrase          // <- dynamic phrase here
                }
            ]
        },
        {
            el: '.p9',
            tokens: [
                { type: 'text', text: '  </' },
                { type: 'span', className: 'pb', text: 'p' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p10',
            tokens: [
                { type: 'text', text: '</' },
                { type: 'span', className: 'pb', text: 'body' },
                { type: 'text', text: '>' }
            ]
        },
        {
            el: '.p11',
            tokens: [
                { type: 'text', text: '</' },
                { type: 'span', className: 'pb', text: 'html' },
                { type: 'text', text: '>' }
            ]
        }
    ];

    const charDelay = 40;   // ms per character
    const lineDelay = 150;  // pause between lines

    let lineIndex = 0;
    let tokenIndex = 0;
    let charIndex = 0;
    let currentNode = null;

    function step() {
        if (lineIndex >= lines.length) {
            if (typeof onComplete === 'function') onComplete();
            return;
        }

        const line = lines[lineIndex];
        const token = line.tokens[tokenIndex];

        if (!currentNode) {
            const $lineEl = $(line.el);

            if (token.type === 'span') {
                currentNode = $('<span>')
                    .addClass(token.className)
                    .appendTo($lineEl)[0];
            } else {
                currentNode = document.createTextNode('');
                $lineEl[0].appendChild(currentNode);
            }
        }

        currentNode.textContent += token.text.charAt(charIndex);
        charIndex++;

        if (charIndex >= token.text.length) {
            tokenIndex++;
            charIndex = 0;
            currentNode = null;

            if (tokenIndex >= line.tokens.length) {
                lineIndex++;
                tokenIndex = 0;
                setTimeout(step, lineDelay);
                return;
            }
        }

        setTimeout(step, charDelay);
    }

    step();
}

function startTypingLoop() {
    // clear previous run
    $('.p1, .p2, .p3, .p4, .p5, .p6, .p7, .p8, .p9, .p10, .p11').empty();

    // get current phrase and move index to the next one
    const phrase = phrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % phrases.length;  // cycles 0..3

    type(phrase, function () {
        const restartDelay = 3000; // ms pause before restarting
        setTimeout(startTypingLoop, restartDelay);
    });
}

const portfolioProjects = [
  {
    id: 1,
    title: "No Monsters(GAME)",
    description: "Welcome to the JavaScript Shooting Game! This is an exciting shooting game where players can shoot enemies and bosses while managing health and resources. The game is built using HTML, CSS, and JavaScript, providing a smooth and engaging gameplay experience.",
    category: "javascript",
    technologies: ["HTML", "CSS", "Javascript"],
    image: "../img/projimg/giphy.gif",
    liveLink: "https://martic01.github.io/rpggungame",
    githubLink: "https://github.com/martic01/rpggungame",
    featured: true
  },
  {
    id: 2,
    title: "calculator",
    description: "Martic calculator is a basic scientific calculator that help it user evalute the input value and return the answer , it contains various features like cos,sin,tan , root and evalute any number or expression e.t.c it doesn't return a wrong anwser.",
    category: "javascript",
    technologies: ["HTML5", "CSS3","Javascript"],
    image: "../img/projimg/giphy (1).gif",
    liveLink: "#",
    githubLink: "https://github.com/martic01/RealCalculator"
  },
  {
    id: 3,
    title: "Flipping Cards Game",
    description: "This is a JavaScript-based interactive card-flipping game where the player needs to uncover matching cards in order to win. ",
    category: "javascript",
    technologies: ["JavaScript","HTML", "CSS", "Animations"],
    image: "../img/projimg/giphy (2).gif",
    liveLink: "#",
    githubLink: "https://github.com/martic01/memory",
    featured: true
  },
  {
    id: 4,
    title: "Rotatin Glowing 3D cube",
    description: "Pure css 3D cube animation also includes good use of linear gradient",
    category: "html-css",
    technologies: ["HTML","CSS"],
    image: "../img/projimg/giphy (3).gif",
    liveLink: "#",
    githubLink: "https://github.com/martic01/rotatingglowingcube"
  },
  {
    id: 5,
    title: "Squid Dice",
    description: "This is a simple two-player dice game where each player rolls a virtual die to accumulate points. The first player to reach a specific score (e.g., 10) wins the game. ",
    category: "javascript",
    technologies: ["Javascript", "HTML", "CSS"],
       image: "../img/projimg/giphy (4).gif",
    liveLink: "#",
    githubLink: "https://github.com/martic01/squiddice",
    featured: true
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "Admin dashboard for social media analytics with user management, content scheduling, and engagement metrics visualization.",
    category: "react-jsx",
    technologies: ["React", "Redux", "Material-UI", "Recharts"],
    image: "../img/projimg/giphy (5).gif",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 7,
    title: "E-Learning Platform",
    description: "Full-featured e-learning platform with video streaming, quizzes, progress tracking, and certificate generation. Built with TypeScript for type safety.",
    category: "react-tsx",
    technologies: ["TypeScript", "React", "Vite", "Tailwind"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    liveLink: "#",
    githubLink: "#",
    featured: true
  },
  {
    id: 8,
    title: "Healthcare Dashboard",
    description: "Healthcare management system with patient records, appointment scheduling, and prescription management. Built with TypeScript for enterprise-level reliability.",
    category: "react-tsx",
    technologies: ["TypeScript", "React", "GraphQL", "Jest"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 9,
    title: "Fitness Tracker",
    description: "Mobile-first fitness tracking application with workout plans, calorie tracking, and progress visualization. Features offline PWA capabilities.",
    category: "javascript",
    technologies: ["PWA", "Service Workers", "IndexedDB", "Chart.js"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 10,
    title: "Restaurant Website",
    description: "Modern restaurant website with online ordering, table reservation, and menu management. Features smooth animations and mobile optimization.",
    category: "html-css",
    technologies: ["HTML5", "CSS3", "Animations", "Mobile-First"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
    liveLink: "#",
    githubLink: "#"
  }
];

// Function to create project card HTML
function createProjectCard(project, index) {
  return `
    <div class="project-card" data-category="${project.category}" style="--item-index: ${index % 10};">
      <div class="card-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <span class="card-category">${project.category.replace('-', ' ').toUpperCase()}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-description">${project.description}</p>
        
        <div class="card-tech">
          ${project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
          ).join('')}
        </div>
        
        <div class="card-links">
          <a href="${project.liveLink}" class="card-link" target="_blank" rel="noopener">
            <i class="fa-solid fa-external-link"></i>
            Live Demo
          </a>
          <a href="${project.githubLink}" class="card-link github" target="_blank" rel="noopener">
            <i class="fab fa-github"></i>
            Code
          </a>
        </div>
      </div>
    </div>
  `;
}

// Function to render projects
function renderProjects(category = 'javascript') {
  const grid = $('.projects-grid');
  
  // Add fade out animation
  grid.removeClass('active fade-in').addClass('fade-out');
  
  setTimeout(() => {
    grid.empty();
    
    let projectsToRender;
      projectsToRender = portfolioProjects.filter(project => project.category === category);

//  if (category === 'all') {
//       projectsToRender = portfolioProjects;
//     } else {
//       projectsToRender = portfolioProjects.filter(project => project.category === category);
//     }
    

    // Shuffle projects for visual variety (optional)
    const shuffledProjects = [...projectsToRender].sort(() => Math.random() - 0.5);
    
    shuffledProjects.forEach((project, index) => {
      grid.append(createProjectCard(project, index));
    });
    
    // Add animations
    grid.removeClass('fade-out').addClass('fade-in active');
    
    setTimeout(() => {
      grid.removeClass('fade-in');
    }, 500);
    
  }, 300);
}

// Function to update active category and trail
function updateActiveCategory(category) {
  // Remove active class from all categories
  $('.second li').removeClass('active');
  
  // Add active class to clicked category
  $(`.second li[data-category="${category}"]`).addClass('active');
  
  // Update trail position
  const activeItem = $(`.second li[data-category="${category}"]`);
  const listContainer = $('.second > ul');
  
  if (activeItem.length) {
    const itemWidth = activeItem.outerWidth();
    const itemLeft = activeItem.position().left;
    const containerLeft = listContainer.offset().left;
    
    $('.trail').css({
      width: itemWidth + 'px',
      left: (containerLeft + itemLeft) + 'px'
    });
  }
}

// Initialize portfolio
function initializePortfolio() {
  // Initial render (show all projects)
  renderProjects('javascript');
  updateActiveCategory('javascript');
  
  // Add click handlers to category buttons
  $('.second li').on('click', function() {
    const category = $(this).data('category');
    updateActiveCategory(category);
    renderProjects(category);
  });
}

// Update your existing initializeTrail function
function initializeTrail() {
  const listItems = $('.second li');
  const trail = $('.trail');
  const listContainer = $('.second > ul');
  
  if (listItems.length > 0) {
    const activeItem = listItems.filter('.active').first() || listItems.first();
    const itemWidth = activeItem.outerWidth();
    const itemLeft = activeItem.position().left;
    const containerLeft = listContainer.offset().left;
    
    trail.css({
      width: itemWidth + 'px',
      left: (containerLeft + itemLeft) + 'px'
    });
  }
  
}

function changeBackgroundPattern(pattern) {
    $('body').removeClass('chevron-bg geometric-bg diamond-bg subtle-bg alternative-bg');
    $('body').addClass(pattern);
}

$(document).ready(function () {
    $('.fa-folder').click(function () {
        $('#wildspl').fadeToggle();
    });

    startTypingLoop();

    const revealEls = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Scroll IN: add visible class
                    entry.target.classList.add("is-visible");
                } else {
                    // Scroll OUT: remove visible class (so it can animate again)
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.2, // 20% of element visible triggers the animation
        }
    );

    revealEls.forEach((el) => observer.observe(el));

    let isNight = false;

    $('.theme').click(function () {
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
        // $('body').toggleClass('chevron-bg diamond-bg');
    });

//  if (isNight) {
        
//     } else {
//         $('body').removeClass('diamond-bg chevron-bg');
//     }
     setTimeout(initializeTrail, 1000);
    
    function initializeTrail() {
        const listItems = $('.second li');
        const trail = $('.trail');
        const listContainer = $('.second > ul');
        
        // Position trail inside the list container
        trail.css({
            position: 'absolute',
            bottom: '0',
            // left: listContainer.offset().left + 'px'
        });
        
        // Set initial position to first item
        if (listItems.length > 0) {
            const firstItem = listItems.first();
            const itemWidth = firstItem.outerWidth();
            const itemLeft = firstItem.position().left;
            
            trail.css({
                width: itemWidth + 'px',
                left: (listContainer.offset().left + itemLeft) + 'px'
            });
        }
        
        // Update trail on hover
        listItems.each(function(index) {
            $(this).on('click', function() {
                const $this = $(this);
                const itemWidth = $this.outerWidth();
                const itemLeft = $this.position().left;
                const containerLeft = listContainer.offset().left;
                
                trail.css({
                    width: itemWidth + 'px',
                    left: (containerLeft + itemLeft) + 'px'
                });
            });
        });
        
     
    }

      initializePortfolio();
    
    // Reinitialize on window resize
    $(window).on('resize', initializeTrail);
});