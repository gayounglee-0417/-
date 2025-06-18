function signup() {
    const id = document.getElementById("signup-id").value.trim();
    const pw = document.getElementById("signup-pw").value.trim();
    const nickname = document.getElementById("signup-nic").value.trim();
  
    if (!id || !pw || !nickname) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.id === id);
  
    if (exists) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }
  
    users.push({ id, pw, nickname });
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("회원가입 성공! 로그인 해주세요.");
    window.location.href = "login.html";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const signupIdInput = document.getElementById("signup-id");
    const signupPwInput = document.getElementById("signup-pw");
    const signupNicInput = document.getElementById("signup-nickname");

    [signupIdInput, signupPwInput, signupNicInput].forEach((input) => {
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          signup(); //엔터쳐도됨
        }
      });
    });
  });