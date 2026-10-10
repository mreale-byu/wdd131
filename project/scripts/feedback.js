/* Feedback form: The only job it does is to count/store successful sends.  */

const COUNT_KEY = 'retro-feedback-count';

const form = document.querySelector('#feedback-form');

const readCount = () => {
  try {
    return Number.parseInt(window.localStorage.getItem(COUNT_KEY), 10) || 0;
  } catch {
    return 0;
  }
};

/* A submit event only fires once the browser's own checks have passed. */
const recordFeedback = () => {
  try {
    window.localStorage.setItem(COUNT_KEY, `${readCount() + 1}`);
  } catch {
    /* Private browsing or storage disabled: the visitor still reaches the
       thank-you page, the count simply does not move. */
  }
};

form.addEventListener('submit', recordFeedback);
