const allInputs = document.querySelectorAll("input");

allInputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    let placeholder = input.previousElementSibling;

    if (
      !input.classList.contains("search-input") &&
      !input.classList.contains("comment-to-post-input")
    ) {
      if (input.value.length > 0) {
        placeholder.style.top = "0";
        placeholder.style.fontSize = "10px";
      } else {
        placeholder.style.top = "auto";
        placeholder.style.fontSize = "14px";
      }
    }
  });
});
