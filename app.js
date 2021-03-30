const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c"; // 공통 사항이 있으면 변수로 묶어서 중복 기재 피하기~

//css와 동일한 사이즈로 js canvas도 설정할 것
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// 첫 디폴트 stroke 색상 및 사이즈 설정
ctx.fillStyle = "#fff"; 
ctx.fillRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
// 첫 디폴트 fill 값을 화이트로 해야 이미지로 저장할때 배경이 transparent가 되지 않는다
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // !painting은 painting===false 와 동일 의미
        ctx.beginPath();
        ctx.moveTo(x, y); 
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

//CSS색상 뽑아내서 stroke 색상으로 입히기
function handleColorClick(event){
    const color = event.target.style.backgroundColor; // color를 css bgcolor에서 뽑아내기
    console.log (color);
    ctx.strokeStyle = color; // storke스타일은 color색상으로 변경
    ctx.fillStyle = ctx.strokeStyle; // 글자색과 채우기 색이 같도록 설정 (채우기 색은 이미 설정해늏았으니까 우려먹기)
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"; // false일 경우 기본값이니까 true 발동해주도록 fill 글자 삽입
    } else {
        filling = true;
        mode.innerText = "Paint"; //true일 경우 기본 값 버튼인 paint가 되도록 설정
    }
}

/*filling 색이 유지되면서, paint가 가능해져야된다. 다음 filling에서만 색 변경이 가능해야된다*/
function handleCanvasClick(){
    if(filling){//filling 상태이면
        ctx.fillRect(0,0,canvas.offsetWidth, canvas.offsetHeight)
    } // else일때 다른 액션 안했으면 하니까 else는 사용하지 않는다 =  filling 상태일때만 색이 변경되면 되니까 filling 에서만 반응하면 되게 만들기
}

function handleCM(event){
    event.preventDefault(); // 우클릭 시 메뉴 바 안내려오게 설정하는 방법 - canvas에 eventlistener도 만들어야됨~~
}

//이미지 저장하기
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image; // 이미지의 링크는 여기다 달아주기
    link.download = "Paint_JS[EXPORT]✨"; // download는 anchor의 attribute -> url을 타고 넘어가는게 아니라 url을 다운로드 받게 해주는 것
    //다운로드 시 파일 이름을 여기다 적어주기!
    link.click();//handleSaveClick누르면 link클릭한것과 같은 효과 주는 법
    console.log(link);
}


if (canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

//클릭할 때마다 handleColorClick발동시켜 색상 뽑아내게 하기
Array.from(colors).forEach(
    color => color.addEventListener("click", handleColorClick)
    ) // 여기서 color은 임의로 만든 단여서 potato로 해도 무방함. array 내 아이템을 각각 지칭하는 단어로서만 사용

if (range){
    range.addEventListener("input", handleRangeChange)
}

if (mode){
    mode.addEventListener("click", handleModeClick)
}

if (save){
    save.addEventListener("click", handleSaveClick)
}