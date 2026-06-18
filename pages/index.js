import { useEffect } from 'react';

const CSS = `:root{
    --night:#0e1326;        /* 夜空 */
    --night-2:#151c36;      /* パネル */
    --surface:#1c2444;      /* カード */
    --line:#2c3766;
    --kumokai:#6aa6ff;      /* 雲海ブルー（主役） */
    --kumokai-soft:#9cc3ff;
    --lantern:#e7b15c;      /* 灯篭の灯り＝完了 */
    --text:#eef2ff;
    --muted:#9aa6cf;
    --danger:#ff8a8a;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--night);color:var(--text);
    font-family:"Hiragino Kaku Gothic ProN","Hiragino Sans","Noto Sans JP",system-ui,sans-serif;
    -webkit-font-smoothing:antialiased}
  body{padding-bottom:96px}
  .wrap{max-width:560px;margin:0 auto;padding:0 16px}

  /* ヘッダー */
  header{background:
      radial-gradient(120% 90% at 50% -20%, rgba(106,166,255,.28), transparent 60%),
      var(--night-2);
    border-bottom:1px solid var(--line);padding:22px 0 18px}
  .eyebrow{color:var(--kumokai-soft);font-size:12px;letter-spacing:.18em;font-weight:700}
  h1{font-size:21px;font-weight:800;margin-top:4px;letter-spacing:.01em}
  .sub{color:var(--muted);font-size:12.5px;margin-top:6px}
  .namebox{margin-top:14px;display:flex;align-items:center;gap:10px}
  .namebox label{font-size:13px;color:var(--muted);white-space:nowrap}
  .namebox input{flex:1;background:var(--night);border:1px solid var(--line);
    color:var(--text);border-radius:10px;padding:11px 12px;font-size:15px}
  .namebox input:focus{outline:none;border-color:var(--kumokai)}

  /* タブ */
  .tabs{display:flex;gap:8px;overflow-x:auto;padding:14px 16px;max-width:560px;margin:0 auto;
    -webkit-overflow-scrolling:touch}
  .tab{flex:0 0 auto;background:var(--surface);border:1px solid var(--line);color:var(--muted);
    padding:9px 15px;border-radius:999px;font-size:13.5px;font-weight:700;cursor:pointer;
    transition:.18s}
  .tab.active{background:var(--kumokai);color:#08122b;border-color:var(--kumokai)}
  .tab .cnt{font-size:11px;opacity:.8;margin-left:5px}

  /* 進捗（ステーションごと） */
  .stationhead{display:flex;justify-content:space-between;align-items:baseline;margin:6px 2px 12px}
  .stationhead .t{font-size:16px;font-weight:800}
  .stationhead .p{font-size:12.5px;color:var(--muted)}
  .bar{height:7px;background:var(--surface);border-radius:99px;overflow:hidden;margin:0 2px 18px}
  .bar > i{display:block;height:100%;width:0;border-radius:99px;
    background:linear-gradient(90deg,var(--kumokai),var(--kumokai-soft));transition:width .35s ease}

  /* 時間ブロック */
  .block{background:var(--night-2);border:1px solid var(--line);border-radius:16px;
    padding:6px 6px 10px;margin-bottom:14px}
  .blocktime{display:flex;align-items:center;gap:9px;padding:11px 12px 8px}
  .blocktime .dot{width:8px;height:8px;border-radius:50%;background:var(--kumokai);flex:0 0 auto;
    box-shadow:0 0 0 4px rgba(106,166,255,.16)}
  .blocktime .time{font-size:14px;font-weight:800;letter-spacing:.02em}
  .blocktime .note{font-size:12px;color:var(--muted)}

  /* 項目 */
  .item{display:flex;gap:12px;align-items:flex-start;padding:11px 12px;border-radius:11px;
    cursor:pointer;-webkit-tap-highlight-color:transparent}
  .item:active{background:var(--surface)}
  .check{flex:0 0 auto;width:24px;height:24px;border:2px solid var(--line);border-radius:7px;
    margin-top:1px;display:grid;place-items:center;transition:.15s}
  .check svg{width:14px;height:14px;opacity:0;transform:scale(.5);transition:.15s}
  .item.done .check{background:var(--lantern);border-color:var(--lantern)}
  .item.done .check svg{opacity:1;transform:scale(1)}
  .label{font-size:14.5px;line-height:1.5;padding-top:1px}
  .item.done .label{color:var(--muted);text-decoration:line-through;text-decoration-color:var(--line)}

  /* フッター */
  .footer{position:fixed;left:0;right:0;bottom:0;background:rgba(14,19,38,.92);
    backdrop-filter:blur(8px);border-top:1px solid var(--line);padding:12px 16px}
  .footer .inner{max-width:560px;margin:0 auto;display:flex;align-items:center;gap:14px}
  .footer .meta{font-size:12.5px;color:var(--muted);flex:1}
  .footer .meta b{color:var(--text);font-weight:800}
  .submit{background:var(--kumokai);color:#08122b;border:none;font-weight:800;font-size:15px;
    padding:13px 22px;border-radius:12px;cursor:pointer;white-space:nowrap}
  .submit:disabled{opacity:.45;cursor:not-allowed}

  /* 結果 */
  .overlay{position:fixed;inset:0;background:rgba(6,9,20,.72);display:none;
    align-items:flex-end;justify-content:center;z-index:20}
  .overlay.show{display:flex}
  .modal{background:var(--night-2);border:1px solid var(--line);border-radius:18px 18px 0 0;
    width:100%;max-width:560px;max-height:82vh;overflow:auto;padding:20px 18px 26px}
  .modal h2{font-size:17px;margin-bottom:4px}
  .modal .when{color:var(--muted);font-size:12.5px;margin-bottom:14px}
  .summary{background:var(--night);border:1px solid var(--line);border-radius:12px;padding:13px;
    font-size:13px;line-height:1.7;white-space:pre-wrap;color:var(--kumokai-soft)}
  .warn{color:var(--danger);font-size:13px;margin-top:12px;line-height:1.6}
  .modal .row{display:flex;gap:10px;margin-top:16px}
  .btn{flex:1;padding:12px;border-radius:11px;font-size:14px;font-weight:700;cursor:pointer;border:1px solid var(--line)}
  .btn.copy{background:var(--lantern);color:#241803;border:none}
  .btn.close{background:transparent;color:var(--muted)}

  @media (prefers-reduced-motion:reduce){*{transition:none!important}}`;

