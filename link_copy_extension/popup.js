document.querySelectorAll(".btn").forEach(btn => {
  const label = btn.innerText;

  btn.addEventListener("click", () => {
    const link = btn.dataset.link;

    navigator.clipboard.writeText(link)
      .then(() => {
        btn.innerText = "✔ Copied!";
        setTimeout(() => btn.innerText = label, 700);
      });
  });
});
