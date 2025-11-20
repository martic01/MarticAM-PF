

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





$(document).ready(function () {
    $('.fa-folder').click(function () {
        $('#wildspl').fadeToggle();
    });

    startTypingLoop();
});