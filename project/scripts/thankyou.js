/* Thank-you page: greeting, send counter, and a guard that keeps the page
   reachable only from the feedback form. */

const COUNT_KEY = 'retro-feedback-count';
const MAX_NAME = 80;
const TOPICS = ['0', '1', '2', '3'];

const params = new URLSearchParams(window.location.search);
const heading = document.querySelector('#thanks-title');
const countLine = document.querySelector('#feedback-count');

/* get() answers null when absent, '' when empty. Neither is on the list. */
const isValidTopic = (value) => TOPICS.includes(value);

const readName = () => (params.get('name') ?? '').trim().slice(0, MAX_NAME);

const readCount = () => {
  try {
    return Number.parseInt(window.localStorage.getItem(COUNT_KEY), 10) || 0;
  } catch {
    return 0;
  }
};

/* Arriving here proves the send went through. A reload must not count twice. */
const recordFeedback = () => {
  if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
    return;
  }

  try {
    window.localStorage.setItem(COUNT_KEY, `${readCount() + 1}`);
  } catch {
    /* Storage disabled: the count does not move, the page still works. */
  }
};

const greet = (name) => (name === '' ? 'Thank you.' : `Thank you, ${name}.`);

const describeCount = (total) =>
  total === 1
    ? 'That is the first feedback you have sent from this device.'
    : `You have now sent feedback ${total} times from this device.`;

if (!isValidTopic(params.get('topic'))) {
  window.location.replace('feedback.html');
} else {
  recordFeedback();

  heading.textContent = greet(readName());

  const total = readCount();
  if (total > 0) {
    countLine.textContent = describeCount(total);
    countLine.hidden = false;
  }
}
