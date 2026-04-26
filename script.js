function openTool(name) {
    let box = document.getElementById("toolBox");
    let title = "", ui = "";
    if (name == "qr") {
        title = "QR Generator";
        ui = `<input id="qrtext" placeholder="Text or URL...">
              <button class="btn-main" onclick="qrgen()">Generate QR</button>
              <div id="qrArea" style="display:none; margin-top:10px;">
                   <img id="qrimg" style="width:150px; border: 2px solid cyan; border-radius:10px;">
                   <br><button class="btn-main" style="border-color:lime; color:lime;" onclick="downloadQR()">📥 Download QR</button>
              </div>`;
    } else if (name == "age") {
        title = "Age Calculator";
        ui = `<input type="date" id="dob">
              <button class="btn-main" onclick="calcAge()">🚀 Calculate Age</button>
              <div id="ageRes" style="color:lime; font-size:18px; margin-top:15px; font-weight:bold; line-height:1.5;"></div>`;
    } else if (name == "tiktok") {
        title = "TikTok Downloader";
        ui = `<input id="tkUrl" placeholder="লিঙ্ক দিন..."><button class="btn-main" onclick="tkDown()">🚀 Get Video</button><div id="tkRes"></div>`;
    } else if (name == "insta") {
        title = "Instagram Downloader";
        ui = `<input id="igUrl" placeholder="লিঙ্ক দিন..."><button class="btn-main" onclick="igDown()">🚀 Get Media</button><div id="igRes"></div>`;
    } else if (name == "yt") {
        title = "YouTube Thumbnail";
        ui = `<input id="ytUrl" placeholder="লিঙ্ক দিন..."><button class="btn-main" onclick="getYt()">🚀 Get Image</button><div id="ytRes" style="display:none; margin-top:10px;"><img id="thumbImg" style="width:100%; border-radius:10px; border:1px solid cyan;"><br><a id="thumbDl" target="_blank"><button class="btn-main">📥 Download</button></a></div>`;
    } else if (name == "tts") {
        title = "Text to Speech";
        ui = `<div class="inner-container"><textarea id="ttsText" placeholder="এখানে লিখুন..."></textarea></div><button class="btn-main" onclick="speakText()">🔊 Speak Now</button>`;
    } else if (name == "t2e") {
        title = "Stylish Name Maker";
        ui = `<input id="styleInput" placeholder="নাম লিখুন..." oninput="genStyles()"><div id="styleRes" style="margin-top:10px; max-height:150px; overflow-y:auto;"></div>`;
    } else if (name == "repeater") {
        title = "Text Repeater";
        ui = `<textarea id="repText" placeholder="লেখাটি লিখুন..."></textarea><input type="number" id="repNum" placeholder="কতবার?"><button class="btn-main" onclick="genRepeat()">🚀 Generate</button><textarea id="repRes" style="margin-top:10px; height:100px; display:none;" readonly></textarea><button class="btn-main" id="copyRepBtn" style="display:none; border-color:lime; color:lime;" onclick="copyRep()">📋 Copy All</button>`;
    } else if (name == "speed") {
        title = "Internet Speed";
        ui = `<iframe src="https://fast.com" style="width:100%; height:300px; border:1px solid cyan; border-radius:10px;"></iframe>`;
    } else if (name == "feedback") {
        title = "Report a Problem";
        ui = `<textarea id="feedText" placeholder="সমস্যাটি লিখুন..."></textarea><button class="btn-main" style="border-color:lime; color:lime;" onclick="alert('Sent to MRF!')">Submit Report</button>`;
    }

    box.innerHTML = `<div class="modal-overlay"><div class="card"><h2 style="margin-top:0;">${title}</h2>${ui}<div class="card-divider"></div><div style="font-size:14px; color:#888;">Developed by | <span class="mrf-badge">MRF</span><div style="font-size:10px; margin-top:5px;">ALL RIGHTS RESERVED © 2026</div></div><button class="close-btn" onclick="closeTool()">×</button></div></div>`;
}

function closeTool() { document.getElementById("toolBox").innerHTML = ""; }

