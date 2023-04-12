function showForm() {
  const commentForm = document.getElementById("commentForm");
  commentForm.classList.remove("hidden");
}

async function addComment(event) {
  event.preventDefault();
  alert("working!");
  const body = document.querySelector("#commentBody").value.trim();
  const postId = parseInt(document.querySelector("#postId").textContent.trim());
  if (body && postId) {
    try {
      const response = await fetch(`/${postId}`, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      alert("Comment added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  }
}

document.querySelector("#commentForm").addEventListener("submit", addComment);
document.querySelector("#displayComment").addEventListener("click", showForm);
