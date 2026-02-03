// =====================================
// Static My Page Lite - Bookmarks Only
// =====================================

// グローバル変数
let currentEditingSectionId = null;
let draggedLinkIndex = null;

// =====================================
// 初期化
// =====================================

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  loadData();
  renderAll();
  setupEventListeners();
}

function setupEventListeners() {
  // モーダル外クリックで閉じる
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  };

  // Escキーでモーダルを閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
}

// =====================================
// データ管理
// =====================================

function getDefaultData() {
  return {
    title: 'My Bookmarks',
    sections: {
      'section1': { name: 'セクション1', links: [] },
      'section2': { name: 'セクション2', links: [] },
      'section3': { name: 'セクション3', links: [] },
      'section4': { name: 'セクション4', links: [] },
      'section5': { name: 'セクション5', links: [] },
      'section6': { name: 'セクション6', links: [] }
    },
    headerLinks: []
  };
}

function loadData() {
  const data = storageManager.get('liteData');
  if (!data) {
    const defaultData = getDefaultData();
    saveData(defaultData);
    return defaultData;
  }
  return data;
}

function saveData(data) {
  storageManager.set('liteData', data, true);
}

function getData() {
  return loadData();
}

// =====================================
// 全体の描画
// =====================================

function renderAll() {
  const data = getData();

  // タイトル
  document.getElementById('main-title').textContent = data.title || 'My Bookmarks';

  // 各セクション
  const sectionIds = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
  sectionIds.forEach(sectionId => {
    renderSection(sectionId);
  });

  // ヘッダーリンク
  renderHeaderLinks();
}

function renderSection(sectionId) {
  const data = getData();
  const section = data.sections[sectionId];

  if (!section) return;

  // セクション名
  const titleElement = document.querySelector(`#${sectionId} .section-title-text`);
  if (titleElement) {
    titleElement.textContent = section.name;
  }

  // リンク一覧
  const linkGrid = document.querySelector(`#${sectionId} .link-grid`);
  if (!linkGrid) return;

  linkGrid.innerHTML = '';

  if (!section.links || section.links.length === 0) {
    linkGrid.innerHTML = '<p class="empty-message">リンクがありません</p>';
    return;
  }

  section.links.forEach((link, index) => {
    const linkElement = createLinkElement(link, sectionId, index);
    linkGrid.appendChild(linkElement);
  });
}

function createLinkElement(link, sectionId, index) {
  const div = document.createElement('div');
  div.className = 'link-item' + (link.inline ? ' inline' : '');

  const a = document.createElement('a');
  a.href = link.url;
  a.textContent = link.text;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  div.appendChild(a);
  return div;
}

// =====================================
// タイトル編集
// =====================================

function editMainTitle() {
  const titleElement = document.getElementById('main-title');
  const inputElement = document.getElementById('main-title-input');

  inputElement.value = titleElement.textContent;
  titleElement.style.display = 'none';
  inputElement.style.display = 'inline-block';
  inputElement.focus();
  inputElement.select();
}

function saveMainTitle() {
  const titleElement = document.getElementById('main-title');
  const inputElement = document.getElementById('main-title-input');

  const newTitle = inputElement.value.trim();
  if (newTitle) {
    const data = getData();
    data.title = newTitle;
    saveData(data);
    titleElement.textContent = newTitle;
  }

  inputElement.style.display = 'none';
  titleElement.style.display = 'inline-block';
}

function handleMainTitleKeypress(event) {
  if (event.key === 'Enter') {
    saveMainTitle();
  }
}

// =====================================
// セクション名編集
// =====================================

function editSectionName(sectionId) {
  const titleElement = document.querySelector(`#${sectionId} .section-title-text`);
  const inputElement = document.getElementById(`${sectionId}-input`);

  if (!titleElement || !inputElement) return;

  inputElement.value = titleElement.textContent;
  titleElement.style.display = 'none';
  inputElement.style.display = 'inline-block';
  inputElement.focus();
  inputElement.select();
}

