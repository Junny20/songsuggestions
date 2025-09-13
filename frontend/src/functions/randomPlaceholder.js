const possiblePlaceholders = [
  "What's a song you listen to?",
  "What's your top hit of the week?",
  "Feeling lucky? Roll the dice!",
  "Search up your favourite artist!",
  "Enter your favourite song! (Results may vary)",
];

const randomPlaceholder = () => {
  const randomPlaceholderIndex = Math.floor(
    Math.random() * possiblePlaceholders.length
  );
  return possiblePlaceholders[randomPlaceholderIndex];
};

export default randomPlaceholder;
