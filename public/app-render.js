// --- Render avatar ---
function drawPart(partId, skin, overrides) {
  const part = lib.get(partId);
  if (!part) return;
  for (const layer of part.layers) {
    let color = "#000";
    if (layer.s === "skin") color = skin;
    else if (overrides && overrides[layer.s]) color = overrides[layer.s];
    else if (part.defaultColors[layer.s]) color = part.defaultColors[layer.s];
    const path = new Path2D(layer.d);
    ctx.fillStyle = color;
    ctx.fill(path);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke(path);
  }
}

function renderAvatar(cx, cy, scale, expressionId) {
  const e = exprMap.get(expressionId) || {};
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  const map = {
    hairBack: avatar.parts.hairBack, body: avatar.parts.body, bottom: avatar.parts.bottom,
    top: avatar.parts.top, head: avatar.parts.head, ears: avatar.parts.ears,
    eyes: e.eyes || avatar.parts.eyes, eyebrows: e.brows || avatar.parts.eyebrows,
    nose: avatar.parts.nose, mouth: e.mouth || avatar.parts.mouth,
    hairFront: avatar.parts.hairFront
  };
  for (const cat of ORDER) {
    if (cat==="glasses"||cat==="hat") continue;
    if (map[cat]) drawPart(map[cat], avatar.skinTone, avatar.colors);
  }
  drawPart(avatar.parts.shoes, avatar.skinTone, avatar.colors);
  for (const acc of avatar.parts.accessories) drawPart(acc, avatar.skinTone, avatar.colors);
  ctx.restore();
}

function drawBalloon(text, type, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.font = "bold 14px 'Comic Sans MS','Chalkboard SE',sans-serif";
  const tw = Math.max(ctx.measureText(text).width, 30);
  const bw = tw + 24, bh = 32, r = 10;
  ctx.beginPath();
  if (type === "shout") {
    const cx=bw/2, cy=bh/2, rx=bw/2+5, ry=bh/2+5;
    for (let i=0;i<14;i++){ const a=(i/14)*Math.PI*2, rad=i%2===0?1:0.72;
      const px=cx+Math.cos(a)*rx*rad, py=cy+Math.sin(a)*ry*rad;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py); }
    ctx.closePath();
  } else {
    ctx.moveTo(r,0); ctx.lineTo(bw-r,0); ctx.quadraticCurveTo(bw,0,bw,r);
    ctx.lineTo(bw,bh-r); ctx.quadraticCurveTo(bw,bh,bw-r,bh);
    ctx.lineTo(r,bh); ctx.quadraticCurveTo(0,bh,0,bh-r);
    ctx.lineTo(0,r); ctx.quadraticCurveTo(0,0,r,0); ctx.closePath();
  }
  ctx.fillStyle = type==="whisper"?"#F0F0F0":"#FFF";
  ctx.fill();
  ctx.strokeStyle="#1a1a1a"; ctx.lineWidth=type==="shout"?2.6:2.2; ctx.stroke();
  if (type!=="thought") {
    ctx.beginPath();
    ctx.moveTo(bw*0.3-6,bh-1); ctx.lineTo(bw*0.3-3,bh+16); ctx.lineTo(bw*0.3+7,bh-1);
    ctx.closePath(); ctx.fillStyle="#FFF"; ctx.fill(); ctx.stroke();
  } else {
    [[bw*0.28,bh+7,4.5],[bw*0.2,bh+18,3],[bw*0.14,bh+27,2]].forEach(([bx,by,br])=>{
      ctx.beginPath(); ctx.arc(bx,by,br,0,Math.PI*2); ctx.fillStyle="#FFF"; ctx.fill(); ctx.stroke();
    });
  }
  ctx.fillStyle="#1a1a1a"; ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(text, bw/2, bh/2);
  ctx.restore();
  return { w:bw, h:bh+20 };
}

function drawCharacter() {
  canvas.width = 400; canvas.height = 560;
  canvas.classList.remove("draggable");
  ctx.fillStyle = "#fafafa"; ctx.fillRect(0,0,canvas.width,canvas.height);
  const expression = document.getElementById("expression").value;
  renderAvatar(150, 40, 1.5, expression);
  status.textContent = avatar.name + " \u2022 " + avatar.gender;
}

function drawComic() {
  const panelW = 300, panelH = 340, gap = 14, pad = 16;
  const n = comic.panels.length;
  canvas.width = pad*2 + n*panelW + (n-1)*gap;
  canvas.height = panelH + pad*2;
  canvas.classList.add("draggable");
  ctx.fillStyle = "#e8eef5"; ctx.fillRect(0,0,canvas.width,canvas.height);
  comic.panels.forEach((panel, i) => {
    const x = pad + i*(panelW+gap), y = pad;
    ctx.fillStyle = "#fff"; ctx.fillRect(x, y, panelW, panelH);
    ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 4;
    ctx.strokeRect(x+2, y+2, panelW-4, panelH-4);
    const expr = panel.expr || document.getElementById("panelExpr").value;
    renderAvatar(x + 100, y + 30, 0.85, expr);
    panel.balloons.forEach((b) => { drawBalloon(b.text, b.type, x + b.x, y + b.y); });
    if (i === activePanel) {
      ctx.strokeStyle = "#e67e22"; ctx.lineWidth = 3;
      ctx.strokeRect(x-2, y-2, panelW+4, panelH+4);
    }
  });
  status.textContent = comic.title + " \u2022 " + n + " painel(is) \u2022 arraste bal\u00f5es";
  refreshPanelList();
}

function draw() {
  if (mode==="character") drawCharacter();
  else drawComic();
}

function apply() {
  const [hf,hb] = HAIR[document.getElementById("hairStyle").value];
  avatar.parts.hairFront = hf; avatar.parts.hairBack = hb;
  avatar.colors.hair = document.getElementById("hairColor").value;
  avatar.parts.top = TOP[document.getElementById("topStyle").value];
  avatar.colors.primary = document.getElementById("shirtColor").value;
  avatar.parts.bottom = BOT[document.getElementById("bottomStyle").value];
  avatar.name = document.getElementById("avName").value;
  avatar.parts.accessories = [];
  const g = document.getElementById("glasses").value;
  if (g==="round") avatar.parts.accessories.push("glasses_round_01");
  if (g==="rect") avatar.parts.accessories.push("glasses_rect_01");
  const h = document.getElementById("hat").value;
  if (h==="cap") avatar.parts.accessories.push("hat_cap_01");
  if (h==="beanie") avatar.parts.accessories.push("hat_beanie_01");
  draw();
}
