(() => {
  'use strict';
  const C = window.RG;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const waUrl = message => `https://wa.me/${C.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;

  // Populate restaurant facts, links, experiences and schema from content.js.
  $('#address').textContent = C.address;
  $('#footer-address').textContent = C.address;
  $('#footer-hours').textContent = C.hours;
  $('#year').textContent = new Date().getFullYear();
  $('#instagram-link').href = C.instagram;
  $('#order-online').href = C.orderUrl;
  $('#download-menu').href = C.menuPdf || '#menu';
  $('#download-menu').addEventListener('click', e => { if (!C.menuPdf) { e.preventDefault(); $('#menu').scrollIntoView({behavior:'smooth'}); $('#menu-body').insertAdjacentHTML('afterbegin','<div class="menu-empty download-note"><strong>Menu PDF coming soon</strong>Please check back or ask our team for the current menu.</div>'); } });
  $('#map-link').href = C.mapUrl;
  $('#call-button').href = `tel:${C.phones[0].replace(/\s/g,'')}`;
  $('#whatsapp-button').href = waUrl('Hello Red Ginger Eatery, I would like to enquire.');
  $('#mobile-call').href = `tel:${C.phones[0].replace(/\s/g,'')}`;
  $('#mobile-wa').href = waUrl('Hello Red Ginger Eatery, I would like to enquire.');
  $('#phone-list').innerHTML = C.phones.map(p => `<a href="tel:${esc(p.replace(/\s/g,''))}">${esc(p)}</a>`).join('');
  $('#footer-phones').innerHTML = C.phones.map(p => `<p><a href="tel:${esc(p.replace(/\s/g,''))}">${esc(p)}</a></p>`).join('');
  $('#restaurant-schema').textContent = JSON.stringify({
    '@context':'https://schema.org','@type':'Restaurant','name':C.name,'servesCuisine':['Indian','Pan-Asian'],
    'address':{'@type':'PostalAddress','streetAddress':'2nd Parklands Avenue, Parklands','addressLocality':'Nairobi','addressCountry':'KE'},
    'telephone':C.phones,'sameAs':[C.instagram],'url':location.href
  });

  // Experience cards are deliberately written as short invitations, not invented menu or venue claims.
  $('#experience-grid').innerHTML = C.experiences.map((x,i) => `<article class="experience-card reveal"><img src="${esc(x.image)}" alt="${esc(x.title)} at Red Ginger Eatery" loading="lazy"><div><p class="eyebrow">EXPERIENCE ${String(i+1).padStart(2,'0')}</p><h3>${esc(x.title)}</h3><p>${esc(x.copy)}</p><a href="${waUrl(`Hello Red Ginger Eatery, I would like to enquire about ${x.title}.`)}" target="_blank" rel="noreferrer">Enquire ↗</a></div></article>`).join('');

  // Menu categories, dish details, prices and tags are maintained in content.js.
  const categories = Object.keys(C.menu); let activeCategory = categories[0]; let vegOnly=false, spicyOnly=false, menuQuery='';
  $('#menu-tabs').innerHTML = categories.map((name,i)=>`<button class="tab" id="tab-${i}" role="tab" aria-selected="${i===0}" aria-controls="menu-body" tabindex="${i===0?0:-1}" data-category="${esc(name)}">${esc(name)}</button>`).join('');
  function renderMenu(){
    const dishes=C.menu[activeCategory]||[];
    const shown=dishes.filter(d=>(!menuQuery||`${d.name} ${d.description||''}`.toLowerCase().includes(menuQuery.toLowerCase()))&&(!vegOnly||(d.tags||[]).some(t=>/vegetarian|vegan/i.test(t)))&&(!spicyOnly||(d.tags||[]).some(t=>/spicy/i.test(t))));
    $('#menu-body').innerHTML = `<div class="filters"><label class="search-field">Search menu <input type="search" id="menu-search" placeholder="Find a dish…" value="${esc(menuQuery)}"></label><label><input type="checkbox" id="veg-filter" ${vegOnly?'checked':''}> Vegetarian</label><label><input type="checkbox" id="spicy-filter" ${spicyOnly?'checked':''}> Spicy</label></div>` + (shown.length ? `<div class="menu-list">${shown.map(d=>`<article class="dish"><div><h3>${esc(d.name)}</h3><p>${esc(d.description||'')}</p>${d.tags?.length?`<div class="tags">${d.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`:''}</div><span class="price">${esc(d.price||'')}</span></article>`).join('')}</div>` : `<div class="menu-empty"><strong>${dishes.length?'No dishes match these filters':esc(activeCategory)}</strong>${dishes.length?'Try changing a filter.':'Menu details will be added here when confirmed. Ask our team for the current selection.'}</div>`);
    $('#menu-search').addEventListener('input',e=>{const start=e.target.selectionStart;menuQuery=e.target.value;renderMenu();const field=$('#menu-search');field.focus();field.setSelectionRange(start,start)});
    $('#veg-filter').addEventListener('change',e=>{vegOnly=e.target.checked;renderMenu()});
    $('#spicy-filter').addEventListener('change',e=>{spicyOnly=e.target.checked;renderMenu()});
  }
  renderMenu();
  $$('.tab').forEach((tab,i)=>tab.addEventListener('click',()=>{activeCategory=tab.dataset.category;$$('.tab').forEach(t=>{t.setAttribute('aria-selected','false');t.tabIndex=-1});tab.setAttribute('aria-selected','true');tab.tabIndex=0;renderMenu()}));
  $('#menu-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const tabs=$$('.tab');let i=tabs.indexOf(document.activeElement);i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[i].focus();tabs[i].click()});

  // Header, section reveals and lightweight gallery lightbox.
  const header=$('#header'); const updateHeader=()=>header.classList.toggle('scrolled',scrollY>35);addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.12});
  const observeReveals=()=>$$('.reveal:not(.in-view)').forEach(el=>observer.observe(el));observeReveals();
  const expObserver=new MutationObserver(observeReveals);expObserver.observe($('#experience-grid'),{childList:true});
  const toggle=$('.menu-toggle');toggle.addEventListener('click',()=>{const open=header.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  $$('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));

  // Four short reservation steps; connect C.reservationEndpoint for backend delivery.
  const dialog=$('#booking'), bookingContent=$('#booking-content'); let step=0;
  const data={setting:'',date:'',time:'',party:2,name:'',phone:'+254 ',email:'',requests:''};
  const stepNames=['Choose your setting','Date, time & party size','Your details','Review & confirm'];
  function selectedSetting(value){data.setting=value;renderStep()}
  function stepHtml(){
    if(step===0)return `<h2>${stepNames[0]}</h2><p class="step-copy">Choose the atmosphere that feels right.</p><div class="choice-grid">${[['outdoor','Garden / Outdoor','assets/garden.webp'],['indoor','Indoor','assets/interior.webp']].map(([id,label,img])=>`<button type="button" class="choice ${data.setting===id?'selected':''}" data-choice="${id}" aria-pressed="${data.setting===id}"><img src="${img}" alt=""><span>${label}</span><i class="choice-radio"></i></button>`).join('')}</div><p class="booking-note">For larger groups, events or catering, <a href="${waUrl('Hello Red Ginger Eatery, I would like to enquire about a group booking or event.')}" target="_blank" rel="noreferrer">enquire with our team</a>.</p>`;
    if(step===1)return `<h2>${stepNames[1]}</h2><p class="step-copy">Choose your preferred date and time. Our team will confirm availability.</p><div class="form-grid"><div class="field"><label for="book-date">Preferred date</label><input id="book-date" type="date" min="${new Date().toISOString().slice(0,10)}" value="${esc(data.date)}"><span class="field-error" id="date-error"></span></div><div class="field"><label for="book-time">Preferred time</label><input id="book-time" type="time" value="${esc(data.time)}"><span class="field-error" id="time-error"></span></div><div class="field full"><label>Party size</label><div class="stepper"><button type="button" data-delta="-1" aria-label="Remove one guest">−</button><output>${data.party}</output><button type="button" data-delta="1" aria-label="Add one guest">+</button></div><span class="booking-note">For larger groups or events, please use our <a href="${waUrl('Hello Red Ginger Eatery, I would like to enquire about the Party Hall or a group booking.')}" target="_blank" rel="noreferrer">Party Hall enquiry</a>.</span></div></div>`;
    if(step===2)return `<h2>${stepNames[2]}</h2><p class="step-copy">Just the essentials. We’ll use these details to follow up about your request.</p><div class="form-grid"><div class="field"><label for="guest-name">Your name</label><input id="guest-name" autocomplete="name" value="${esc(data.name)}"><span class="field-error" id="name-error"></span></div><div class="field"><label for="guest-phone">Phone number</label><input id="guest-phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(data.phone)}"><span class="field-error" id="phone-error"></span></div><div class="field full"><label for="guest-email">Email <span style="color:#827a70">(optional)</span></label><input id="guest-email" type="email" autocomplete="email" value="${esc(data.email)}"><span class="field-error" id="email-error"></span></div><div class="field full"><label for="guest-requests">Anything we should know? <span style="color:#827a70">(optional)</span></label><textarea id="guest-requests" placeholder="Occasion, dietary needs, high chair…">${esc(data.requests)}</textarea></div></div>`;
    return `<h2>${step===3?'Review your request':'You’re all set.'}</h2><p class="step-copy">${step===3?'Check the details before sending your booking request.':'Thank you, '+esc(data.name)+'. Your request is ready to send to Red Ginger.'}</p><div class="summary"><div><span>Setting</span><strong>${data.setting==='outdoor'?'Garden / Outdoor':'Indoor'}</strong></div><div><span>Date</span><strong>${esc(new Date(data.date+'T00:00:00').toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric'}))}</strong></div><div><span>Preferred time</span><strong>${esc(data.time)}</strong></div><div><span>Party size</span><strong>${data.party} ${data.party===1?'guest':'guests'}</strong></div><div><span>Name</span><strong>${esc(data.name)}</strong></div><div><span>Phone</span><strong>${esc(data.phone)}</strong></div></div>${step===4?`<div class="confirm-buttons"><a class="button button-red" id="confirm-wa" target="_blank" rel="noreferrer">Confirm on WhatsApp <span>↗</span></a><button class="button button-outline" id="calendar-button">Add to calendar <span>＋</span></button></div><p class="booking-note">Your preferred date and time are a request. The restaurant will confirm availability with you.</p>`:`<p class="booking-note">${data.requests?`Note: ${esc(data.requests)}`:'Our team will confirm availability with you.'}</p>`}`;
  }
  function renderStep(){
    $('#step-number').textContent=String(Math.min(step+1,4)).padStart(2,'0');$('.progress-fill').style.width=`${Math.min(step+1,4)*25}%`;
    bookingContent.innerHTML=stepHtml()+ (step<4?`<div class="booking-actions">${step>0?'<button class="button button-outline" data-back>← Back</button>':'<span></span>'}<button class="button button-red" data-next>${step===3?'Send booking request':'Continue'} <span>→</span></button></div>`:'');
    $$('[data-choice]',bookingContent).forEach(b=>b.addEventListener('click',()=>selectedSetting(b.dataset.choice)));
    $$('[data-delta]',bookingContent).forEach(b=>b.addEventListener('click',()=>{data.party=Math.max(1,Math.min(50,data.party+Number(b.dataset.delta)));renderStep()}));
    $('[data-back]',bookingContent)?.addEventListener('click',()=>{step=Math.max(0,step-1);renderStep()});
    $('[data-next]',bookingContent)?.addEventListener('click',nextStep);
    if(step===1){$('#book-date').addEventListener('input',e=>data.date=e.target.value);$('#book-time').addEventListener('input',e=>data.time=e.target.value)}
    if(step===2){$('#guest-name').addEventListener('input',e=>data.name=e.target.value);$('#guest-phone').addEventListener('input',e=>data.phone=e.target.value);$('#guest-email').addEventListener('input',e=>data.email=e.target.value);$('#guest-requests').addEventListener('input',e=>data.requests=e.target.value)}
    if(step===4){$('#confirm-wa').href=waUrl(bookingMessage());$('#calendar-button').addEventListener('click',downloadCalendar)}
  }
  function showError(id,text){const el=$('#'+id);if(el)el.textContent=text}
  function nextStep(){
    if(step===0&&!data.setting){bookingContent.insertAdjacentHTML('beforeend','<p class="booking-error" role="alert">Choose a setting to continue.</p>');return}
    if(step===1){data.date=$('#book-date').value;data.time=$('#book-time').value;let bad=false;if(!data.date){showError('date-error','Choose a preferred date.');bad=true}if(!data.time){showError('time-error','Choose a preferred time.');bad=true}if(bad)return}
    if(step===2){data.name=$('#guest-name').value.trim();data.phone=$('#guest-phone').value.trim();data.email=$('#guest-email').value.trim();data.requests=$('#guest-requests').value.trim();let bad=false;if(data.name.length<2){showError('name-error','Please enter your name.');bad=true}if(data.phone.replace(/\D/g,'').length<9){showError('phone-error','Please check this phone number.');bad=true}if(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){showError('email-error','Please check this email address.');bad=true}if(bad)return}
    if(step===3){submitReservation();step=4;renderStep();return}
    step++;renderStep();
  }
  function bookingMessage(){return `Hello Red Ginger Eatery, I would like to confirm my table request:\nSetting: ${data.setting==='outdoor'?'Garden / Outdoor':'Indoor'}\nPreferred date: ${data.date}\nPreferred time: ${data.time}\nParty size: ${data.party}\nName: ${data.name}\nPhone: ${data.phone}${data.email?'\nEmail: '+data.email:''}${data.requests?'\nRequests: '+data.requests:''}`}
  async function submitReservation(){
    if(C.reservationEndpoint){try{await fetch(C.reservationEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,createdAt:new Date().toISOString()})})}catch(err){console.warn('Reservation endpoint could not be reached; WhatsApp fallback remains available.',err)}}
  }
  function downloadCalendar(){const start=new Date(`${data.date}T${data.time}:00`);const fmt=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const escapeICS=s=>String(s).replace(/\\/g,'\\\\').replace(/,/g,'\\,').replace(/;/g,'\\;').replace(/\n/g,'\\n');const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Red Ginger Eatery//Reservation//EN\r\nBEGIN:VEVENT\r\nUID:${Date.now()}@redgingereatery\r\nDTSTAMP:${fmt(new Date())}\r\nDTSTART:${fmt(start)}\r\nSUMMARY:${escapeICS('Table request · Red Ginger Eatery')}\r\nLOCATION:${escapeICS(C.address)}\r\nDESCRIPTION:${escapeICS(bookingMessage())}\r\nEND:VEVENT\r\nEND:VCALENDAR`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='red-ginger-table-request.ics';a.click();URL.revokeObjectURL(a.href)}

  function openBooking(setting=''){Object.assign(data,{setting:setting||'',date:'',time:'',party:2,name:'',phone:'+254 ',email:'',requests:''});step=0;renderStep();dialog.showModal();document.body.style.overflow='hidden'}
  $$('[data-book]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openBooking()}));
  $$('[data-setting]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openBooking(a.dataset.setting)}));
  $('.dialog-close').addEventListener('click',()=>{dialog.close();document.body.style.overflow=''});
  dialog.addEventListener('click',e=>{if(e.target===dialog){dialog.close();document.body.style.overflow=''}});
  dialog.addEventListener('close',()=>document.body.style.overflow='');
})();
