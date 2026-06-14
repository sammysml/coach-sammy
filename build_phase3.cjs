const fs = require('fs');
const NM = './node_modules/react-native-body-highlighter/dist';
const front = require(NM + '/assets/bodyFront').bodyFront;
const back  = require(NM + '/assets/bodyBack').bodyBack;
const wrapper = fs.readFileSync(NM + '/components/SvgMaleWrapper.js','utf8');
const fm = wrapper.match(/side === "front".*?stroke=\{border\}[^>]+d="([^"]+)"/s);
const bm = wrapper.match(/side === "back".*?stroke=\{border\}[^>]+d="([^"]+)"/s);
if(!fm||!bm){console.error('❌ outline extraction failed');process.exit(1);}
const RENDERER =
'window.renderMuscleSvg = function(groups,opts){\n' +
'  opts=opts||{};var side=opts.side||"both";var maxH=opts.maxHeight||"380px";var showL=opts.showLabels!==false;\n' +
'  var SKIP=["head","hair","neck","hands","feet","ankles","knees"];\n' +
'  function rSide(w){\n' +
'    var vb=w==="front"?"0 0 724 1448":"724 0 724 1448";\n' +
'    var ol=w==="front"?BODY_FRONT_OUTLINE:BODY_BACK_OUTLINE;\n' +
'    var ms=BODY_DATA[w]||[];var gId=w==="front"?"msGoldGradient":"msGoldGradientBack";\n' +
'    var aC=w==="front"?"ms-active":"ms-active ms-active-back";\n' +
'    var ph="";\n' +
'    ms.forEach(function(m){\n' +
'      if(SKIP.indexOf(m.slug)!==-1)return;\n' +
'      var ia=groups&&groups.indexOf(m.slug)!==-1;\n' +
'      var cl="ms-muscle"+(ia?" "+aC:"");\n' +
'      var si=m.path||{};\n' +
'      ["left","right"].forEach(function(s){(si[s]||[]).forEach(function(p){ph+=\'<path class="\'+cl+\'" data-muscle="\'+m.slug+\'" d="\'+p+\'"/>\';});});\n' +
'    });\n' +
'    var lb=w==="front"?"Vue avant":"Vue arrière";\n' +
'    return \'<div class="ms-view"><svg class="ms-svg" viewBox="\'+vb+\'" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="max-height:\'+maxH+\'">\'+\n' +
'      \'<defs><linearGradient id="\'+gId+\'" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e0bc5c"/><stop offset="50%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#a8893a"/></linearGradient></defs>\'+\n' +
'      \'<path class="ms-outline" d="\'+ol+\'"/><g>\'+ph+\'</g></svg>\'+\n' +
'      (showL?\'<div class="ms-view-label">\'+lb+"</div>":"")+\'</div>\';\n' +
'  }\n' +
'  if(side==="front")return \'<div class="ms-wrap" style="grid-template-columns:1fr;max-width:280px">\'+rSide("front")+"</div>";\n' +
'  if(side==="back")return \'<div class="ms-wrap" style="grid-template-columns:1fr;max-width:280px">\'+rSide("back")+"</div>";\n' +
'  return \'<div class="ms-wrap">\'+rSide("front")+rSide("back")+"</div>";\n' +
'};\n' +
'window.MUSCLE_LABELS_FR={chest:"Pectoraux",deltoids:"Deltoïdes",biceps:"Biceps",triceps:"Triceps",\n' +
'  forearm:"Avant-bras",abs:"Abdos",obliques:"Obliques",trapezius:"Trapèzes",\n' +
'  "upper-back":"Haut du dos","lower-back":"Bas du dos",\n' +
'  quadriceps:"Quadriceps",hamstring:"Ischios",gluteal:"Fessiers",\n' +
'  calves:"Mollets",tibialis:"Tibialis",adductors:"Adducteurs"};\n';
const out=
  '// PHASE 3 — MUSCLE SILHOUETTE RENDERER\n'+
  'const BODY_FRONT_OUTLINE='+JSON.stringify(fm[1])+';\n'+
  'const BODY_BACK_OUTLINE='+JSON.stringify(bm[1])+';\n'+
  'const BODY_DATA='+JSON.stringify({front:front,back:back})+';\n'+
  RENDERER;
fs.writeFileSync('phase3_inject.js',out);
console.log('✓ phase3_inject.js:',out.length,'bytes');