// --- ১. QR Generator & Downloader (FIXED) ---
function qrgen() {
    let t = document.getElementById("qrtext").value;
    if(!t) return alert("কিছু লিখুন!");
    let qUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(t)}`;
    let img = document.getElementById("qrimg");
    img.src = qUrl;
    document.getElementById("qrArea").style.display = "block";
}

async function downloadQR() {
    let img = document.getElementById("qrimg");
    const response = await fetch(img.src);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MRF-QR-Code.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// --- ২. Age Calculator (Detailed) ---
function calcAge() {
    let dobValue = document.getElementById("dob").value;
    if(!dobValue) return alert("জন্ম তারিখ দিন!");
    let dob = new Date(dobValue);
    let now = new Date();
    
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    document.getElementById("ageRes").innerHTML = `${years} Years, ${months} Months, ${days} Days`;
}

// --- অন্য সব টুলস (TikTok, Insta, YT, TTS, Repeater) আগের মতো থাকবে ---
function genRepeat() {
    let t = document.getElementById("repText").value, n = document.getElementById("repNum").value;
    if(!t || !n) return alert("সব তথ্য দিন!");
    let res = ""; for(let i=0; i<n; i++) res += t + "\n";
    let box = document.getElementById("repRes"); box.value = res; box.style.display = "block";
    document.getElementById("copyRepBtn").style.display = "inline-block";
}
function copyRep() { let c = document.getElementById("repRes"); c.select(); document.execCommand("copy"); alert("Copied!"); }

async function tkDown() {
    let u = document.getElementById("tkUrl").value, r = document.getElementById("tkRes");
    if(!u) return alert("লিঙ্ক দিন!");
    r.innerHTML = "Searching...";
    try {
        const res = await fetch(`https://www.tikwm.com/api/?url=${u}`); const d = await res.json();
        r.innerHTML = `<video src="${d.data.play}" style="width:100%; border-radius:10px;" controls></video><br><a href="${d.data.play}" target="_blank"><button class="btn-main">📥 Download</button></a>`;
    } catch(e) { r.innerHTML = "Error!"; }
}

async function igDown() {
    let u = document.getElementById("igUrl").value, r = document.getElementById("igRes");
    if(!u) return alert("লিঙ্ক দিন!");
    r.innerHTML = "Searching...";
    try {
        const res = await fetch(`https://api.vkrtools.com/api/insta?url=${u}`); const d = await res.json();
        r.innerHTML = `<a href="${d.data[0].url}" target="_blank"><button class="btn-main" style="color:lime; border-color:lime;">📥 Download Now</button></a>`;
    } catch(e) { r.innerHTML = "Error!"; }
}

function genStyles() {
    const text = document.getElementById("styleInput").value; const res = document.getElementById("styleRes");
    if(!text) { res.innerHTML = ""; return; }
    const styles = [`꧁༺${text}༻꧂`, `亗 ${text} 亗`, `乂${text}乂`, `☠︎${text}︎☠︎`, `⚡${text}⚡` ];
    let html = '<div style="background:#111; padding:10px; border-radius:10px; text-align:left;">';
    styles.forEach(s => { html += `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #222;"><span style="color:cyan;">${s}</span><button style="background:none; border:1px solid lime; color:lime; border-radius:5px; cursor:pointer;" onclick="navigator.clipboard.writeText('${s}'); alert('Copied!')">Copy</button></div>`; });
    res.innerHTML = html + '</div>';
}

function getYt() {
    let url = document.getElementById("ytUrl").value, vId = url.split("v=")[1]?.substring(0, 11) || url.split("/").pop().substring(0, 11);
    document.getElementById("thumbImg").src = `https://img.youtube.com/vi/${vId}/hqdefault.jpg`;
    document.getElementById("thumbDl").href = `https://img.youtube.com/vi/${vId}/maxresdefault.jpg`;
    document.getElementById("ytRes").style.display = "block";
}

function speakText() { let t = document.getElementById("ttsText").value; window.speechSynthesis.speak(new SpeechSynthesisUtterance(t)); }