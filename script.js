async function loadData() {
  try {
    const response = await fetch('data-token.json'); 
    let data = await response.json();

    if (!Array.isArray(data)) {
      data = Object.values(data);
    }

    const container = document.getElementById('data-container');
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerHTML = '<p>Tidak ada token baru yang memenuhi syarat.</p>';
    } else {
      data.forEach(token => {
        const div = document.createElement('div');
        div.className = 'token';
        div.innerHTML = `
          <div class="judul">${token.name || 'Token Tanpa Nama'}</div>
          <div class="detail">
            Address: ${token.address || '-'}
            <button class="copy-button" onclick="copyText('${token.address}')">Copy</button>
          </div>
          <div class="detail">Tanggal Launching: ${token.launchDate || '-'}</div>
          <div class="detail">Jumlah Liquidity: ${token.liquidity || '-'}</div>
          <div class="detail">
            Follower: <a href="${token.socialLink || '#'}" target="_blank">${token.followers || '-'}</a>
          </div>
          <div class="detail">Jumlah Buyer: ${token.buyers || '-'}</div>
          <div class="detail">Jumlah Seller: ${token.sellers || '-'}</div>
          <div class="detail">Persentase Holder: ${token.holderPercentage || '-'}</div>
          <div class="detail">Jumlah Whale: ${token.whale || '-'} (Dana: ${token.whaleAmount || '-'})</div>
          <div class="detail">Website: <a href="${token.website || '#'}" target="_blank">${token.website || '-'}</a></div>
          <div class="detail">Jumlah # di Twitter: ${token.twitterHashtag || '-'}</div>
          <div class="detail">Update Terakhir: ${token.lastUpdate || '-'}</div>
        `;
        container.appendChild(div);
      });
    }

    const updateTime = document.getElementById('updateTime');
    updateTime.innerHTML = `Terakhir update: ${new Date().toLocaleString()}`;

  } catch (error) {
    console.error('Gagal memuat data token:', error);
    document.getElementById('data-container').innerHTML = '<p>Gagal memuat data token.</p>';
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Address berhasil disalin!');
  }).catch(err => {
    console.error('Gagal menyalin:', err);
  });
}

loadData();