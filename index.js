const services = [
  { id:'nat', name:'National Emergency Number', en:'National Emergency', number:'999', category:'All', icon:'🚨'},
  { id:'pol', name:'Police Helpline Number', en:'Police', number:'999', category:'Police', icon:'👮' },
  { id:'fire', name:'Fire Service Number', en:'Fire Service', number:'999', category:'Fire', icon:'🚒' },
  { id:'amb', name:'Ambulance Service', en:'Ambulance', number:'1994-999999', category:'Health', icon:'🚑' },
  { id:'wcc', name:'Women & Child Helpline', en:'Women & Child Helpline', number:'109', category:'Help', icon:'🚨' },
  { id:'acc', name:'Anti-Corruption Helpline', en:'Anti-Corruption', number:'106', category:'Govt.', icon:'🚨' },
  { id:'elec', name:'Electricity Helpline', en:'Electricity Outage', number:'16216', category:'Electricity', icon:'🚨' },
  { id:'brac', name:'Brac Helpline', en:'Brac', number:'16445', category:'NGO', icon:'🚨' },
  { id:'rail', name:'Bangladesh Railway Helpline', en:'Bangladesh Railway', number:'163', category:'Travel', icon:'🚨' },
];

let hearts = 0, coins = 100, copies = 0;
const likedSet = new Set();
const history = [];



const el = (sel)=>document.querySelector(sel);
const formatTime = ()=> new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

function updateBadges(){
  el('#heartCount').textContent = hearts;
  el('#coinCount').textContent = coins;
  el('#copyCount').textContent = copies;
}

function addHistory({name, number}){
  history.push({name, number, time:formatTime()});
  renderHistory();
}

function renderHistory(){
  const wrap = el('#historyList');
  wrap.innerHTML = '';
  if(history.length === 0){
    wrap.innerHTML = '<div class="empty" id="historyEmpty">No calls yet.</div>';
    return;
  }
  history.slice().reverse().forEach(item=>{
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML =` <div><div class="name">${item.name}</div><div class="sub">${item.number}</div></div><div class="sub">${item.time}</div>;`
    wrap.appendChild(row);
  });
}

function copyToClipboard(text){
  navigator.clipboard.writeText(text).then(()=>{
    copies++;
    updateBadges();
    alert('Copied: ' + text);
  }).catch(()=>{
    window.prompt("Copy number:", text);
    copies++;
    updateBadges();
  });
}

function renderCards(){
  const grid = el('#cards');
  services.forEach(s=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      
      <div class="icon">${s.icon}</div>
      <div class="badge-top"><button class="heart-btn">♡</button></div>
      
      <div class="head">
        
        <div class="names"><div class="bn">${s.name}</div><div class="en">${s.en}</div></div>
      </div>
      <div class="number">${s.number}</div>
      <div class="chip">${s.category}</div>
      <div class="btn-row">
        <button class="btn copy">🗐 Copy</button>
        <button class="btn call">📞 Call</button>
      </div>`;
    grid.appendChild(card);

  
    card.querySelector('.heart-btn').addEventListener('click', e=>{
      if(!likedSet.has(s.id)){
        likedSet.add(s.id);
        hearts++;
        e.target.classList.add('liked');
        updateBadges();
      }
    });

  
    card.querySelector('.btn.copy').addEventListener('click', ()=>copyToClipboard(s.number));

    card.querySelector('.btn.call').addEventListener('click', ()=>{
      if(coins < 20){
        alert('Not enough coins. Need 20 coins.');
        return;
      }
      alert(`Calling ${s.en}: ${s.number}`);
      coins -= 20;
      updateBadges();
      addHistory({name:s.en, number:s.number});
    });
  });
}


el('#clearHistoryBtn').addEventListener('click', ()=>{
  history.length = 0;
  renderHistory();
});


renderCards();
updateBadges();
renderHistory();