document.getElementById("lastModified").textContent = document.lastModified;
document.getElementById("currentyear").textContent = new Date().getFullYear();
const mainnav = document.querySelector('nav')
const hambutton = document.querySelector('#menu');
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
	// Keep the button's accessible name and state in sync with what it does.
	const isOpen = mainnav.classList.contains('show');
	hambutton.setAttribute('aria-expanded', isOpen);
	hambutton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    //console.log('Menu toggled...');
});
