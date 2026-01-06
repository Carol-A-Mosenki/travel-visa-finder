// Full Mock Data for All Countries

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin",
  "Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
  "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo, Democratic Republic of the","Congo, Republic of the","Costa Rica","Côte d’Ivoire","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea",
  "Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
  "Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
  "Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger",
  "Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
  "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal",
  "Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];


// Generate Mock Visa Data

const visaData = [];
function generateMockVisa(passport, destination){
  if(passport===destination) return null;
  const visaTypes=["Standard Visa","Visa on Arrival","Visa Free","E-Visa"];
  const randomType = visaTypes[Math.floor(Math.random()*visaTypes.length)];
  let documents=[];
  if(randomType==="Standard Visa") documents=["Passport","Travel Insurance","Bank Statement","Flight Tickets"];
  if(randomType==="Visa on Arrival") documents=["Passport","Return Ticket","Proof of Funds"];
  if(randomType==="E-Visa") documents=["Passport","Travel Insurance","Visa Fee Payment"];
  const validity_days = randomType==="Visa Free"?90:Math.floor(Math.random()*90)+30;
  return {passport,destination,visa_type:randomType,validity_days,documents};
}
for(let p of countries){
  for(let d of countries){
    const info = generateMockVisa(p,d);
    if(info) visaData.push(info);
  }
}

// Elements

const passportInput=document.getElementById("passport");
const destinationInput=document.getElementById("destination");
const searchBtn=document.getElementById("search-btn");
const resultsDiv=document.getElementById("results");


// Helper

function getVisaClass(visaType){
  switch(visaType.toLowerCase()){
    case"e-visa": return"visa-evisa";
    case"visa on arrival": return"visa-voa";
    case"visa free": return"visa-visa-free";
    default: return"visa-standard";
  }
}


// Render Card

function renderCard(passport,destination,info){
  const card=document.createElement("div");
  card.className=`result-card ${getVisaClass(info.visa_type)}`;
  let docs="";
  if(info.documents && info.documents.length>0){
    docs=`<p><strong>Documents Required:</strong></p><ul>${info.documents.map(d=>`<li>${d}</li>`).join("")}</ul>`;
  }
  card.innerHTML=`
    <h3>${passport} → ${destination}</h3>
    <p><strong>Visa Required:</strong> ${info.visa_type!=="Visa Free"?"Yes":"No"}</p>
    <p><strong>Visa Type:</strong> ${info.visa_type}</p>
    <p><strong>Validity:</strong> ${info.validity_days} days</p>
    ${docs}
  `;
  resultsDiv.appendChild(card);
}


// Particle Effect

function triggerParticles(element){
  const numParticles=12;
  for(let i=0;i<numParticles;i++){
    const p=document.createElement("span");
    p.className="particle";
    element.appendChild(p);
    const size=Math.random()*6+4+"px";
    const colors=["#A8DADC","#F1A6C7","#FFF3B0","#C8FACC"];
    const color=colors[Math.floor(Math.random()*colors.length)];
    p.style.width=size; p.style.height=size; p.style.background=color;
    p.style.left="50%"; p.style.top="50%"; p.style.opacity=1;
    const angle=Math.random()*2*Math.PI;
    const dist=50+Math.random()*50;
    const dx=Math.cos(angle)*dist; const dy=Math.sin(angle)*dist;
    p.animate([{transform:"translate(0,0)",opacity:1},{transform:`translate(${dx}px,${dy}px)`,opacity:0}],{duration:600+Math.random()*300,easing:"ease-out",fill:"forwards"});
    setTimeout(()=>p.remove(),1000);
  }
}

// Search Logic

searchBtn.addEventListener("click",()=>{
  const passport=passportInput.value.trim();
  const destination=destinationInput.value.trim();
  if(!passport||!destination){alert("Please enter both passport and destination countries."); return;}
  resultsDiv.innerHTML="<p>Loading visa info...</p>";
  setTimeout(()=>{
    resultsDiv.innerHTML="";
    const info=visaData.find(v=>v.passport.toLowerCase()===passport.toLowerCase()&&v.destination.toLowerCase()===destination.toLowerCase());
    if(info){renderCard(passport,destination,info); triggerParticles(searchBtn);}
    else{const c=document.createElement("div");c.className="result-card visa-standard"; c.innerHTML="<p>No visa info found for this route.</p>"; resultsDiv.appendChild(c);}
  },300);
});

// Enter key support
passportInput.addEventListener("keydown",e=>{if(e.key==="Enter") searchBtn.click();});
destinationInput.addEventListener("keydown",e=>{if(e.key==="Enter") searchBtn.click();});

