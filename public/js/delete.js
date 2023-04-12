async function deletePost(event) {
  const postId = parseInt(document.querySelector("#postId").textContent.trim());
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

document.querySelector("#deleteBtn").addEventListener("click", deletePost);
