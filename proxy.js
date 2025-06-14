// parts from chatgpt might change later
function redirect() {
  const input = document.getElementById("url").value.trim();
  let finalUrl;

  // Check if input is a real URL
  if (isRealURL(input)) {
    finalUrl = input.startsWith("http") ? input : "https://" + input;
  } else {
    finalUrl = "https://www.google.com/search?q=" + encodeURIComponent(input);
  }

  // Add loading splash iframe
  const loadingFrame = document.createElement("iframe");
  loadingFrame.src = "loading.html";
  loadingFrame.style.position = "fixed";
  loadingFrame.style.top = 0;
  loadingFrame.style.left = 0;
  loadingFrame.style.width = "100%";
  loadingFrame.style.height = "100%";
  loadingFrame.style.border = "none";
  loadingFrame.style.zIndex = 9999;
  document.body.appendChild(loadingFrame);

  // Try to open in a new tab, fallback if blocked
  const newTab = window.open("loading.html");

  setTimeout(() => {
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
      window.location.href = finalUrl;
    } else {
      newTab.location.href = finalUrl;
      setTimeout(() => {
        if (document.body.contains(loadingFrame)) {
          document.body.removeChild(loadingFrame);
        }
      }, 500);
    }
  }, 1000);
}

function isRealURL(str) {
  const pattern = /^(https?:\/\/)?([\w\d\-]+\.)+[\w]{2,}(\/.*)?$/i;
  return pattern.test(str);
}

// Bookmark function fixed
function bookmark() {
  const input = document.getElementById("url").value.trim();
  let bookmarkedUrl;

  if (isRealURL(input)) {
    bookmarkedUrl = input.startsWith("http") ? input : "https://" + input;
    alert("Bookmarked: " + bookmarkedUrl);
    // You could store it in localStorage or another method here
  } else {
    alert("Sorry, we couldn't save your bookmarked link. Please enter a real link.");
  }
}
