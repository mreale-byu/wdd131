/* Thank-you page: greets the visitor by name if they gave one, and reports how
   often they have sent feedback from this device. */

const COUNT_KEY = 'retro-feedback-count';
const MAX_NAME = 80;

const heading = document.querySelector('#thanks-title');
const countLine = document.querySelector('#feedback-count');

const readName = () => {
  const raw = new URLSearchParams(window.location.search).get('name') ?? '';
  return raw.trim().slice(0, MAX_NAME);
};

const readCount = () => {
  try {
    return Number.parseInt(window.localStorage.getItem(COUNT_KEY), 10) || 0;
  } catch {
    return 0;
  }
};

const greet = (name) => (name === '' ? 'Thank you.' : `Thank you, ${name}.`);

const describeCount = (total) =>
  total === 1
    ? 'That is the first feedback you have sent from this device.'
    : `You have now sent feedback ${total} times from this device.`;

heading.textContent = greet(readName());

const total = readCount();
if (total > 0) {
  countLine.textContent = describeCount(total);
  countLine.hidden = false;
}