const SHELL = `<header>
    <div class="wrap">
      <div class="eyebrow">仁和寺 — 音の出る雲海ライトアップ</div>
      <h1>運営チェックリスト</h1>
      <div class="sub">持ち場を選んで、上から順にチェック → 最後に「提出」</div>
      <div class="namebox">
        <label>担当者</label>
        <input id="name" type="text" placeholder="名前を入力" autocomplete="off">
      </div>
    </div>
  </header>

  <nav class="tabs" id="tabs"></nav>
  <main class="wrap" id="main"></main>

  <div class="footer">
    <div class="inner">
      <div class="meta" id="meta">—</div>
      <button class="submit" id="submit" disabled>提出する</button>
    </div>
  </div>

  <div class="overlay" id="overlay">
    <div class="modal">
      <h2>提出内容の確認</h2>
      <div class="when" id="modalWhen"></div>
      <div class="summary" id="modalSummary"></div>
      <div class="warn" id="modalWarn"></div>
      <div class="row">
        <button class="btn copy" id="copyBtn">コピーして送る</button>
        <button class="btn close" id="closeBtn">閉じる</button>
      </div>
    </div>
  </div>`;

const PAGE = '<style>' + CSS + '</style>' + SHELL;

export default function Home() {
  useEffect(() => {
/* ===== チェックリストの中身（ここを書き換えれば項目を編集できます） ===== */
const DATA = [
  { id:"all", name:"全員準備", blocks:[
    { time:"17:30", note:"到着後", items:[
      "スタッフ集合・点呼",
      "備品の準備（名札・ライト・スピーカー・法被）",
      "事務所でお金と鍵を受け取る（山門BOX・金堂BOX）",
      "各自の持ち場を確認する",
    ]},
  ]},
  { id:"sanmon", name:"山門BOX", blocks:[
    { time:"18:00", note:"開店準備", items:[
      "券売機の電源・つり銭・チケット在庫を確認する",
      "サイネージを夜間用に切り替える",
      "パンフレットの在庫枚数を確認する",
      "チケットの渡し方を確認する",
      "電子決済の使い方を確認する",
      "蔵カフェの営業を確認する",
      "18:30 に山門を開ける",
    ]},
    { time:"20:30", note:"閉店・締め", items:[
      "お金を数える",
      "売上を計算する",
      "釣銭表に記入する",
      "売上表に記入する",
      "パンフレットの在庫枚数を記録する",
      "サイネージを昼間用に戻す",
      "電子決済を締める",
      "室内を片付ける",
      "山門を閉める",
      "ゴミ袋を交換する",
      "エアコンを消す",
      "鍵を閉める",
      "事務所にお金と鍵を返す",
      "※3日目はチェック表を提出する",
    ]},
  ]},
  { id:"keidai", name:"境内", blocks:[
    { time:"設営", note:"開門前", items:[
      "霊宝館前にパーテーションを設置する",
      "霊宝館前の電気をつける",
      "茶所で雲海のスイッチを受け取る",
      "茶所にパーテーションを設置する（2か所）",
      "境内のライトをつける",
      "青いライトをつける",
      "スピーカーを設置する（配置場所は配置図で確認）",
      "灯篭にライトを設置する（18:50頃）",
      "日中用の看板をしまう",
      "金堂の両脇にパーテーションを設置する",
      "鐘楼前にパーテーションを設置する",
      "経蔵前に紐を結ぶ（2か所）",
      "蔵カフェにパーテーションを設置する",
      "五重塔にパーテーションを設置する（3か所）",
      "雲海を試運転する（地面を冷やす）",
    ]},
    { time:"19:00", note:"開門", items:[
      "中門を開ける",
      "雲海を15分おきに噴出する",
    ]},
    { time:"20:45", note:"終了案内", items:[
      "最後の雲海が終わったら退場案内を始める",
    ]},
    { time:"21:00", note:"撤収", items:[
      "日中用の看板を元に戻す（横の金具をしっかり固定）",
      "金堂両脇のパーテーションを撤去する",
      "鐘楼前のパーテーションを撤去する",
      "経蔵前の紐をほどき、きれいにまとめる（2か所）",
      "蔵カフェのパーテーションを撤去する",
      "灯篭のライトを回収する",
      "青いライトを消す",
      "五重塔のパーテーションを撤去する（3か所）",
      "茶所のパーテーションを撤去する（2か所）",
      "雲海のスイッチを茶所に戻す",
      "忘れ物がないか確認する",
      "境内に人が残っていないか確認する",
      "中門を閉める",
      "霊宝館前のパーテーションを撤去する",
      "霊宝館前の電気を消す",
      "トイレの電気を消す",
    ]},
    { time:"食堂に戻ってから", note:"", items:[
      "スピーカー・ライトを充電する",
      "名札・法被を戻す",
      "食堂の電気を消す",
    ]},
  ]},
  { id:"kondo", name:"金堂BOX", blocks:[
    { time:"18:00", note:"開店準備", items:[
      "前日のつり銭を確認する",
      "御朱印の在庫枚数を確認する",
      "サイネージを夜間用に切り替える",
      "御朱印を書く準備をする",
    ]},
    { time:"19:00", note:"販売開始", items:[
      "御朱印の販売を始める",
    ]},
    { time:"20:30", note:"閉店・締め", items:[
      "お金を数える",
      "売上を計算する",
      "釣銭表に記入する",
      "売上表に記入する",
      "御朱印の在庫枚数を記録する",
      "サイネージを昼間用に戻す",
      "墨を片付ける",
      "ゴミ袋を交換する",
      "エアコンを消す",
      "電気を消す",
      "忘れ物がないか確認する",
      "鍵を閉める",
      "事務所にお金と鍵を返す",
    ]},
  ]},
];
/* ================================================================= */

const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#241803" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const state = {};   // key "station:b:i" -> true
let active = DATA[0].id;

function keyFor(s,b,i){return s+":"+b+":"+i;}
function stationItems(st){let n=0;st.blocks.forEach(b=>n+=b.items.length);return n;}
function stationDone(st){let n=0;st.blocks.forEach((b,bi)=>b.items.forEach((_,i)=>{if(state[keyFor(st.id,bi,i)])n++;}));return n;}

function renderTabs(){
  const el=document.getElementById('tabs');
  el.innerHTML='';
  DATA.forEach(st=>{
    const done=stationDone(st), total=stationItems(st);
    const t=document.createElement('button');
    t.className='tab'+(st.id===active?' active':'');
    t.innerHTML=st.name+'<span class="cnt">'+done+'/'+total+'</span>';
    t.onclick=()=>{active=st.id;render();window.scrollTo({top:0,behavior:'smooth'});};
    el.appendChild(t);
  });
}

function renderMain(){
  const st=DATA.find(s=>s.id===active);
  const done=stationDone(st), total=stationItems(st);
  const pct=total?Math.round(done/total*100):0;
  const m=document.getElementById('main');
  let html='';
  html+='<div class="stationhead"><div class="t">'+st.name+'</div><div class="p">'+done+' / '+total+' 完了</div></div>';
  html+='<div class="bar"><i style="width:'+pct+'%"></i></div>';
  st.blocks.forEach((b,bi)=>{
    html+='<div class="block"><div class="blocktime"><span class="dot"></span><span class="time">'+b.time+'</span>'+(b.note?'<span class="note">'+b.note+'</span>':'')+'</div>';
    b.items.forEach((it,i)=>{
      const k=keyFor(st.id,bi,i), on=!!state[k];
      html+='<div class="item'+(on?' done':'')+'" data-k="'+k+'"><span class="check">'+CHECK_SVG+'</span><span class="label">'+it+'</span></div>';
    });
    html+='</div>';
  });
  m.innerHTML=html;
  m.querySelectorAll('.item').forEach(el=>{
    el.onclick=()=>{const k=el.dataset.k;state[k]=!state[k];render();};
  });
}

function renderFooter(){
  const st=DATA.find(s=>s.id===active);
  const done=stationDone(st), total=stationItems(st);
  const name=document.getElementById('name').value.trim();
  document.getElementById('meta').innerHTML='<b>'+st.name+'</b> ／ 残り '+(total-done)+' 件';
  document.getElementById('submit').disabled = !name;
}

function render(){renderTabs();renderMain();renderFooter();}

/* 提出 */
function submit(){
  const st=DATA.find(s=>s.id===active);
  const name=document.getElementById('name').value.trim();
  if(!name) return;
  const now=new Date();
  const when=now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+' '+
    String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
  const undone=[];
  let done=0,total=0;
  let lines=['【'+st.name+' チェックリスト提出】','担当：'+name,'時刻：'+when,''];
  st.blocks.forEach((b,bi)=>{
    lines.push('〔'+b.time+(b.note?' '+b.note:'')+'〕');
    b.items.forEach((it,i)=>{
      total++;
      const on=!!state[keyFor(st.id,bi,i)];
      if(on)done++; else undone.push(b.time+'：'+it);
      lines.push((on?'☑ ':'☐ ')+it);
    });
    lines.push('');
  });
  lines.push('完了 '+done+' / '+total);
  const summary=lines.join('\n');
  document.getElementById('modalWhen').textContent=name+' ・ '+when;
  document.getElementById('modalSummary').textContent=summary;
  const warnEl=document.getElementById('modalWarn');
  warnEl.textContent = undone.length ? ('未チェックが '+undone.length+' 件あります：\n'+undone.join('\n')) : '';
  document.getElementById('copyBtn').dataset.text=summary;
  document.getElementById('overlay').classList.add('show');
}

document.getElementById('name').addEventListener('input',renderFooter);
document.getElementById('submit').addEventListener('click',submit);
document.getElementById('closeBtn').addEventListener('click',()=>document.getElementById('overlay').classList.remove('show'));
document.getElementById('overlay').addEventListener('click',e=>{if(e.target.id==='overlay')e.target.classList.remove('show');});
document.getElementById('copyBtn').addEventListener('click',function(){
  const t=this.dataset.text||'';
  navigator.clipboard.writeText(t).then(()=>{this.textContent='コピーしました';setTimeout(()=>this.textContent='コピーして送る',1500);});
});

render();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: PAGE }} />;
}
