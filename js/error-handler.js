window.onerror = function(message, source, lineno, colno, error) {
  console.error("error:", message);
  window.location.href = "404.html";
};