function saveSectionName(sectionId) {
  const titleElement = document.querySelector(`#${sectionId} .section-title-text`);
  const inputElement = document.getElementById(`${sectionId}-input`);

  if (!titleElement || !inputElement) return;

  const newName = inputElement.value.trim();
  if (newName) {
    const data = getData();
    if (data.sections[sectionId]) {
      data.sections[sectionId].name = newName;
      saveData(data);
      titleElement.textContent = newName;
    }
  }

  inputElement.style.display = 'none';
  titleElement.style.display = 'inline-block';
}

// =====================================
// リンク編集モーダル
// =====================================

function editLinks(sectionId) {
  currentEditingSectionId = sectionId;
  const data = getData();
  const section = data.sections[sectionId];

  if (!section) return;

  // セクション名
  document.getElementById('edit-section-name').value = section.name;

  // リンク一覧を描画
  renderModalLinksList();

  // モーダルを開く
  openModal('edit-links-modal');
}

function renderModalLinksList() {
  const data = getData();
  const section = data.sections[currentEditingSectionId];
  const listContainer = document.getElementById('modal-links-list');

  if (!section || !listContainer) return;

  listContainer.innerHTML = '';

  if (!section.links || section.links.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">リンクがありません</p>';
    return;
  }

  section.links.forEach((link, index) => {
    const linkItem = createModalLinkItem(link, index);
    listContainer.appendChild(linkItem);
  });
}

function createModalLinkItem(link, index) {
  const div = document.createElement('div');
  div.className = 'link-item-edit';
  div.draggable = true;
  div.dataset.index = index;

  // ドラッグイベント
  div.addEventListener('dragstart', handleDragStart);
  div.addEventListener('dragover', handleDragOver);
  div.addEventListener('drop', handleDrop);
  div.addEventListener('dragend', handleDragEnd);

  div.innerHTML = `
    <div class="link-drag-handle" title="ドラッグして並び替え">☰</div>
    <div class="link-edit-fields">
      <input type="text" class="input-field link-text-input" value="${escapeHtml(link.text)}" placeholder="リンク名" data-index="${index}" data-field="text" />
      <input type="text" class="input-field link-url-input" value="${escapeHtml(link.url)}" placeholder="URL" data-index="${index}" data-field="url" />
    </div>
    <div class="link-edit-actions">
      <label class="inline-checkbox">
        <input type="checkbox" ${link.inline ? 'checked' : ''} onchange="toggleInlineMode(${index})">
        <span>1行表示</span>
      </label>
      <button class="btn btn-danger btn-sm" onclick="deleteLink(${index})">削除</button>
    </div>
  `;

  // リアルタイム保存
  const inputs = div.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      updateLinkField(this.dataset.index, this.dataset.field, this.value);
    });
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        this.blur();
      }
    });
  });

  return div;
}

function updateLinkField(index, field, value) {
  const data = getData();
  const section = data.sections[currentEditingSectionId];

  if (!section || !section.links[index]) return;

  section.links[index][field] = value;
  saveData(data);
  renderSection(currentEditingSectionId);
}

function saveEditedSectionName() {
  const newName = document.getElementById('edit-section-name').value.trim();

  if (!newName) {
    alert('セクション名を入力してください');
    return;
  }

  const data = getData();
  if (data.sections[currentEditingSectionId]) {
    data.sections[currentEditingSectionId].name = newName;
    saveData(data);
    renderSection(currentEditingSectionId);
  }
}

function addLink() {
  const data = getData();
  const section = data.sections[currentEditingSectionId];

  if (!section) return;

  if (!section.links) {
    section.links = [];
  }

  section.links.push({
    text: '新しいリンク',
    url: 'https://example.com',
    inline: false
  });

  saveData(data);
  renderModalLinksList();
  renderSection(currentEditingSectionId);
}

function deleteLink(index) {
  if (!confirm('このリンクを削除しますか？')) return;

  const data = getData();
  const section = data.sections[currentEditingSectionId];

  if (!section || !section.links) return;

  section.links.splice(index, 1);
  saveData(data);
  renderModalLinksList();
  renderSection(currentEditingSectionId);
}

function toggleInlineMode(index) {
  const data = getData();
  const section = data.sections[currentEditingSectionId];

  if (!section || !section.links[index]) return;

  section.links[index].inline = !section.links[index].inline;
  saveData(data);
  renderSection(currentEditingSectionId);
}

// =====================================
// ドラッグ&ドロップ
// =====================================

