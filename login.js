function login() {
    const id = document.getElementById("login-id").value.trim();
    const pw = document.getElementById("login-pw").value.trim();
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const found = users.find(u => u.id === id && u.pw === pw);
  
    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      alert("로그인 성공!");
      window.location.href = "index.html"; // 로그인 후 메인 이동
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    const loginIdInput = document.getElementById("login-id");
    const loginPwInput = document.getElementById("login-pw");

    [loginIdInput, loginPwInput].forEach((input) => {
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          login();
        }
      });
    });
  });
