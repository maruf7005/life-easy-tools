function openTool(name) {
    let box = document.getElementById("toolBox");
    let content = "";

    if (name == "tts") {
        content = `<h2>Text to Speech</h2><div class="inner-container"><textarea id="ttsText" placeholder="এখানে কিছু লিখুন..."></textarea></div><button class="btn-main" onclick="speakText()">🔊 Speak Now</button>`;
    }
    else if (name == "age") {
        content = `<h2>Age Calculator</h2><div class="inner-container"><input type="date" id="dob"></div><button class="btn-main" onclick="calcAge()">🚀 Calculate</button><div id="ageRes" style="margin-top:10px; color:lime;"></div>`;
    }
    else if (name == "speed") {
        content = `<h2>Speed Test</h2><div class="inner-container"><iframe src="https://fast.com" class="speed-frame"></iframe></div>`;
    }
    else if (name == "tiktok") {
        content = `<h2>TikTok Saver</h2><div class="inner-container"><input id="tkUrl" placeholder="Paste Link"></div><button class="btn-main" onclick="tkDown()">🚀 Download</button><div id="tkRes"></div>`;
    }
    else if (name == "insta") {
        content = `<h2>Insta Saver</h2><div class="inner-container"><input id="insUrl" placeholder="Paste Link"></div><button class="btn-main" onclick="insDown()">🚀 Get Media</button><div id="insRes"></div>`;
    }
    else if (name == "compress") {
        content = `<h2>Compressor</h2><div class="inner-container"><input type="file" id="imgUp" accept="image/*"></div><button class="btn-main" onclick="compressImg()">🚀 Compress</button><div id="compRes"></div><canvas id="canvas"></canvas>`;
    }
    else if (name == "qr") {
        content = `<h2>QR Generator</h2><div class="inner-container"><input id="qrtext" placeholder="Text or URL"></div><button class="btn-main" onclick="qrgen()">Generate</button><br><img id="qrimg">`;
    }
    else if (name == "thumb") {
        content = `<h2>YT Thumbnail</h2><div class="inner-container"><input id="yturl" placeholder="YouTube Link"></div><button class="btn-main" onclick="ytThumb()">Get Image</button><br><img id="ytimg" style="display:none;">`;
    }
    else {
        content = `<h2>Feedback</h2><div class="inner-container"><textarea placeholder="Report problem..."></textarea></div><button class="btn-main" onclick="alert('Sent!')">Submit</button>`;
    }

    box.innerHTML = `
        <div class="modal-overlay">
            <div class="card">
                ${content}
                <div class="footer-credit">
                    <span>Developed by</span>
                    <span style="color:cyan; margin: 0 5px;">|</span>
                    <span class="dev-badge">MRF</span>
                </div>
                <div class="secure-msg">Fast & Secure | All Rights Reserved © 2026</div>
                <button class="close-btn" onclick="closeTool()">×</button>
            </div>
        </div>`;
}

function closeTool() { document.getElementById("toolBox").innerHTML = ""; }

// Tool Logic Functions
function speakText() {
    let t = document.getElementById("ttsText").value;
    if(!t) return alert("Write something!");
    let s = new SpeechSynthesisUtterance(t);
    window.speechSynthesis.speak(s);
}

function calcAge() {
    let d = document.getElementById("dob").value;
    if(!d) return alert("Select Date!");
    let y = new Date().getFullYear() - new Date(d).getFullYear();
    document.getElementById("ageRes").innerHTML = "Your Age: " + y + " Years";
}

async function tkDown() {
    let u = document.getElementById("tkUrl").value;
    let r = document.getElementById("tkRes");
    if(!u) return alert("Link!");
    r.innerHTML = "Processing...";
    try {
        const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(u)}`);
        const data = await res.json();
        r.innerHTML = `<a href="${data.data.play}" target="_blank"><button class="btn-main">📥 Download</button></a>`;
    } catch(e) { r.innerHTML = "Error!"; }
}

async function insDown() {
    let u = document.getElementById("insUrl").value;
    let r = document.getElementById("insRes");
    if(!u) return alert("Link!");
    r.innerHTML = "Fetching...";
    try {
        const res = await fetch(`https://api.vkrdown.com/insta/render.php?url=${encodeURIComponent(u)}`);
        const data = await res.json();
        r.innerHTML = `<a href="${data.url}" target="_blank"><button class="btn-main">📥 Download</button></a>`;
    } catch(e) { r.innerHTML = "Error!"; }
}

function compressImg() {
    let f = document.getElementById("imgUp").files[0];
    if(!f) return alert("Select file!");
    let rd = new FileReader();
    rd.readAsDataURL(f);
    rd.onload = function(e) {
        let img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            let cv = document.getElementById("canvas");
            let ctx = cv.getContext("2d");
            cv.width = img.width / 2; cv.height = img.height / 2;
            ctx.drawImage(img, 0, 0, cv.width, cv.height);
            document.getElementById("compRes").innerHTML = `<a href="${cv.toDataURL("image/jpeg", 0.6)}" download="mrf_compressed.jpg"><button class="btn-main">📥 Download</button></a>`;
        }
    }
}

function qrgen() {
    let t = document.getElementById("qrtext").value;
    document.getElementById("qrimg").src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(t)}`;
}

function ytThumb() {
    let u = document.getElementById("yturl").value;
    let id = u.includes("v=") ? u.split("v=")[1].split("&")[0] : u.split("youtu.be/")[1];
    let i = document.getElementById("ytimg");
    i.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    i.style.display = "inline-block";
}