function handleDragStart(e) {
  draggedLinkIndex = parseInt(e.target.dataset.index);
  e.target.style.opacity = '0.4';
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  const dropIndex = parseInt(e.target.closest('.link-item-edit').dataset.index);

  if (draggedLinkIndex !== dropIndex) {
    const data = getData();
    const section = data.sections[currentEditingSectionId];

    if (!section || !section.links) return false;

    const draggedItem = section.links[draggedLinkIndex];
    section.links.splice(draggedLinkIndex, 1);
    section.links.splice(dropIndex, 0, draggedItem);

    saveData(data);
    renderModalLinksList();
    renderSection(currentEditingSectionId);
  }

  return false;
}

function handleDragEnd(e) {
  e.target.style.opacity = '1';
}

// =====================================
// ヘッダーリンク
// =====================================

function renderHeaderLinks() {
  const data = getData();
  const container = document.getElementById('header-links-container');

  if (!container) return;

  container.innerHTML = '';

  if (!data.headerLinks || data.headerLinks.length === 0) return;

  data.headerLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.text;
    a.className = 'header-link';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    container.appendChild(a);
  });
}

function editHeaderLinks() {
  renderHeaderLinksList();
  openModal('edit-header-links-modal');
}

function renderHeaderLinksList() {
  const data = getData();
  const listContainer = document.getElementById('header-links-list');

  if (!listContainer) return;

  listContainer.innerHTML = '';

  if (!data.headerLinks || data.headerLinks.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">ヘッダーリンクがありません</p>';
    return;
  }

  data.headerLinks.forEach((link, index) => {
    const linkItem = createHeaderLinkItem(link, index);
    listContainer.appendChild(linkItem);
  });
}

function createHeaderLinkItem(link, index) {
  const div = document.createElement('div');
  div.className = 'link-item-edit';

  div.innerHTML = `
    <div class="link-edit-fields">
      <input type="text" class="input-field link-text-input" value="${escapeHtml(link.text)}" placeholder="リンク名" data-index="${index}" data-field="text" />
      <input type="text" class="input-field link-url-input" value="${escapeHtml(link.url)}" placeholder="URL" data-index="${index}" data-field="url" />
    </div>
    <div class="link-edit-actions">
      <button class="btn btn-danger btn-sm" onclick="deleteHeaderLink(${index})">削除</button>
    </div>
  `;

  // リアルタイム保存
  const inputs = div.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      updateHeaderLinkField(this.dataset.index, this.dataset.field, this.value);
    });
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        this.blur();
      }
    });
  });

  return div;
}

function updateHeaderLinkField(index, field, value) {
  const data = getData();

  if (!data.headerLinks[index]) return;

  data.headerLinks[index][field] = value;
  saveData(data);
  renderHeaderLinks();
}

function addHeaderLink() {
  const data = getData();

  if (!data.headerLinks) {
    data.headerLinks = [];
  }

  data.headerLinks.push({
    text: '新しいリンク',
    url: 'https://example.com'
  });

  saveData(data);
  renderHeaderLinksList();
  renderHeaderLinks();
}

function deleteHeaderLink(index) {
  if (!confirm('このヘッダーリンクを削除しますか？')) return;

  const data = getData();

  if (!data.headerLinks) return;

  data.headerLinks.splice(index, 1);
  saveData(data);
  renderHeaderLinksList();
  renderHeaderLinks();
}

// =====================================
// データインポート/エクスポート
// =====================================

function exportData() {
  const data = getData();
  const exportData = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    data: data
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bookmarks-lite-${new Date().toISOString().split('T')[0]}.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  alert('データをエクスポートしました');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);

      if (!importedData.data) {
        alert('無効なデータ形式です');
        return;
      }

      if (confirm('現在のデータを上書きしてインポートしますか？\n（現在のデータは失われます）')) {
        saveData(importedData.data);
        renderAll();
        alert('データをインポートしました');
      }
    } catch (error) {
      alert('データの読み込みに失敗しました: ' + error.message);
    }
  };

  reader.readAsText(file);

  // ファイル入力をリセット
  event.target.value = '';
}

// =====================================
// モーダル管理
// =====================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// =====================================
// ユーティリティ
// =====================================

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
