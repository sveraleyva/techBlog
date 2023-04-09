async function createPost(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const body = document.querySelector("#body").value.trim();
  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "applications/json " },
  });
  if (response.ok) {
    console.log("good response");
    document.location.replace("/dashboard");
  } else {
    alert("Your post failed");
  }
}

document.querySelector(".newPost-form").addEventListener("click", createPost);
