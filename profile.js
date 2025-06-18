document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("uid");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const posts = JSON.parse(localStorage.getItem("posts")) || {};
  
    const user = users.find(u => u.id === uid);
    if (!user) {
      alert("존재하지 않는 사용자입니다.");
      window.location.href = "index.html";
      return;
    }
  
    document.getElementById("profile-title").textContent = ` ${user.nickname}님의 페이지`;
    document.getElementById("profile-avatar").src = user.avatar && user.avatar.trim() !== "" ? user.avatar : "images/익명.jpg";
    document.getElementById("profile-nickname").textContent = user.nickname;
    const list = document.getElementById("profile-posts");
    Object.entries(posts).forEach(([pid, post]) => {
      if (post.userId === uid) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `board.html?id=${pid}`;
        a.textContent = post.title;
        li.appendChild(a);
        list.appendChild(li);
      }
    });
  });