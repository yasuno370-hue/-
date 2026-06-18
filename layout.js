:root{
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