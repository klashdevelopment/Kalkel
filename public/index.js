var score = document.querySelector("#score");
var rank = document.querySelector("#rank");
var addClick=(n)=>{score.textContent=(parseInt(score.textContent)+n);document.title=`Kalkel | ${score.textContent} clicks`};
var setClick=(n)=>{score.textContent=(n)};
var getClick=()=>{return parseInt(score.textContent)};
var getRank=()=>{return parseInt(rank.textContent)};

var costs = {
    2: 50,
    3: 100,
    4: 500,
    5: 1000,
    6: 5000,
    7: 7000,
    8: 9000,
    9: 10000
}

function Boot() {
    var ibtf = (property, value) => {if(window.localStorage[property] == null || window.localStorage[property] == undefined) {window.localStorage[property] = value;}};
    ibtf('boost', 1);
    ibtf('perks', "[]");
    ibtf('clicks', 0);
    ibtf('name', "Billy");
    ibtf('cost_math_teacher', 1200);
    ibtf('cost_rice_farmer', 2000);

    for(var PERK of JSON.parse(window.localStorage.perks)) {
        var amountel = document.querySelector('#'+PERK.id+"_amount");
        amountel.textContent = parseInt(amountel.textContent)+1;
        setInterval(()=>{
            addClick(PERK.value);
        }, PERK.delay);
    }

    rank.textContent = (window.localStorage.boost == null ? 0 : window.localStorage.boost);
    setClick(window.localStorage.clicks == null ? 0 : window.localStorage.clicks);
    document.querySelector(".edit").textContent = window.localStorage.name;
    document.querySelector('#rup').textContent = `Purchase Boost Upgrade (${costs[(parseInt(rank.textContent)+1)]})`;
}
Boot();
document.querySelectorAll('.purchase_btn').forEach((btn) => {
    btn.addEventListener('click', ()=>{
        var DP = JSON.parse(btn.dataset.perk);
        if(window.localStorage[DP.lpsn] == null || window.localStorage[DP.lpsn] == undefined) {
            window.localStorage[DP.lpsn] = DP.defaultCost;
        }
        if(getClick() >= window.localStorage[DP.lpsn]) {
            alert("Purchased!");
            var PERK = DP;
            var amountel = document.querySelector('#'+PERK.id+"_amount");
            amountel.textContent = parseInt(amountel.textContent)+1;
            setInterval(()=>{
                addClick(PERK.value);
            }, PERK.delay);
            var it = JSON.parse(window.localStorage['perks']);
            it.push(PERK);
            window.localStorage['perks'] = JSON.stringify(it);
            addClick(-window.localStorage[PERK.lpsn]);
            window.localStorage[PERK.lpsn] = (parseInt(window.localStorage[PERK.lpsn])+parseInt(PERK.increment));
            Save();
        }else {
            alert("Not enough! You need " + (""+(window.localStorage[DP.lpsn]-getClick())+"") + " more clicks.");
        }
    });
});
function Save() {
    window.localStorage.boost = rank.textContent;
    window.localStorage.clicks = score.textContent;
    window.localStorage.name = document.querySelector(".edit").textContent;
}
setInterval(Save, 500);

function boostUp() {
    var nextRank = (parseInt(rank.textContent)+1);
    var needed = costs[nextRank];
    if(getClick() > (needed-1)){
        alert("Boosted up 1 time! Clicks cleared.");
        setClick(0);
        rank.textContent=nextRank;
        document.querySelector('#rup').textContent = `Purchase Boost Upgrade (${costs[(parseInt(rank.textContent)+1)]})`;
    }else {
        alert("You must be at "+needed+" clicks to boost up.")
    }
}
document.querySelector('#rup').addEventListener('click', boostUp);

document.querySelector('#balls').addEventListener('click', ()=>{
    addClick(getRank());
})

window.addEventListener('keydown', (e)=>{
    if(e.keyCode == 13) {
        if(e.repeat) return;
        addClick(getRank());
    }
    if(e.key == "X") {
        if(e.shiftKey && e.ctrlKey) {
            var code = prompt("Debug console: enter prompt", "ADD 1");
            var args = code.split(" ");
            var command = args.shift();
            switch(command) {
                case "ADD":
                    addClick(parseInt(args[0]));
                break;
                case "KILL":
                    addClick(-parseInt(args[0]));
                break;
                case "BOOST":
                    rank.textContent = (parseInt(args[0]));
                break;
                default:
                    alert("INVALID! Some basic debugs are: BOOST x, ADD x, KILL x, BOOST x.")
                    break;
            }
        }
    }
});