async function editPost(event) {
  alert("edit post engaged!");
  event.preventDefault();

  const postId = parseInt(document.querySelector("#postId").textContent.trim());
  const title = document.querySelector("#title").value.trim();
  const body = document.querySelector("#body").value.trim();

  if (title && body && postId) {
    try {
      const response = await fetch(`/api/post/${postId}/edit`, {
        method: "PUT",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      document.location.replace(`/api/post/${postId}`);
    } catch (err) {
      alert("Failed to edit post");
      console.error(err);
    }
  }
}

document.querySelector(".editPost-form").addEventListener("submit", editPost);
