// 지역별.추가조사필요
const ghostSpots = {
  "KR-41": ["곤지암 정신병원", "가평 명지산"],
  "KR-43": ["늘봄갈비"],
  "KR-11": ["서울 한강변 귀신", "자유로"],
  "KR-28": ["아라뱃길"],
  "KR-47": ["영덕 흉가"],
  "KR-49": ["속사IC"],
  "KR-49": ["성산일출봉 절벽"]
};


document.addEventListener("DOMContentLoaded", function () {
  const regions = document.querySelectorAll(".land");
  const infoBox = document.getElementById("info-box");

  regions.forEach(region => {
    region.addEventListener("click", () => {
      const id = region.id;
      const name = region.getAttribute("title") || "알 수 없는 지역";
      const spots = ghostSpots[id] || ["(아직 등록된 스팟이 없습니다😢)"];

      infoBox.innerHTML = `
        <h2>${name}</h2>
        <ul>
          ${spots.map(s => `<li> ${s}</li>`).join("")}
        </ul>
      `;
    });
  });
});