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

  @media (prefers-reduced-motion:reduce){*{transition:none!important}}
/* --- mode switch --- */
.modeswitch{display:flex;gap:5px;margin-top:14px;background:var(--surface);padding:4px;border-radius:12px}
.modebtn{flex:1;background:transparent;border:none;color:var(--muted);font-weight:700;font-size:13px;padding:9px 4px;border-radius:9px;cursor:pointer;transition:.15s;white-space:nowrap}
.modebtn.active{background:var(--kumokai);color:#08122b}
/* --- shift form --- */
.form{margin:0 0 36px}
.field{margin-bottom:16px}
.field label{display:block;font-size:13px;color:var(--muted);margin-bottom:6px;font-weight:700}
.field .req{color:var(--kumokai-soft);font-size:11px;border:1px solid var(--line);padding:1px 6px;border-radius:6px;margin-left:4px}
.field input,.field textarea{width:100%;background:var(--night);border:1px solid var(--line);color:var(--text);border-radius:10px;padding:12px;font-size:15px;font-family:inherit}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--kumokai)}
.dayrow{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--line)}
.daylabel{flex:0 0 86px;font-size:14px;font-weight:700}
.dayopts{display:flex;gap:5px;flex:1}
.dayopt{flex:1;background:var(--night);border:1px solid var(--line);color:var(--muted);font-size:12px;font-weight:700;padding:8px 2px;border-radius:8px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.dayopt[data-v="はいりたい"].sel{background:var(--kumokai);color:#08122b;border-color:var(--kumokai)}
.dayopt[data-v="できたらはいりたい"].sel{background:var(--lantern);color:#241803;border-color:var(--lantern)}
.dayopt[data-v="はいれない"].sel{background:var(--surface);color:var(--text);border-color:var(--line)}
.sendbtn{width:100%;background:var(--kumokai);color:#08122b;border:none;font-weight:800;font-size:16px;padding:14px;border-radius:12px;cursor:pointer;margin-top:18px}
.sendbtn:disabled{opacity:.5}
.shiftmsg{margin-top:12px;font-size:14px;text-align:center;min-height:20px}
.shiftmsg.ok{color:var(--lantern)}
.shiftmsg.err{color:var(--danger)}
.hint{margin-top:14px;font-size:12px;color:var(--muted);line-height:1.6}
/* --- confirmed view --- */
.cbar{display:flex;justify-content:space-between;align-items:center;margin:14px 0}
.refresh{background:var(--surface);border:1px solid var(--line);color:var(--text);font-size:13px;font-weight:700;padding:8px 14px;border-radius:9px;cursor:pointer}
.ctable{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:30px}
.ctable th{background:var(--surface);color:var(--kumokai-soft);text-align:left;padding:9px;border:1px solid var(--line);font-weight:800}
.ctable td{padding:9px;border:1px solid var(--line)}
.empty{color:var(--muted);text-align:center;padding:40px 16px;font-size:14px;line-height:1.7}
.empty.err{color:var(--danger)}
`;

const SHELL = `  <header>
    <div class="wrap">
      <div class="eyebrow">仁和寺 — 音の出る雲海ライトアップ</div>
      <h1>運営アプリ</h1>
      <div class="modeswitch">
        <button id="mode-checklist" class="modebtn active">チェックリスト</button>
        <button id="mode-shift" class="modebtn">シフト提出</button>
        <button id="mode-confirmed" class="modebtn">確定シフト</button>
      </div>
    </div>
  </header>

  <div id="view-checklist">
    <div class="wrap">
      <div class="sub" style="margin-top:14px">持ち場を選んで、上から順にチェック → 最後に「提出」</div>
      <div class="namebox">
        <label>担当者</label>
        <input id="name" type="text" placeholder="名前を入力" autocomplete="off">
      </div>
    </div>
    <nav class="tabs" id="tabs"></nav>
    <main class="wrap" id="main"></main>
  </div>

  <div id="view-shift" style="display:none">
    <main class="wrap">
      <div class="sub" style="margin:14px 0">7/10〜7/20で、入れる日を選んで送ってください。</div>
      <div class="form">
        <div class="field">
          <label>お名前 <span class="req">必須</span></label>
          <input id="sf-name" type="text" placeholder="名前を入力" autocomplete="off">
        </div>
        <div class="dayrow" data-date="7/10">
          <div class="daylabel">7/10（金）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/11">
          <div class="daylabel">7/11（土）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/12">
          <div class="daylabel">7/12（日）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/13">
          <div class="daylabel">7/13（月）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/14">
          <div class="daylabel">7/14（火）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/15">
          <div class="daylabel">7/15（水）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/16">
          <div class="daylabel">7/16（木）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/17">
          <div class="daylabel">7/17（金）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/18">
          <div class="daylabel">7/18（土）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/19">
          <div class="daylabel">7/19（日）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="dayrow" data-date="7/20">
          <div class="daylabel">7/20（月）</div>
          <div class="dayopts">
            <button class="dayopt" data-v="はいりたい">はいりたい</button>
            <button class="dayopt" data-v="できたらはいりたい">できたら</button>
            <button class="dayopt sel" data-v="はいれない">はいれない</button>
          </div>
        </div>
        <div class="field" style="margin-top:18px">
          <label>備考（時間の希望など）</label>
          <textarea id="sf-note" rows="3" placeholder="例：平日は18時以降なら入れます"></textarea>
        </div>
        <button id="sf-send" class="sendbtn">送信する</button>
        <div id="sf-msg" class="shiftmsg"></div>
        <div class="hint">初期状態は全部「はいれない」です。入れる日だけ「はいりたい」か「できたら」に変えてください。あとから送り直すと、最新の内容に上書きされます。</div>
      </div>
    </main>
  </div>

  <div id="view-confirmed" style="display:none">
    <main class="wrap">
      <div class="cbar">
        <div class="sub">確定したシフト</div>
        <button id="cf-refresh" class="refresh">更新</button>
      </div>
      <div id="cf-area"><div class="empty">読み込み中…</div></div>
    </main>
  </div>

  <div class="footer" id="footer">
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

  // ===== 画面切り替え =====
  var SHIFT_URL = "https://script.google.com/macros/s/AKfycbw2CUEWQJX4uceZ_xab9m6GdqaPS14J-OQobhk8wW80o4jiQVA-mGwKpK3q7BIEdbir/exec";
  var _views = { checklist:'view-checklist', shift:'view-shift', confirmed:'view-confirmed' };
  var _confirmedLoaded = false;
  function setMode(m){
    for (var k in _views){
      document.getElementById(_views[k]).style.display = (k===m) ? '' : 'none';
      document.getElementById('mode-'+k).classList.toggle('active', k===m);
    }
    document.getElementById('footer').style.display = (m==='checklist') ? '' : 'none';
    window.scrollTo({top:0});
    if (m==='confirmed' && !_confirmedLoaded){ loadConfirmed(); }
  }
  document.getElementById('mode-checklist').addEventListener('click', function(){ setMode('checklist'); });
  document.getElementById('mode-shift').addEventListener('click', function(){ setMode('shift'); });
  document.getElementById('mode-confirmed').addEventListener('click', function(){ setMode('confirmed'); });

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

  // ===== シフト提出 =====
  var DATES = ["7/10","7/11","7/12","7/13","7/14","7/15","7/16","7/17","7/18","7/19","7/20"];
  var daySel = {};
  DATES.forEach(function(d){ daySel[d] = 'はいれない'; });
  document.querySelectorAll('.dayrow').forEach(function(row){
    var d = row.getAttribute('data-date');
    row.querySelectorAll('.dayopt').forEach(function(btn){
      btn.addEventListener('click', function(){
        row.querySelectorAll('.dayopt').forEach(function(b){ b.classList.remove('sel'); });
        btn.classList.add('sel');
        daySel[d] = btn.getAttribute('data-v');
      });
    });
  });
  var sfBtn = document.getElementById('sf-send');
  var sfMsg = document.getElementById('sf-msg');
  sfBtn.addEventListener('click', async function(){
    var name = document.getElementById('sf-name').value.trim();
    if(!name){ sfMsg.className='shiftmsg err'; sfMsg.textContent='お名前を入力してください。'; return; }
    sfBtn.disabled = true; sfMsg.className='shiftmsg'; sfMsg.textContent='送信中…';
    var payload = { "名前": name };
    DATES.forEach(function(d){ payload[d] = daySel[d]; });
    payload["備考"] = document.getElementById('sf-note').value.trim();
    try{
      await fetch(SHIFT_URL, { method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: JSON.stringify(payload) });
      sfMsg.className='shiftmsg ok'; sfMsg.textContent='送信しました。ありがとうございます！';
    }catch(err){
      sfMsg.className='shiftmsg err'; sfMsg.textContent='送信に失敗しました。通信環境を確認して、もう一度お試しください。';
    }finally{
      sfBtn.disabled = false;
    }
  });

  // ===== 確定シフト表示 =====
  function escH(s){ return String(s).replace(/[&<>]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }); }
  function loadConfirmed(){
    var area = document.getElementById('cf-area');
    area.innerHTML = '<div class="empty">読み込み中…</div>';
    fetch(SHIFT_URL).then(function(r){ return r.json(); }).then(function(data){
      var rows = (data && data.confirmed) || [];
      if(!rows.length){ area.innerHTML = '<div class="empty">まだシフトは確定していません。<br>確定すると、ここに表示されます。</div>'; _confirmedLoaded = true; return; }
      var html = '<table class="ctable">';
      rows.forEach(function(r, i){
        html += '<tr>';
        r.forEach(function(c){ html += (i===0?'<th>':'<td>') + escH(c) + (i===0?'</th>':'</td>'); });
        html += '</tr>';
      });
      html += '</table>';
      area.innerHTML = html;
      _confirmedLoaded = true;
    }).catch(function(e){
      area.innerHTML = '<div class="empty err">読み込みに失敗しました。少し待って「更新」を押してください。</div>';
    });
  }
  document.getElementById('cf-refresh').addEventListener('click', function(){ _confirmedLoaded = false; loadConfirmed(); });

  }, []);
  return <div dangerouslySetInnerHTML={{ __html: PAGE }} />;
}
