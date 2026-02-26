const body=document.documentElement;
const stakeEl=document.getElementById('stake');
const oddsEl=document.getElementById('odds');
const percentSelect=document.getElementById('profitPercent');
const slider=document.getElementById('percentSlider');
const presets=document.querySelectorAll('.preset-btn');

const cashoutText=document.getElementById('cashoutText');
const liveOddsText=document.getElementById('liveOddsText');
const breakdown=document.getElementById('breakdown');
const timeStamp=document.getElementById('timeStamp');
const themeMode = document.getElementById('themeToggle')

function setPercent(p){
    percentSelect.value=p.toFixed(2);
    slider.value=p*100;
    presets.forEach(b=>b.classList.toggle('active',Number(b.dataset.p)===p));
}

function compute(stake,odds,p){
    const cashout=stake+stake*p;
    const liveOdds=(stake*odds)/cashout;
    return{cashout,liveOdds};
}

document.getElementById('calcBtn').onclick=()=>{
    const stake=+stakeEl.value;
    const odds=+oddsEl.value;
    const p=+percentSelect.value;
    if(stake<=0||odds<=1)return alert('Invalid input');
    const r=compute(stake,odds,p);
    cashoutText.textContent=`Cashout needed (${p*100}%): ${r.cashout.toFixed(2)}`;
    liveOddsText.textContent=`Required live odds: ${r.liveOdds.toFixed(3)}`;
    breakdown.textContent=`Stake: ${stake} · Odds: ${odds} · Profit: ${p*100}%`;
    timeStamp.textContent=new Date().toLocaleString();
};

document.getElementById('resetBtn').onclick=()=>{
    stakeEl.value='';
    oddsEl.value='';
    setPercent(0.5);
    cashoutText.textContent='Cashout needed: —';
    liveOddsText.textContent='Required live odds: —';
    breakdown.textContent='Stake: — · Odds: — · Profit%: —';
    timeStamp.textContent='';
};

percentSelect.onchange=()=>setPercent(+percentSelect.value);
slider.oninput=()=>setPercent(slider.value/100);
presets.forEach(b=>b.onclick=()=>setPercent(+b.dataset.p));

setPercent(0.5);