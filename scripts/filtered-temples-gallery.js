
/* The card template */
const cardTemplate = (temple) => `
<section class="card">
    <h2>${temple.templeName}</h2>
    <p>Location:<span>${temple.location}</span></p>
    <p>Dedicated:<span>${temple.dedicated}</span></p>
    <p>Size:<span>${temple.area} sq ft</span></p>
    <img src="${temple.imageUrl}" alt="Image representing ${temple.templeName} Temple"
         loading="lazy" width="400" height="250">
</section>`;

const title = document.querySelector('.title');
const gallery = document.querySelector('.gallery');
const nav = document.querySelector("#primary-nav");
const hamburger = document.querySelector('#menu');

/* For each view, register the title and filter. Data are indexed by view id */
const views = new Map([
    ['home', { title: 'Home', filter: () => true }],
    ['old', { title: 'Old Temples', filter: (temple) => temple.year < 1900 }],
    ['new', { title: 'New Temples', filter: (temple) => temple.year > 2000 }],
    ['large', { title: 'Large Temples', filter: (temple) => temple.area > 90000 }],
    ['small', { title: 'Small Temples', filter: (temple) => temple.area < 10000 }],
]);

/* Renders the gallery by writing the gallery's HTML. */
const render = (id) => {
    const view = views.get(id);
    if (!view) return; // sanity check
    title.textContent = view.title;
    gallery.innerHTML = temples.filter(view.filter).map(cardTemplate).join('');
};

/* Updates the navigation links to reflect the current view */
const updateLinks = (id) => {
    nav.querySelectorAll('a').forEach((item) => {
        if (item.hash.slice(1) === id) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
    });
    // Small view only: close the menu so it stops covering the gallery
    if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        hamburger.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
    }
};

/* Shows the specified view by its id */
const showView = (id) => {
    render(id);
    updateLinks(id);
};

/* One listener for all navs */
nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (! link) return; // a click on the nav's padding, not on a link
    event.preventDefault();
    showView(link.hash.slice(1));
});

// The default view.
showView('home');
