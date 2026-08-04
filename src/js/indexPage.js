// 注音ナビ ランディングページ用制御 (完全静的スタンドアロン対応)
document.addEventListener('DOMContentLoaded', () => {
  const demoGrid = document.getElementById('vowel-demo-grid');
  
  if (demoGrid && window.VOWELS_STEP1_DATA && window.VOWELS_STEP2_DATA) {
    const demoData = [...window.VOWELS_STEP1_DATA, ...window.VOWELS_STEP2_DATA];

    demoGrid.innerHTML = demoData.map(item => `
      <div class="demo-card" data-symbol="${item.symbol}">
        <span class="step-badge" style="font-size: 0.65rem; padding: 1px 4px; margin-bottom: 2px;">${item.typeTag.split(' ')[0]}</span>
        <div class="demo-symbol">${item.symbol}</div>
        <div class="demo-pinyin">${item.pinyin}</div>
        <div style="font-size: 0.8rem; color: #64748B; margin-top: 2px;">${item.katakana}</div>
        <div class="demo-audio-icon" style="margin-top: 4px;">
          🔊
        </div>
      </div>
    `).join('');

    demoGrid.querySelectorAll('.demo-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const symbol = card.getAttribute('data-symbol');
        if (window.playZhuyinSound) {
          window.playZhuyinSound(symbol);
        }
        
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      });
    });
  }
});
