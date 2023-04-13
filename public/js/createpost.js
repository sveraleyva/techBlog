async function createPost(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const body = document.querySelector("#body").value.trim();
  if (title && body) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to add post");
    }
  }
}

document.querySelector(".newPost-form").addEventListener("submit", createPost);
