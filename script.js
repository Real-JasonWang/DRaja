import { elements } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const periodicTable = document.querySelector('.periodic-table');

  elements.forEach((element) => {
    const elementDiv = createTableCell(element);
    periodicTable.appendChild(elementDiv);
  });

  setupModal();

  // Setup the about button to show the about modal when clicked
  document.querySelector('.about').addEventListener('click', () => {
    openAboutModal();
  });
});

function createTableCell(element) {
  const elementDiv = document.createElement('div');
  elementDiv.classList.add('element');
  elementDiv.innerHTML = `<strong>${element.symbol}</strong><br>${element.number}`;
  elementDiv.addEventListener('click', () => openElementModal(element));
  return elementDiv;
}

function setupModal() {
  const elementModal = document.getElementById('elementModal');
  const closeButton = elementModal.querySelector('.close-button');

  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === elementModal) {
      closeModal();
    }
  });

  const aboutModal = document.getElementById('aboutModal');
  const aboutCloseButton = aboutModal.querySelector('.about-close-button');

  aboutCloseButton.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
      closeModal();
    }
  });
}

function openElementModal(element) {
  document.getElementById('elementName').innerText = element.name;
  document.getElementById('elementNumber').innerText = `序列号：${element.number}`;
  document.getElementById('elementLineage').innerText = `血系源流：${element.lineage}`;
  document.getElementById('elementDanger').innerText = `危险程度：${element.danger}`;

  // 设置危险程度颜色
  const dangerColorClass = getDangerColorClass(element.danger);
  document.getElementById('elementDanger').style.color = dangerColorClass;

  document.getElementById('elementDiscoverer').innerText = `发现及命名者：${element.discoverer}`;
  document.getElementById('elementDescription').innerText = `介绍：${element.description}`;
  document.getElementById('elementQuote').innerText = `名言：“${element.quote}”`;
  document.getElementById('elementUser').innerText = `使用者：${element.user}`;

  const elementModal = document.getElementById('elementModal');
  elementModal.style.display = 'block';
  elementModal.style.opacity = '1';
}

function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 200);
  });
}

function openAboutModal() {
  const aboutModal = document.getElementById('aboutModal');
  aboutModal.style.display = 'block';
  aboutModal.style.opacity = '1';
}

function getDangerColorClass(dangerLevel) {
  switch (dangerLevel) {
    case '低':
      return 'var(--danger-low)';
    case '中':
      return 'var(--danger-medium)';
    case '高':
      return 'var(--danger-high)';
    case '绝密':
      return 'var(--danger-secret)';
    case '未知':
      return 'var(--danger-unknown)';
    default:
      return 'var(--danger-unknown)';
  }
}