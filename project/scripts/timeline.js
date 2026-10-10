/* Timeline page: filters milestones by tag. The milestones live in the HTML,
   so the page is complete without this script; it only adds the filtering. */

const milestones = Array.from(document.querySelectorAll('.milestone'));
const years = Array.from(document.querySelectorAll('.year'));
const filterBar = document.querySelector('#filters');
const toolbar = document.querySelector('#timeline-toolbar');
const statusLine = document.querySelector('#timeline-status');

const LABELS = {
  all: 'milestones',
  hardware: 'hardware milestones',
  software: 'software milestones',
  company: 'company milestones',
};

const countByTag = (items) =>
  items.reduce((totals, item) => {
    const tag = item.dataset.tag;
    return { ...totals, [tag]: (totals[tag] ?? 0) + 1 };
  }, {});

const counts = countByTag(milestones);

const buildButtons = () => {
  const tags = ['all', 'hardware', 'software', 'company'];
  filterBar.innerHTML = tags
    .map((tag) => {
      const total = tag === 'all' ? milestones.length : counts[tag];
      const name = `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`;
      return `<button type="button" data-filter="${tag}" aria-pressed="${tag === 'all'}">${name} (${total})</button>`;
    })
    .join('');
};

const applyFilter = (tag) => {
  const visible = tag === 'all'
    ? milestones
    : milestones.filter((item) => item.dataset.tag === tag);

  milestones.forEach((item) => {
    item.hidden = !visible.includes(item);
  });

  /* A year with nothing left to show is hidden too, heading and all. */
  years.forEach((year) => {
    const shown = Array.from(year.querySelectorAll('.milestone'))
      .filter((item) => !item.hidden);
    year.hidden = shown.length === 0;
  });

  filterBar.querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', `${button.dataset.filter === tag}`);
  });

  statusLine.textContent = `Showing ${visible.length} ${LABELS[tag]}`;
};

const handleClick = (event) => {
  const button = event.target.closest('button');
  if (button) {
    applyFilter(button.dataset.filter);
  }
};

buildButtons();
toolbar.hidden = false;
filterBar.addEventListener('click', handleClick);
applyFilter('all');
