document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("market-list");
    const posts = JSON.parse(localStorage.getItem("posts")) || {};

    const marketPosts = Object.entries(posts)
        .filter(([, post]) => post.category === "장터")
        .sort((a, b) => b[0] - a[0]);

    let index = 1;
    for (const [id, post] of marketPosts) {
        const tr = document.createElement("tr");

        // 제목 (클릭 가능)
        const tdTitle = document.createElement("td");
        const a = document.createElement("a");
        a.href = `board.html?id=${id}`;
        a.textContent = post.title;
        tdTitle.appendChild(a);

        // 글쓴이
        const tdAuthor = document.createElement("td");
        tdAuthor.textContent = post.nickname || "익명";

        // 작성일일
        const tdDate = document.createElement("td");
        tdDate.textContent = post.date || "날짜 없음";

        // 조회수
        const tdViews = document.createElement("td");
        tdViews.textContent = post.views !== undefined ? post.views : 0;

        // 각 td를 tr에 추가
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdDate);
        tr.appendChild(tdViews);

        // tr을 tbody에 추가
        list.appendChild(tr);
    }
});