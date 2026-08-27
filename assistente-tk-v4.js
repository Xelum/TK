(() => {
  const style = document.createElement('style');
  style.textContent = `
    .tk-assistant-launcher{position:fixed;right:22px;bottom:22px;z-index:140;width:66px;height:66px;display:grid;place-items:center;border:0;border-radius:22px;color:#fff;background:linear-gradient(145deg,#00c3f5,#00699f);box-shadow:0 18px 42px rgba(0,105,159,.34),0 0 0 7px rgba(0,174,234,.10);cursor:pointer;transition:.22s}.tk-assistant-launcher:hover{transform:translateY(-3px) scale(1.03)}.tk-assistant-launcher svg{width:28px}.tk-assistant-launcher::after{content:"";position:absolute;inset:-7px;border:1px solid rgba(0,174,234,.28);border-radius:27px;animation:tkPulse 2.2s ease-out infinite}.tk-assistant-launcher span{position:absolute;right:54px;bottom:8px;width:max-content;padding:8px 11px;border:1px solid rgba(0,174,234,.22);border-radius:10px;color:#16445e;background:rgba(255,255,255,.94);box-shadow:0 8px 22px rgba(4,74,117,.11);font-size:10px;font-weight:900;pointer-events:none}@keyframes tkPulse{0%{opacity:.8;transform:scale(.92)}75%,100%{opacity:0;transform:scale(1.18)}}
    .tk-assistant-overlay{position:fixed;inset:0;z-index:150;display:none;align-items:flex-end;justify-content:flex-end;padding:20px;background:rgba(3,23,37,.34);backdrop-filter:blur(5px)}.tk-assistant-overlay.open{display:flex}.tk-assistant{width:min(430px,100%);overflow:hidden;border:1px solid rgba(0,174,234,.34);border-radius:27px;background:rgba(248,253,255,.98);box-shadow:0 30px 85px rgba(0,31,52,.28);animation:tkRise .28s ease both}@keyframes tkRise{from{opacity:0;transform:translateY(22px) scale(.97)}to{opacity:1;transform:none}}.tk-assistant-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;color:#fff;background:linear-gradient(135deg,#06273d,#007aaa)}.tk-assistant-identity{display:flex;align-items:center;gap:11px}.tk-assistant-logo{width:42px;height:42px;display:grid;place-items:center;border-radius:13px;background:linear-gradient(145deg,#00c9f8,#0874aa);box-shadow:inset 0 0 0 1px rgba(255,255,255,.28);font-weight:950}.tk-assistant-head strong{display:block;font-size:14px}.tk-assistant-head small{display:flex;align-items:center;gap:5px;margin-top:2px;color:#c8ecfa;font-size:9px}.tk-assistant-head small::before{content:"";width:6px;height:6px;border-radius:50%;background:#3ee2ac;box-shadow:0 0 10px #3ee2ac}.tk-assistant-close{width:36px;height:36px;border:1px solid rgba(255,255,255,.19);border-radius:11px;color:#fff;background:rgba(255,255,255,.09);font-size:22px;cursor:pointer}.tk-assistant-body{padding:17px}.tk-dialogue{min-height:138px;max-height:245px;overflow:auto;padding:13px;border:1px solid rgba(0,174,234,.16);border-radius:16px;background:#edf8fd}.tk-message{width:fit-content;max-width:88%;margin:0 0 9px;padding:10px 12px;border-radius:13px;color:#264b60;background:#fff;box-shadow:0 5px 14px rgba(4,74,117,.06);font-size:11px;line-height:1.5}.tk-message.user{margin-left:auto;color:#fff;background:linear-gradient(135deg,#00aeea,#0076aa)}.tk-message.thinking::after{content:"...";animation:tkDots 1.1s steps(4,end) infinite}@keyframes tkDots{0%{opacity:.2}100%{opacity:1}}.tk-command-row{display:flex;gap:8px;margin-top:12px}.tk-command-row input{min-width:0;flex:1;height:46px;padding:0 12px;border:1px solid rgba(0,145,205,.24);border-radius:12px;outline:0;color:#14384e;background:#fff}.tk-command-row input:focus{border-color:#00aeea;box-shadow:0 0 0 4px rgba(0,174,234,.08)}.tk-send,.tk-mic{width:46px;height:46px;display:grid;place-items:center;flex:none;border:0;border-radius:13px;color:#fff;background:linear-gradient(135deg,#00b9ef,#006ea6);cursor:pointer}.tk-send svg,.tk-mic svg{width:19px}.tk-mic.listening{background:linear-gradient(135deg,#e84a5f,#ad2036);animation:tkListen 1s ease-in-out infinite alternate}@keyframes tkListen{to{transform:scale(1.07);box-shadow:0 0 0 8px rgba(207,60,79,.12)}}.tk-suggestions{display:flex;gap:6px;margin-top:11px;overflow:auto;padding-bottom:2px}.tk-suggestion{flex:none;padding:8px 10px;border:1px solid rgba(0,174,234,.18);border-radius:999px;color:#326076;background:#fff;font-size:9px;font-weight:800;cursor:pointer}.tk-voice-note{margin:10px 2px 0;color:#748c9b;font-size:9px;line-height:1.45}
    .tk-message{white-space:pre-line}.tk-dialogue{max-height:300px}.tk-topic-choices{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0 10px}.tk-topic-choice{padding:7px 10px;border:1px solid rgba(0,174,234,.24);border-radius:999px;color:#176080;background:#fff;font-size:9px;font-weight:850;cursor:pointer}
    @media(max-width:600px){.tk-assistant-launcher{right:14px;bottom:14px;width:58px;height:58px;border-radius:19px}.tk-assistant-launcher span{display:none}.tk-assistant-overlay{align-items:flex-end;padding:0}.tk-assistant{width:100%;border-radius:25px 25px 0 0}.tk-assistant-body{padding:14px}.tk-dialogue{min-height:155px}.tk-suggestions{margin-right:-14px;padding-right:14px}}
  `;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.className = 'tk-assistant-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Apri Assistente TK');
  launcher.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a7 7 0 0 0-7 7v2a7 7 0 0 0 14 0V9a7 7 0 0 0-7-7Z"/><path d="M8 10h.01M16 10h.01M9 14c1.8 1.3 4.2 1.3 6 0M12 18v4M8 22h8" stroke-linecap="round"/></svg><span>Assistente TK</span>`;
  document.body.appendChild(launcher);

  const overlay = document.createElement('div');
  overlay.className = 'tk-assistant-overlay';
  overlay.id = 'tkAssistantOverlay';
  overlay.innerHTML = `<section class="tk-assistant" role="dialog" aria-modal="true" aria-label="Assistente TK"><header class="tk-assistant-head"><div class="tk-assistant-identity"><div class="tk-assistant-logo">TK</div><div><strong>Assistente TK</strong><small>Pronto ad aiutarti · versione 3</small></div></div><button class="tk-assistant-close" type="button" aria-label="Chiudi">×</button></header><div class="tk-assistant-body"><div class="tk-dialogue" id="tkDialogue"><div class="tk-message">Ciao! Dimmi cosa vuoi fare oppure chiedimi: “Che domande posso farti?”.</div></div><form class="tk-command-row" id="tkCommandForm"><input id="tkCommandInput" type="text" autocomplete="off" placeholder="Es. Ci sono mezzi in scadenza?" aria-label="Comando per Assistente TK"><button class="tk-mic" id="tkMic" type="button" aria-label="Parla con Assistente TK"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg></button><button class="tk-send" type="submit" aria-label="Invia comando"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg></button></form><div class="tk-suggestions"><button class="tk-suggestion" data-command="Che domande posso farti?">Cosa posso chiederti?</button><button class="tk-suggestion" data-command="Apri i mezzi">Mezzi</button><button class="tk-suggestion" data-command="Apri il magazzino">Magazzino</button><button class="tk-suggestion" data-command="Apri il personale">Personale</button><button class="tk-suggestion" data-command="Apri le commesse">Commesse</button><button class="tk-suggestion" data-command="Apri i rifornimenti">Rifornimenti</button></div><p class="tk-voice-note" id="tkVoiceNote">Premi il microfono e autorizza il browser al primo utilizzo. Puoi anche scrivere il comando.</p></div></section>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.tk-assistant-head small').textContent='Pronto ad aiutarti · versione 4';

  const dialogue = document.getElementById('tkDialogue');
  const input = document.getElementById('tkCommandInput');
  const mic = document.getElementById('tkMic');
  const close = () => overlay.classList.remove('open');
  const open = () => { overlay.classList.add('open'); setTimeout(() => input.focus(), 120); };
  launcher.addEventListener('click', open);
  overlay.querySelector('.tk-assistant-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  const addMessage = (text, role = 'assistant') => {
    const el = document.createElement('div');
    el.className = `tk-message${role === 'user' ? ' user' : ''}`;
    el.textContent = text;
    dialogue.appendChild(el);
    dialogue.scrollTop = dialogue.scrollHeight;
  };
  const addTopicChoices = () => {
    const box=document.createElement('div');box.className='tk-topic-choices';
    ['Mezzi','Commesse','Rifornimenti','Magazzino','Personale','Altro'].forEach(label=>{const button=document.createElement('button');button.type='button';button.className='tk-topic-choice';button.textContent=label;button.onclick=()=>processCommand(label);box.appendChild(button)});
    dialogue.appendChild(box);dialogue.scrollTop=dialogue.scrollHeight;
  };
  let navigationPending = false;
  let pendingFlow = null;
  const speak = text => new Promise(resolve => {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const italianVoice = window.speechSynthesis.getVoices().find(voice =>
      String(voice.lang || '').toLowerCase().startsWith('it')
    );
    if (italianVoice) utterance.voice = italianVoice;
    utterance.lang = 'it-IT';
    utterance.rate = .94;
    utterance.pitch = 1;
    utterance.volume = 1;

    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      clearTimeout(safetyTimer);
      resolve();
    };
    const safetyTimer = setTimeout(finish, Math.max(4500, text.length * 115));
    utterance.onend = finish;
    utterance.onerror = finish;
    window.speechSynthesis.speak(utterance);

    /* Alcuni smartphone mettono in pausa la sintesi dopo il riconoscimento vocale. */
    setTimeout(() => {
      if (!completed && window.speechSynthesis.paused) window.speechSynthesis.resume();
    }, 180);
  });
  const normalize = text => text.toLocaleLowerCase('it').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9à-ÿ\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const navigateAfterSpeech = (reply, url) => {
    if (navigationPending) return;
    navigationPending = true;
    addMessage(reply);
    speak(reply).finally(() => { window.location.href = url; });
  };
  const vehicleLabel = v => `${v.vehicleName || [v.make,v.model].filter(Boolean).join(' ') || 'mezzo'}, ${v.vehicleUnnumbered ? 'non numerato' : 'numero '+(v.vehicleNumber || 'non indicato')}, targa ${(v.plate || 'non indicata').toUpperCase()}`;
  const loadVehicles = async () => {
    const firebase = await import('./firebase-config.js');
    const snap = await firebase.getDocs(firebase.collection(firebase.db, 'mezzi'));
    return snap.docs.map(d => ({id:d.id, ...d.data()}));
  };
  const daysUntil = value => { if (!value) return Infinity; const today=new Date();today.setHours(0,0,0,0);return Math.ceil((new Date(value+'T12:00:00')-today)/86400000); };
  const expiringVehicles = vehicles => vehicles.map(v => ({...v,tkDeadlines:[['revisione',v.revisionDate],['assicurazione',v.insuranceDate],['bollo',v.taxDate],['tagliando',v.serviceDate]].filter(x=>x[1]).map(([name,date])=>({name,date,days:daysUntil(date)})).filter(x=>x.days>=0&&x.days<=30).sort((a,b)=>a.days-b.days)})).filter(v=>v.tkDeadlines.length);
  const money = value => new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(Number(value)||0);
  const keyNorm = value => normalize(String(value||'')).replace(/\s/g,'');
  const pick = (record, aliases) => {
    const wanted=aliases.map(keyNorm);
    const key=Object.keys(record||{}).find(k=>wanted.includes(keyNorm(k)));
    return key===undefined?'':record[key];
  };
  const amountOf = c => { const raw=pick(c,['amount','importo','importoOE','importoO.E.','offerAmount','oeAmount','economicOffer','valore','importoOfferta']);if(typeof raw==='number')return raw;const clean=String(raw||'').replace(/[^0-9,.-]/g,'').replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.');return Number(clean)||0; };
  const statusOf = c => normalize(pick(c,['status','stato','statoCommessa']));
  const kamOf = c => String(pick(c,['kam','KAM','accountManager','referenteKam','commerciale'])||'Non indicato').trim();
  const deadlineOf = c => pick(c,['deadline','deadlineDate','scadenza','scadenzaPreventivo','preventivoDeadline','dataScadenza']);
  const assemblyOf = c => pick(c,['assemblyDate','dataAssemblea','assemblea','assembleaDate']);
  const protocolOf = c => String(pick(c,['protocol','protocollo','protocolloInterno','internalProtocol'])||'Senza protocollo');
  const locationOf = c => String(pick(c,['location','ubicazione','ubicazioneCondominio','address','indirizzo','condominio'])||'Ubicazione non indicata');
  const loadCommesse = async () => { const firebase=await import('./firebase-config.js');const snap=await firebase.getDocs(firebase.collection(firebase.db,'commesse'));return snap.docs.map(d=>({id:d.id,...d.data()})); };
  const statusGroup = (c,group) => { const s=statusOf(c);return group==='won'?s.includes('aggiudicata')&&!s.includes('non aggiudicata'):group==='lost'?s.includes('non aggiudicata')||s.includes('rifiutata'):group==='waiting'?s.includes('attesa'):group==='working'?s.includes('lavorare')||s.includes('lavorazione'):group==='rejected'?s.includes('rifiutata'):false; };
  const summarize = (list,label) => `${label}: ${list.length} commesse, per un importo complessivo di ${money(list.reduce((sum,c)=>sum+amountOf(c),0))}.`;
  const dateValue = value => { if(!value)return null;if(value?.toDate)return value.toDate();const d=new Date(String(value).length===10?String(value)+'T12:00:00':value);return Number.isNaN(d.getTime())?null:d; };
  const dateIT = value => { const d=dateValue(value);return d?new Intl.DateTimeFormat('it-IT').format(d):'non indicata'; };
  const daysFromToday = value => { const d=dateValue(value);if(!d)return Infinity;const t=new Date();t.setHours(0,0,0,0);d.setHours(12,0,0,0);return Math.ceil((d-t)/86400000); };
  const helpTopics = {
    mezzi:'Puoi chiedermi:\n• Apri o mostrami i mezzi\n• Ci sono mezzi in scadenza?\n• Quali revisioni scadono a breve?\n• Controlla assicurazioni, bolli o tagliandi\n• Aggiungi un nuovo mezzo',
    commesse:'Puoi chiedermi:\n• Quante commesse abbiamo in tutto?\n• Qual è l’importo totale delle commesse?\n• Quante commesse sono vinte, non vinte, in attesa o da lavorare?\n• Qual è il valore delle commesse aggiudicate?\n• Quante commesse sono in scadenza?\n• Quali assemblee sono vicine?\n• Quante commesse ha Mazzolini, Marchetti o un altro KAM?\n• Quanto valgono le commesse di un KAM?\n• Quante commesse ha aggiudicato un KAM?\n• Qual è il KAM con più commesse o con il valore maggiore?\n• Qual è la commessa più importante?\n• Qual è lo stato, l’importo, il KAM o la scadenza di una specifica commessa?\n• Apri la Gestione commesse',
    rifornimenti:'Puoi chiedermi:\n• Apri i rifornimenti\n• Stampa il report in bianco dei rifornimenti\n• Prepara il report per tutti i mezzi\n• Prepara il report per un mezzo specifico',
    magazzino:'Puoi chiedermi:\n• Apri il magazzino\n• Mostrami gli attrezzi\n• Apri le casse o l’inventario',
    personale:'Puoi chiedermi:\n• Apri Personale e squadre\n• Apri il programma giornaliero\n• Mostrami ferie e assenze',
    altro:'Puoi chiedermi di aprire il Centro costi, la Gestione social oppure di tornare alla Home.'
  };
  const answerCommesse = async q => {
    const context=['commess','preventiv','gara','aggiudicat','non vint','vinte','vinta','kam','assemble'].some(w=>q.includes(w));
    const analysis=['quant','quanto','importo','valore','totale','soldi','scad','stato','chi ha','quale kam','piu commess','maggiore','media','assemble','aggiudicat','non vint','vinte','vinta','attesa','lavoraz','rifiutat'].some(w=>q.includes(w));
    if(!context||!analysis)return false;
    const wait='Controllo subito i dati aggiornati delle commesse.';addMessage(wait);await speak(wait);
    try{
      const all=await loadCommesse();
      if(!all.length){const reply='Al momento non risultano commesse registrate.';addMessage(reply);speak(reply);return true;}
      const kams=[...new Set(all.map(kamOf).filter(k=>k&&k!=='Non indicato'))];
      const namedKam=kams.find(k=>q.includes(normalize(k)))||null;
      if(q.includes('kam')&&!namedKam&&!q.includes('quale kam')&&!q.includes('kam con')&&!q.includes('chi ha')){pendingFlow={type:'commesse-kam',query:q};const reply=`Di quale KAM vuoi conoscere i dati? I KAM presenti sono: ${kams.join(', ')}.`;addMessage(reply);speak(reply);return true;}
      const source=namedKam?all.filter(c=>normalize(kamOf(c))===normalize(namedKam)):all;
      const scope=namedKam?` del KAM ${namedKam}`:'';
      const specific=all.find(c=>{const protocol=normalize(protocolOf(c)),location=normalize(locationOf(c));return(protocol.length>5&&q.includes(protocol))||(location.length>7&&q.includes(location));});
      let reply='';
      if(specific){
        reply=`${protocolOf(specific)}, ${locationOf(specific)}. Importo: ${money(amountOf(specific))}. Stato: ${pick(specific,['status','stato'])||'non indicato'}. KAM: ${kamOf(specific)}. Scadenza preventivo: ${dateIT(deadlineOf(specific))}. Data assemblea: ${dateIT(assemblyOf(specific))}.`;
      }else if(q.includes('scad')){
        const due=source.filter(c=>{const d=daysFromToday(deadlineOf(c));return d>=0&&d<=30&&!statusGroup(c,'won')&&!statusGroup(c,'lost')});
        reply=due.length?`${due.length} commesse${scope} hanno la scadenza del preventivo nei prossimi 30 giorni: ${due.slice(0,5).map(c=>`${protocolOf(c)}, ${locationOf(c)}, scadenza ${dateIT(deadlineOf(c))}`).join('; ')}${due.length>5?` e altre ${due.length-5}`:''}.`:`Non ci sono commesse${scope} con scadenza del preventivo nei prossimi 30 giorni.`;
      }else if(q.includes('assemble')){
        const due=source.filter(c=>{const d=daysFromToday(assemblyOf(c));return d>=0&&d<=30});
        reply=due.length?`${due.length} commesse${scope} hanno un’assemblea nei prossimi 30 giorni: ${due.slice(0,5).map(c=>`${protocolOf(c)}, ${locationOf(c)}, assemblea ${dateIT(assemblyOf(c))}`).join('; ')}${due.length>5?` e altre ${due.length-5}`:''}.`:`Non risultano assemblee${scope} nei prossimi 30 giorni.`;
      }else if((q.includes('quale kam')||q.includes('chi ha')||q.includes('kam con'))&&!namedKam){
        const stats=kams.map(k=>{const list=all.filter(c=>normalize(kamOf(c))===normalize(k));return{kam:k,count:list.length,total:list.reduce((s,c)=>s+amountOf(c),0),won:list.filter(c=>statusGroup(c,'won')).length,wonTotal:list.filter(c=>statusGroup(c,'won')).reduce((s,c)=>s+amountOf(c),0)}});
        const byValue=q.includes('valore')||q.includes('importo')||q.includes('soldi')||q.includes('maggiore');
        const byWon=q.includes('aggiudicat')||q.includes('vint');
        const best=[...stats].sort((a,b)=>byWon?(b.won-a.won||b.wonTotal-a.wonTotal):byValue?b.total-a.total:b.count-a.count)[0];
        reply=byWon?`${best.kam} è il KAM con più commesse aggiudicate: ${best.won}, per ${money(best.wonTotal)}.`:byValue?`${best.kam} è il KAM con il valore complessivo più alto: ${money(best.total)} su ${best.count} commesse.`:`${best.kam} è il KAM con più commesse: ${best.count}, per un valore complessivo di ${money(best.total)}.`;
      }else if(q.includes('piu important')||q.includes('piu grande')||q.includes('maggiore importo')||q.includes('importo piu alto')){
        const top=[...source].sort((a,b)=>amountOf(b)-amountOf(a))[0];reply=`La commessa di importo più alto${scope} è ${protocolOf(top)}, ${locationOf(top)}, con ${money(amountOf(top))}. Stato: ${pick(top,['status','stato'])||'non indicato'}.`;
      }else if(q.includes('media')){
        reply=`L’importo medio delle ${source.length} commesse${scope} è ${money(source.reduce((s,c)=>s+amountOf(c),0)/source.length)}.`;
      }else{
        let group=null,label='';
        if(q.includes('non vint')||q.includes('non aggiudicat')||q.includes('pers')){group='lost';label='Commesse non vinte';}
        else if(q.includes('aggiudicat')||q.includes('vint')){group='won';label='Commesse aggiudicate';}
        else if(q.includes('attesa')){group='waiting';label='Commesse in attesa';}
        else if(q.includes('lavoraz')||q.includes('da lavorare')){group='working';label='Commesse da lavorare';}
        else if(q.includes('rifiutat')){group='rejected';label='Commesse rifiutate';}
        if(group){reply=summarize(source.filter(c=>statusGroup(c,group)),label+scope);}
        else if(namedKam){reply=summarize(source,`Totale commesse del KAM ${namedKam}`);const won=source.filter(c=>statusGroup(c,'won'));if(q.includes('aggiudicat')||q.includes('vint'))reply=summarize(won,`Commesse aggiudicate dal KAM ${namedKam}`);}
        else if(q.includes('importo')||q.includes('valore')||q.includes('soldi')||q.includes('quanto')){reply=`L’importo complessivo di tutte le ${all.length} commesse è ${money(all.reduce((s,c)=>s+amountOf(c),0))}.`;}
        else{reply=`Nel portale sono presenti ${all.length} commesse, per un importo complessivo di ${money(all.reduce((s,c)=>s+amountOf(c),0))}.`;}
      }
      addMessage(reply);speak(reply);return true;
    }catch(error){console.error(error);const reply='Mi dispiace, in questo momento non riesco a leggere i dati delle commesse. Vuoi che apra la Gestione commesse per controllarli manualmente?';pendingFlow={type:'confirm-open-commesse'};addMessage(reply);speak(reply);return true;}
  };
  const destinations = [
    {words:['riforniment','carburant','benzina','gasolio','adblue'],url:'gestione-rifornimenti.html',name:'la gestione rifornimenti'},
    {words:['programma giornaliero','programma operai','organizzazione operai','organizza operai','squadre','squadra','personale','dipendenti','operai','ferie','assenze'],url:'gestione-personale.html',name:'Personale e squadre'},
    {words:['attrezz','magazzino','inventario','material','casse','cassa','strument'],url:'gestione-magazzino.html',name:'Attrezzature e magazzino'},
    {words:['centro costi','costi','spese','ricavi','profitti'],url:'gestione-centro-costi.html',name:'il Centro costi cantieri'},
    {words:['commess','preventiv','lavori','cantieri'],url:'gestione-commesse.html',name:'la Gestione commesse'},
    {words:['mezzi','mezzo','macchine','macchina','auto','veicoli','veicolo','flotta','revisioni','targhe'],url:'gestione-mezzi.html',name:'la Gestione mezzi aziendali'},
    {words:['social','instagram','facebook','tiktok'],url:'gestione-social.html',name:'la Gestione Social'},
    {words:['home','pagina iniziale','menu principale'],url:'index.html',name:'la Home'}
  ];
  const processCommand = async raw => {
    const text = raw.trim(); if (!text) return;
    addMessage(text, 'user'); input.value = '';
    const q = normalize(text).replace(/^ehi tk\s*/, '').replace(/^hey tk\s*/, '');
    if(pendingFlow?.type==='commesse-kam'){const original=pendingFlow.query;pendingFlow=null;await answerCommesse(`${original} ${q}`);return;}
    if (pendingFlow?.type === 'help-topic') {
      const topic=q.includes('mezz')||q.includes('veicol')?'mezzi':q.includes('commess')||q.includes('preventiv')?'commesse':q.includes('riforn')||q.includes('carbur')?'rifornimenti':q.includes('magazz')||q.includes('attrezz')||q.includes('cass')?'magazzino':q.includes('personal')||q.includes('operai')||q.includes('squadr')?'personale':q.includes('altro')||q.includes('social')||q.includes('costi')?'altro':'';
      if(!topic){const reply='Non ho riconosciuto l’argomento. Scegli tra: Mezzi, Commesse, Rifornimenti, Magazzino, Personale oppure Altro.';addMessage(reply);speak(reply);return;}
      pendingFlow=null;addMessage(helpTopics[topic]);speak(`Ecco le domande disponibili per l’argomento ${topic}. Puoi leggerle nella chat.`);return;
    }
    if (pendingFlow?.type === 'confirm-open-commesse') {
      if (/^(si|certo|va bene|ok|okay|apri|procedi)(\b|$)/.test(q)){pendingFlow=null;navigateAfterSpeech('Certo, apro subito la Gestione commesse.','gestione-commesse.html');return;}
      if (/^(no|non serve|lascia stare|annulla)(\b|$)/.test(q)){pendingFlow=null;const reply='Va bene, non apro nulla. Se hai bisogno di altro, sono qui.';addMessage(reply);speak(reply);return;}
      const reply='Scusami, non ho capito. Vuoi che apra la Gestione commesse? Puoi rispondere sì oppure no.';addMessage(reply);speak(reply);return;
    }
    if (pendingFlow?.type === 'confirm-open-vehicles') {
      if (/^(si|certo|va bene|ok|okay|apri|procedi)(\b|$)/.test(q)) {
        pendingFlow = null;
        navigateAfterSpeech('Certo, apro subito la Gestione mezzi.', 'gestione-mezzi.html');
        return;
      }
      if (/^(no|non serve|lascia stare|annulla)(\b|$)/.test(q)) {
        pendingFlow = null;
        const reply = 'Va bene, non apro nulla. Se hai bisogno di altro, sono qui.';
        addMessage(reply); speak(reply); return;
      }
      const reply = 'Scusami, non ho capito. Vuoi che apra comunque la Gestione mezzi? Puoi rispondere sì oppure no.';
      addMessage(reply); speak(reply); return;
    }
    if (pendingFlow?.type === 'fuel-report-scope') {
      if (/\b(tutti|tutte|intera flotta|ogni mezzo)\b/.test(q)) { pendingFlow=null;navigateAfterSpeech('Perfetto. Apro i modelli in bianco per tutti i mezzi. Potrai deselezionare quelli da escludere.','gestione-rifornimenti.html?tk=blank-report&scope=all');return; }
      if (/\b(un mezzo|uno|singolo|specifico|particolare)\b/.test(q)) { pendingFlow={type:'fuel-report-vehicle'};const reply='Va bene. Dimmi il numero del mezzo, la targa oppure il nome del veicolo.';addMessage(reply);speak(reply);return; }
      const reply='Non ho capito. Ti serve il report di un mezzo in particolare oppure di tutti i mezzi?';addMessage(reply);speak(reply);return;
    }
    if (pendingFlow?.type === 'fuel-report-vehicle') { pendingFlow=null;navigateAfterSpeech(`Perfetto. Cerco ${text} e apro il relativo modello in bianco.`,`gestione-rifornimenti.html?tk=blank-report&scope=one&vehicle=${encodeURIComponent(text)}`);return; }
    if (/\b(ciao|buongiorno|buonasera)\b/.test(q) && q.split(' ').length < 5) { const reply='Ciao! Sono pronto. Quale sezione vuoi aprire?'; addMessage(reply); speak(reply); return; }
    if (q.includes('che domande') || q.includes('cosa posso chiederti') || q.includes('cosa ti posso chiedere') || /\b(aiuto|cosa puoi fare|comandi)\b/.test(q)) {
      pendingFlow={type:'help-topic'};
      const reply='Certo. Su quale argomento vuoi conoscere le domande disponibili? Puoi scegliere: Mezzi, Commesse, Rifornimenti, Magazzino, Personale oppure Altro.';
      addMessage(reply);addTopicChoices();speak(reply);return;
    }
    if (/\b(stampa|stampare|genera|generare|prepara|scarica|pdf|report|modello)\b/.test(q) && /\b(riforniment|carburant|benzina|gasolio)\b/.test(q)) { pendingFlow={type:'fuel-report-scope'};const reply='Certo. Ti serve il report in bianco di un mezzo in particolare oppure di tutti i mezzi?';addMessage(reply);speak(reply);return; }
    if (/\b(aggiungi|inserisci|registra|crea)\b/.test(q) && /\b(nuovo )?(mezzo|veicolo|auto|macchina)\b/.test(q)) { navigateAfterSpeech('Certo. Apro subito la scheda per aggiungere un nuovo mezzo.','gestione-mezzi.html?tk=add');return; }
    if (await answerCommesse(q)) return;
    const asksDeadline = ['scadenz','scade','scadono','scadut','revisione','revisioni','assicurazione','bollo','tagliando'].some(word=>q.includes(word));
    const vehicleContext = ['mezzo','mezzi','veicol','auto','macchin','flotta','scadenz','revisione','revisioni'].some(word=>q.includes(word));
    if (asksDeadline && vehicleContext) {
      const wait='Controllo subito le scadenze dei mezzi.';addMessage(wait);await speak(wait);
      try {
        const due=expiringVehicles(await loadVehicles());
        if(!due.length){
          pendingFlow={type:'confirm-open-vehicles'};
          const reply='No, al momento non ci sono mezzi con scadenze previste nei prossimi 30 giorni. Vuoi che apra comunque la Gestione mezzi?';
          addMessage(reply);speak(reply);return;
        }
        const preview=due.slice(0,3).map(vehicleLabel).join('; '),more=due.length>3?` e altri ${due.length-3}`:'';
        navigateAfterSpeech(`Sì, ci sono ${due.length} mezzi con scadenze da controllare: ${preview}${more}. Ti apro la Gestione mezzi e ti mostro quelli in scadenza.`,'gestione-mezzi.html?tk=deadlines');
      } catch(error){
        console.error(error);
        pendingFlow={type:'confirm-open-vehicles'};
        const reply='Mi dispiace, in questo momento non riesco a controllare le scadenze. Vuoi che apra comunque la Gestione mezzi?';
        addMessage(reply);speak(reply);
      }
      return;
    }
    const destination = destinations.find(d => d.words.some(word => q.includes(word)));
    if (!destination) { const reply='Non ho ancora capito questa richiesta. Per ora posso aprire le principali sezioni del portale. Prova, ad esempio, con: apri i mezzi.'; addMessage(reply); speak(reply); return; }
    const reply = `Certo, apro subito ${destination.name}.`;
    navigateAfterSpeech(reply, destination.url);
  };
  document.getElementById('tkCommandForm').addEventListener('submit', e => { e.preventDefault(); processCommand(input.value); });
  overlay.querySelectorAll('[data-command]').forEach(b => b.addEventListener('click', () => processCommand(b.dataset.command)));

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    const recognition = new Recognition(); recognition.lang = 'it-IT'; recognition.interimResults = false; recognition.continuous = false;
    mic.addEventListener('click', () => { try { recognition.start(); mic.classList.add('listening'); document.getElementById('tkVoiceNote').textContent='Ti ascolto… parla adesso.'; } catch {} });
    recognition.onresult = e => { const command=e.results[0][0].transcript; input.value=command; processCommand(command); };
    recognition.onend = () => { mic.classList.remove('listening'); document.getElementById('tkVoiceNote').textContent='Premi il microfono per parlare di nuovo.'; };
    recognition.onerror = e => { mic.classList.remove('listening'); const msg=e.error==='not-allowed'?'Permesso del microfono non concesso. Puoi autorizzarlo dalle impostazioni del browser oppure scrivere il comando.':'Non sono riuscito a sentire il comando. Riprova o scrivilo.'; addMessage(msg); document.getElementById('tkVoiceNote').textContent=msg; };
  } else {
    mic.disabled = true; mic.style.opacity = '.45';
    document.getElementById('tkVoiceNote').textContent = 'Il riconoscimento vocale non è disponibile in questo browser. Puoi usare il campo di testo.';
  }
})();
