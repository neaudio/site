document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const answer = item.nextElementSibling;
        answer.classList.toggle('hidden');
    });
});