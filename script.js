let user = "";
let score = 0;

function login(){
    user = document.getElementById("name").value;
    if(!user) return alert("Enter name");

    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("username").innerText = user;

    loadBoard();
}

function generate(){
    let chapter = document.getElementById("chapter").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;

    let q = [];

    if(type==="MCQ"){
        q = [
            `What is ${chapter}?`,
            `Choose correct statement of ${chapter}`,
            `Application of ${chapter}?`
        ];
    }
    else if(type==="Short"){
        q = [
            `Define ${chapter}`,
            `Write short note on ${chapter}`
        ];
    }
    else{
        q = [
            `Explain ${chapter} in detail`,
            `Derive concepts of ${chapter}`
        ];
    }

    let output = `<h3>${chapter} (${difficulty})</h3>`;

    q.forEach((item,i)=>{
        output += `<p>${i+1}. ${item}</p>`;
    });

    document.getElementById("paper").innerHTML = output;

    score = difficulty==="Hard"?30:difficulty==="Medium"?20:10;
}

function submitTest(){
    let data = JSON.parse(localStorage.getItem("board")) || [];

    data.push({name:user,score:score});
    localStorage.setItem("board", JSON.stringify(data));

    loadBoard();
}

function loadBoard(){
    let data = JSON.parse(localStorage.getItem("board")) || [];

    data.sort((a,b)=>b.score-a.score);

    let html = "";
    data.forEach(d=>{
        html += `<li>${d.name} - ${d.score}</li>`;
    });

    document.getElementById("board").innerHTML = html;
}
