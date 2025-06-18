document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    const mypage = document.createElement("div");
    mypage.id = "mypage-link";
    mypage.style.position = "absolute";
    mypage.style.top = "20px";
    mypage.style.left = "20px";
    mypage.style.fontSize = "10px";
  
    const status = document.createElement("div");
    status.id = "login-status";
    status.style.position = "absolute";
    status.style.top = "20px";
    status.style.right = "20px";
    status.style.fontSize = "10px";
  
    const loginbtn = document.getElementById("loginbtn");
      if (loginbtn) {
        if (currentUser) {
          loginbtn.innerHTML = `
            <li><a href="mypage.html" class="button large fit">마이페이지</a></li>
            <li><button onclick="logout()" class="button large fit">로그아웃</button></li>
          `;
        } else {
          loginbtn.innerHTML = `
            <li><a href="login.html" class="button large fit">Log In</a></li>
          `;
        }
      }
    });
      
  function logout() {
    localStorage.removeItem("currentUser");
    alert("로그아웃 되었습니다.");
    location.reload();
  }
  