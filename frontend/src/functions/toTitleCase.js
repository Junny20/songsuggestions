const toTitleCase = (s) => {
  const words = s.trim().split(" ");
  const new_words = words.map(
    (element) =>
      element.trim().slice(0, 1).toUpperCase() + element.slice(1).toLowerCase()
  );

  let output = "";
  new_words.forEach((e) => {
    if (e) {
      output += e;
      output += " ";
    }
  });

  console.log(output);

  return output;
};

export default toTitleCase;
