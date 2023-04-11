function showForm() {
  const commentForm = document.getElementById("commentForm");
  commentForm.classList.remove("hidden");
}

async function addComment(event) {
  event.preventDefault();
  alert("working!");
  const body = document.querySelector("#commentBody").value.trim();
  if (body) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ body }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to add post");
    }
  }
}

document.querySelector("#commentForm").addEventListener("submit", addComment);
document.querySelector("#displayComment").addEventListener("click", showForm);
