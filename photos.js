document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("photo-list");
    const posts = JSON.parse(localStorage.getItem("posts")) || {};
  
    const photoPosts = Object.entries(posts)
      .filter(([, post]) => post.category === "사진첩")
      .sort((a, b) => b[0] - a[0]);
  
    for (const [id, post] of photoPosts) {
        const li = document.createElement("div");
        li.className = "photo-item";
        
        li.innerHTML = `
          <a href="board.html?id=${id}">
            <img src="${post.image}" alt="업로드 이미지">
          </a>
        `;
      list.appendChild(li);
    }
  });