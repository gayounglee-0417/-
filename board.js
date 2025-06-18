let id;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  id = params.get("id");

  const saved = JSON.parse(localStorage.getItem("posts") || "{}");
  const posts = { ...saved };

  if (!posts[id]) {
    document.getElementById("post-title").textContent = "글을 찾을 수 없습니다.";
    document.getElementById("post-content").textContent = "존재하지 않는 글입니다.";
    return;
  }

  const post = posts[id];

  // 조회수 증가
  post.views = (post.views || 0) + 1;
  posts[id] = post;
  localStorage.setItem("posts", JSON.stringify(posts));

  // 뒤로 가기 버튼
  const backLink = document.getElementById("back-link");
  backLink.onclick = () => {
  if (post.category === "사진첩") {
    window.location.href = "photos.html";
  } else if (post.category === "장터") {
    window.location.href = "market.html";
  } else {
    window.location.href = "boards.html";
  }
};

  // 글 표시
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-content").innerHTML = `
    ${post.image ? `<img src="${post.image}" class="full-image">` : ""}
    <p>${post.content.replace(/\n/g, "<br>")}</p>
  `;

  // 작성자 표시
  const meta = document.getElementById("post-meta");
  meta.innerHTML = `
    <div class="post-author">
      <div class="author-left">
        <a href="profile.html?uid=${post.userId}">
          <img src="${post.avatar ? post.avatar : 'images/익명.jpg'}" class="author-avatar" alt="작성자">
        </a>
        <span class="author-nickname">${post.nickname}</span>
        <button class="button small" onclick="openChat('${post.userId}', '${post.nickname}', '${post.avatar ? post.avatar : 'images/익명.jpg'}')">1:1 채팅</button>
      </div>
      <div class="post-date">${post.date || "날짜 없음"}</div>
    </div>
    <hr>
  `;

  if (post.category === "장터") {
    document.getElementById("post-price").innerHTML = `<span class="price-highlight"><strong>가격:</strong> ${post.price.toLocaleString()} 원</span>`;
  } else {
    document.getElementById("post-price").innerHTML = "";
  }

  // 댓글 표시
  const commentList = document.getElementById("comment-list");
  (post.comments || []).forEach((comment, i) => {
    const li = document.createElement("li");
    li.className = "comment-item";
    li.innerHTML = `
      <div class="comment-row">
        <a href="profile.html?uid=${comment.userId}">
          <img src="${comment.avatar ? comment.avatar : 'images/익명.jpg'}" class="comment-avatar" alt="작성자">
        </a>
        <span class="comment-nickname">${comment.nickname}</span>
        <span class="comment-text">${comment.text}</span>
        <button class="button small comment-delete" onclick="deleteComment(${i})">삭제</button>
      </div>
    `;
    commentList.appendChild(li);
  });


  // 글 삭제 버튼
  const deleteBtn = document.getElementById("delete-btn");
  deleteBtn.onclick = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || {};
    delete posts[id];
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("글이 삭제되었습니다.");

    // 카테고리별 이동
    if (post.category === "사진첩") {
      window.location.href = "photos.html";
    } else if (post.category === "장터") {
      window.location.href = "market.html";
    } else {
      window.location.href = "boards.html";
    }
  };
  document.querySelector(".post-box").appendChild(deleteBtn);
});

function addComment() {
  const input = document.getElementById("comment-input");
  const text = input.value.trim();
  if (!text) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("로그인이 필요합니다.");
    return;
  }

  const posts = JSON.parse(localStorage.getItem("posts") || "{}");
  const post = posts[id];

  const newComment = {
    text,
    nickname: currentUser.nickname,
    avatar: currentUser.avatar,
    userId: currentUser.id
  };

  post.comments = post.comments || [];
  post.comments.push(newComment);

  posts[id] = post;
  localStorage.setItem("posts", JSON.stringify(posts));
  setTimeout(() => location.reload(), 50);
}

function deleteComment(index) {
  const posts = JSON.parse(localStorage.getItem("posts"));
  const post = posts[id];

  post.comments.splice(index, 1);

  posts[id] = post;
  localStorage.setItem("posts", JSON.stringify(posts));
  setTimeout(() => location.reload(), 50);
}
window.deleteComment = deleteComment;

document.addEventListener("DOMContentLoaded", function () {
  const commentInput = document.getElementById("comment-input");
  if (commentInput) {
    commentInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); //줄바꿈못하게
        addComment(); // 댓글
      }
    });
  }
});

