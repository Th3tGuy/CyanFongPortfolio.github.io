// 1. theme toggle
const btn = document.createElement('button');
btn.id = 'theme';
btn.style.position='fixed';
btn.style.bottom='2rem';
btn.style.right='2rem';
btn.style.zIndex='999';
btn.textContent = '🌗';
document.body.appendChild(btn);
btn.onclick = () => {
  document.documentElement.classList.toggle('light');
  localStorage.theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
};
if (localStorage.theme === 'light' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  document.documentElement.classList.add('light');
}

// 2. auto year
document.getElementById('year').textContent = new Date().getFullYear();

// 3. counter slot-machine
const counters = document.querySelectorAll('.impact-number');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const final = parseFloat(e.target.textContent.replace(/[^0-9.]/g, ''));
      let curr = 0, inc = final / 60;
      const t = setInterval(() => {
        curr += inc;
        if (curr >= final) { curr = final; clearInterval(t); }
        e.target.textContent = e.target.textContent.replace(/[\d.]+/, curr.toFixed(curr % 1 === 0 ? 0 : 1));
      }, 16);
      io.unobserve(e.target);
    }
  });
}, { threshold: .7 });
counters.forEach(c => io.observe(c));

// 4. 3-D tilt & cursor glow
document.querySelectorAll('.impact-card, .role-card').forEach(card => {
  card.onmousemove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -20;
    const rotateY = (x / rect.width - 0.5) * 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  };
  card.onmouseleave = () => card.style.transform = '';
});

// 5. sticky glass header
const header = document.createElement('header');
header.innerHTML = `<h3>Fong Chong Yan</h3>`;
document.body.prepend(header);
addEventListener('scroll', () => header.classList.toggle('show', scrollY > 200));
// reveal on scroll
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('on');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.fade-up').forEach((el) => reveal.observe(el));