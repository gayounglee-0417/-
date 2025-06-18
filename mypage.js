document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("로그인이 필요합니다.");
      location.href = "login.html";
      return;
    }
  
    document.getElementById("mypage-avatar").src = user.avatar && user.avatar.trim() !== "" ? user.avatar : "images/익명.jpg";
    document.getElementById("mypage-nickname").textContent = user.nickname;
    document.getElementById("mypage-id").textContent = user.id;
  
    const allPosts = {
      ...JSON.parse(localStorage.getItem("posts") || "{}")
    };
  
    const list = document.getElementById("my-post-list");
    Object.entries(allPosts).forEach(([pid, post]) => {
      if (post.userId === user.id) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `board.html?id=${pid}`;
        a.textContent = post.title;
        li.appendChild(a);
        list.appendChild(li);
      }
    });
  });

const avatarInput = document.getElementById("avatar-input");
const avatarImage = document.getElementById("mypage-avatar");

avatarInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    avatarImage.src = event.target.result;

    // 프사 저장
    const user = JSON.parse(localStorage.getItem("currentUser"));
    user.avatar = event.target.result;
    localStorage.setItem("currentUser", JSON.stringify(user));

    // 게시물에 있는 사용자 아바타 연계
    const posts = JSON.parse(localStorage.getItem("posts") || "{}");
    for (const key in posts) {
      if (posts[key].userId === user.id) {
        posts[key].avatar = event.target.result;
      }
    }
    localStorage.setItem("posts", JSON.stringify(posts));
  };
  reader.readAsDataURL(file);
});

  