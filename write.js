function submitPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const imageInput = document.getElementById("image");
  const category = document.getElementById("category")?.value || "게시판";
  const priceInput = document.getElementById("price");
  const price = priceInput ? parseInt(priceInput.value.trim(), 10) || 0 : 0;

  if (!title || !content) {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("로그인이 필요합니다.");
    window.location.href = "login.html";
    return;
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || {};
  const newId = Date.now();
  const reader = new FileReader();
  reader.onload = function () {
    const post = {
      title: title || "",
      content: content || "",
      category,
      image: reader.result,
      price: category === "장터" ? price : undefined,
      comments: [],
      userId: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      date: new Date().toISOString().slice(0, 10), // 작성일
      views: 0    
    };

    posts[newId] = post;
    localStorage.setItem("posts", JSON.stringify(posts));

    // 카테고리에 따라 이동
    if (category === "사진첩") {
      window.location.href = `photos.html`;
    } else if (category === "장터") {
      window.location.href = 'market.html';
    } else {
      window.location.href = `board.html?id=${newId}`;
    }
  };

  // 이미지 업로드가 있을 경우
  if (category === "사진첩" && imageInput?.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload(); // 강제 실행
  }
}
