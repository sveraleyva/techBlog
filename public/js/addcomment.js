function showForm() {
  const commentForm = document.getElementById("commentForm");
  commentForm.classList.remove("hidden");
}

function hideForm() {
  console.log("hide form activated");
  const commentForm = document.getElementById("commentForm");
  commentForm.classList.add("hidden");
}

async function addComment(event) {
  event.preventDefault();
  const body = document.querySelector("#commentBody").value.trim();
  const postId = parseInt(document.querySelector("#postId").textContent.trim());
  if (body && postId) {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      hideForm();
      // refresh the page so the new comment is displayed
      document.location.replace(`/api/post/${postId}`);
      const data = await response.json();
    } catch (err) {
      alert("Failed to add post");
      console.error(err);
    }
  }
}


document.querySelector("#displayComment").addEventListener("click", showForm);
document.querySelector("#commentForm").addEventListener("submit", addComment);
