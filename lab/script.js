/**
 * Break BioLock — Interactive Security Challenge Engine
 * Flow: Curious → Attack → Modify → Wait → "Oh, it caught me."
 * Technical core: Web Crypto ECDSA / P-256 (SHA256withECDSA) canonical binding.
 */

(function () {
  'use strict';

  // --- Sound Haptics (Web Audio API Synthesizer) ---
  let audioCtx = null;
  let soundEnabled = true;

  function playTone(freq, type, duration, gainVal = 0.08) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  function playClick() { playTone(880, 'sine', 0.05, 0.04); }
  function playTransmit() { playTone(440, 'triangle', 0.12, 0.06); }
  function playFail() {
    playTone(180, 'sawtooth', 0.22, 0.08);
    setTimeout(() => playTone(120, 'sawtooth', 0.28, 0.09), 90);
  }

  // --- Game State ---
  const state = {
    mission: 1, // 1: Amount, 2: Payee, 3: Token Swap
    keyPair: null,
    
    // Original legitimate transaction
    origTx: {
      id: 'tx_8f91c2d0-e14b',
      amount: 2500.00,
      payee: 'merchant@pay.example',
      nonce: '8F91C2D4A3',
      timestamp: 1775480000000
    },

    // Attacker's in-flight modified transaction
    currentAttack: {
      type: 'amount',
      val: '25000'
    },

    // Mission 3 chosen token (default: swapped token authB)
    m3SelectedToken: 'authB'
  };

  // --- Web Crypto Engine ---
  async function initCrypto() {
    try {
      if (window.crypto && window.crypto.subtle) {
        state.keyPair = await window.crypto.subtle.generateKey(
          { name: 'ECDSA', namedCurve: 'P-256' },
          false,
          ['sign', 'verify']
        );
      }
    } catch (e) {
      console.warn('Crypto fallback active');
    }
  }

  // --- DOM Elements ---
  const screens = {
    landing: document.getElementById('screen-landing'),
    attack: document.getElementById('screen-attack'),
    suspense: document.getElementById('screen-suspense'),
    caught: document.getElementById('screen-caught'),
    mission3: document.getElementById('screen-mission3')
  };

  function showScreen(name) {
    Object.keys(screens).forEach(k => {
      if (screens[k]) screens[k].classList.remove('active');
    });
    if (screens[name]) screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Screen 2: Attack Setup ---
  function setupMission(num) {
    state.mission = num;
    document.querySelectorAll('.mission-tab').forEach(tab => {
      tab.classList.toggle('active', parseInt(tab.dataset.mission, 10) === num);
    });

    if (num === 1) {
      // 01: Inflate Amount (Numbered, professional typography)
      state.currentAttack = { type: 'amount', val: '25000' };
      renderAttackChoices([
        { idx: '01', title: 'INFLATE 10×', val: '25000', badge: '₹25,000' },
        { idx: '02', title: 'INFLATE 20×', val: '50000', badge: '₹50,000' },
        { idx: '03', title: 'OVERRIDE LIMIT', val: '99999', badge: '₹99,999' }
      ], 'Inflate the payment amount:');
      updatePaymentCard();
      showScreen('attack');
    } else if (num === 2) {
      // 02: Divert Payee (Numbered, professional typography)
      state.currentAttack = { type: 'payee', val: 'attacker@wallet.example' };
      renderAttackChoices([
        { idx: '01', title: 'DIVERT TO ATTACKER WALLET', val: 'attacker@wallet.example', badge: 'attacker@wallet' },
        { idx: '02', title: 'REROUTE TO SHADOW ESCROW', val: 'shadow.escrow@crypto.xyz', badge: 'shadow.escrow' },
        { idx: '03', title: 'INJECT CLONE RECIPIENT', val: 'merchant.fake@pay.example', badge: 'merchant.fake' }
      ], 'Redirect the payment recipient:');
      updatePaymentCard();
      showScreen('attack');
    } else if (num === 3) {
      // 03: Token Swap Interactive Challenge
      setupMission3();
      showScreen('mission3');
    }
  }

  function renderAttackChoices(choices, promptText) {
    const promptEl = document.getElementById('attack-prompt-question');
    if (promptEl) promptEl.textContent = promptText;

    const list = document.getElementById('attack-choices');
    if (!list) return;

    list.innerHTML = '';
    choices.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `attack-choice-btn ${i === 0 ? 'selected' : ''}`;
      btn.dataset.val = c.val;
      btn.innerHTML = `
        <div>
          <span class="choice-idx">${c.idx}</span>
          <span class="choice-title">${c.title}</span>
        </div>
        <span class="choice-amount">${c.badge}</span>
      `;
      btn.addEventListener('click', () => {
        playClick();
        document.querySelectorAll('.attack-choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.currentAttack.val = c.val;
        updatePaymentCard();
      });
      list.appendChild(btn);
    });
  }

  function updatePaymentCard() {
    const dispAmount = document.getElementById('display-amount');
    const dispPayee = document.getElementById('display-payee');
    const rowAmount = document.getElementById('row-amount');
    const rowPayee = document.getElementById('row-payee');
    const badge = document.getElementById('tx-badge');

    if (!dispAmount || !dispPayee) return;

    if (state.currentAttack.type === 'amount') {
      const num = Number(state.currentAttack.val).toLocaleString();
      dispAmount.innerHTML = `<span class="crossed">₹2,500</span> <span class="hacked">₹${num}</span>`;
      dispPayee.textContent = state.origTx.payee;
      rowAmount.classList.add('tampered');
      rowPayee.classList.remove('tampered');
    } else if (state.currentAttack.type === 'payee') {
      dispAmount.textContent = '₹2,500';
      dispPayee.innerHTML = `<span class="crossed">${state.origTx.payee}</span> <span class="hacked">${state.currentAttack.val}</span>`;
      rowAmount.classList.remove('tampered');
      rowPayee.classList.add('tampered');
    }

    if (badge) {
      badge.textContent = '● TAMPER INJECTED';
      badge.className = 'badge-tag badge-red';
    }
  }

  // --- Screen 3: Suspense & Verification ---
  async function transmitAttack() {
    playTransmit();
    showScreen('suspense');

    const origEl = document.getElementById('suspense-orig');
    const modEl = document.getElementById('suspense-mod');
    const statusEl = document.getElementById('suspense-status');

    if (state.currentAttack.type === 'amount') {
      if (origEl) origEl.textContent = '₹2,500';
      if (modEl) modEl.textContent = `₹${Number(state.currentAttack.val).toLocaleString()}`;
    } else {
      if (origEl) origEl.textContent = 'merchant@pay.example';
      if (modEl) modEl.textContent = state.currentAttack.val;
    }

    if (statusEl) statusEl.textContent = 'TRANSMITTING TO SETTLEMENT SERVER...';
    await wait(450);

    if (statusEl) statusEl.textContent = 'VALIDATING CRYPTOGRAPHIC ECDSA SEAL...';
    await wait(450);

    if (statusEl) statusEl.textContent = 'COMPARING CANONICAL HASHES...';
    await wait(400);

    // BUSTED!
    playFail();
    showCaughtScreen();
  }

  // --- Screen 4: Caught & Why It Failed ---
  function showCaughtScreen() {
    showScreen('caught');

    const summaryEl = document.getElementById('caught-summary');
    const formulaEl = document.getElementById('tech-formula-str');
    const nextBtn = document.getElementById('btn-next-step');

    if (state.currentAttack.type === 'amount') {
      const hackedNum = Number(state.currentAttack.val).toLocaleString();
      if (summaryEl) {
        summaryEl.innerHTML = `
          <p><strong>What you tried:</strong> You altered the transaction amount from <code>₹2,500</code> to <code>₹${hackedNum}</code>.</p>
          <p style="margin-top: 10px;"><strong>Why you got caught:</strong> The sender's device signed a cryptographic fingerprint bound strictly to <code>₹2,500</code>. When your tampered transfer arrived at the server, the signature failed verification. <strong>BioLock immediately blocked the transaction.</strong></p>
        `;
      }
      if (formulaEl) {
        formulaEl.innerHTML = `tx_8f91c2d0-e14b | <span style="color: var(--status-danger); font-weight: 700;">${Number(state.currentAttack.val).toFixed(2)}</span> | merchant@pay.example | 8F91C2D4A3 | 1775480000000`;
      }
      if (nextBtn) {
        nextBtn.textContent = 'TRY ATTACK 02: REDIRECT PAYEE →';
        nextBtn.onclick = () => setupMission(2);
      }
    } else if (state.currentAttack.type === 'payee') {
      if (summaryEl) {
        summaryEl.innerHTML = `
          <p><strong>What you tried:</strong> You attempted a man-in-the-middle reroute, changing the recipient from <code>merchant@pay.example</code> to <code>${state.currentAttack.val}</code>.</p>
          <p style="margin-top: 10px;"><strong>Why you got caught:</strong> In BioLock, the recipient UPI address is an explicit parameter in the signed canonical payload. Changing the payee broke the ECDSA verification signature. <strong>Funds remained safe.</strong></p>
        `;
      }
      if (formulaEl) {
        formulaEl.innerHTML = `tx_8f91c2d0-e14b | 2500.00 | <span style="color: var(--status-danger); font-weight: 700;">${state.currentAttack.val}</span> | 8F91C2D4A3 | 1775480000000`;
      }
      if (nextBtn) {
        nextBtn.textContent = 'MISSION 03: CAN YOU SWAP TOKENS? →';
        nextBtn.onclick = () => setupMission(3);
      }
    }
  }

  // --- Screen 5: Mission 3 (Interactive Token Swap Challenge) ---
  function setupMission3() {
    state.m3SelectedToken = 'authB'; // default to swapped token for attack
    const resPanel = document.getElementById('m3-result-panel');
    if (resPanel) resPanel.className = 'm3-result-box'; // hidden

    const tokenLegit = document.getElementById('m3-token-legit');
    const tokenSwapped = document.getElementById('m3-token-swapped');
    if (tokenLegit) tokenLegit.classList.remove('selected');
    if (tokenSwapped) tokenSwapped.classList.add('selected');
  }

  function executeMission3Swap() {
    playTransmit();
    const resPanel = document.getElementById('m3-result-panel');
    const titleEl = document.getElementById('m3-res-title');
    const badgeEl = document.getElementById('m3-res-badge');
    const tableEl = document.getElementById('m3-diff-table');
    const descEl = document.getElementById('m3-res-desc');

    if (!resPanel || !titleEl) return;

    if (state.m3SelectedToken === 'authB') {
      // Mismatched token attached (Attacker swap attempt)
      playFail();
      resPanel.className = 'm3-result-box mismatch-state';
      titleEl.textContent = 'AUTHORIZATION MISMATCH';
      titleEl.style.color = 'var(--status-danger)';
      badgeEl.textContent = '✕ BLOCKED';
      badgeEl.className = 'badge-tag badge-red';

      tableEl.innerHTML = `
        <tr><td style="color: var(--text-muted);">TARGET TRANSACTION</td><td>Utility Bill (₹1,200) · Nonce 4A1B8F</td></tr>
        <tr><td style="color: var(--text-muted);">ATTACHED AUTHORIZATION</td><td style="color: var(--status-danger);">Auth #2 (Signed for ₹8,500 · Nonce 9C2D1E)</td></tr>
        <tr><td style="color: var(--text-muted);">CRYPTOGRAPHIC EVALUATION</td><td style="color: var(--status-danger); font-weight: 700;">PAYLOAD HASH MISMATCH (FAIL-CLOSED)</td></tr>
      `;

      descEl.innerHTML = `
        <strong>Token Swap Thwarted:</strong> You tried to steal the authorization generated for an ₹8,500 electronics order and attach it to the ₹1,200 utility bill. Because BioLock signs the exact transaction amount and random challenge nonce into the ECDSA signature, replaying or swapping tokens fails closed immediately.
      `;
    } else {
      // Legitimate token attached
      playTone(587, 'sine', 0.15, 0.08);
      resPanel.className = 'm3-result-box matched-state';
      titleEl.textContent = 'AUTHORIZATION BOUND ✓';
      titleEl.style.color = 'var(--status-success)';
      badgeEl.textContent = '✓ VERIFIED';
      badgeEl.className = 'badge-tag badge-green';

      tableEl.innerHTML = `
        <tr><td style="color: var(--text-muted);">TARGET TRANSACTION</td><td>Utility Bill (₹1,200) · Nonce 4A1B8F</td></tr>
        <tr><td style="color: var(--text-muted);">ATTACHED AUTHORIZATION</td><td style="color: var(--status-success);">Auth #1 (Signed for ₹1,200 · Nonce 4A1B8F)</td></tr>
        <tr><td style="color: var(--text-muted);">CRYPTOGRAPHIC EVALUATION</td><td style="color: var(--status-success); font-weight: 700;">ECDSA P-256 SIGNATURE VALID</td></tr>
      `;

      descEl.innerHTML = `
        <strong>Legitimate Match:</strong> The authorization token was cryptographically constructed over this exact transaction payload and challenge nonce. Signature verification succeeded.
      `;
    }
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // --- Setup Event Listeners ---
  function initListeners() {
    // Start button
    const startBtn = document.getElementById('btn-start-intercept');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        playClick();
        setupMission(1);
      });
    }

    // Transmit button
    const transmitBtn = document.getElementById('btn-transmit');
    if (transmitBtn) {
      transmitBtn.addEventListener('click', transmitAttack);
    }

    // Retry step
    const retryBtn = document.getElementById('btn-retry-step');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        playClick();
        showScreen('attack');
      });
    }

    // Mission tabs
    document.querySelectorAll('.mission-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        playClick();
        setupMission(parseInt(tab.dataset.mission, 10));
      });
    });

    // Sound toggle
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.textContent = soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
      });
    }

    // Modal Drawer
    const archBtn = document.getElementById('btn-open-arch');
    const closeBtn = document.getElementById('btn-close-arch');
    const modal = document.getElementById('arch-modal');

    if (archBtn && modal) {
      archBtn.addEventListener('click', () => {
        playClick();
        modal.classList.add('open');
      });
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    // Mission 3 Token Selectors
    const tokenLegit = document.getElementById('m3-token-legit');
    const tokenSwapped = document.getElementById('m3-token-swapped');
    const btnAttachAuth = document.getElementById('btn-attach-auth');

    if (tokenLegit) {
      tokenLegit.addEventListener('click', () => {
        playClick();
        tokenLegit.classList.add('selected');
        if (tokenSwapped) tokenSwapped.classList.remove('selected');
        state.m3SelectedToken = 'authA';
      });
    }

    if (tokenSwapped) {
      tokenSwapped.addEventListener('click', () => {
        playClick();
        tokenSwapped.classList.add('selected');
        if (tokenLegit) tokenLegit.classList.remove('selected');
        state.m3SelectedToken = 'authB';
      });
    }

    if (btnAttachAuth) {
      btnAttachAuth.addEventListener('click', executeMission3Swap);
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    initListeners();
    await initCrypto();
    showScreen('landing');
  });

})();
