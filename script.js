(function(){
  const list = document.getElementById('unitList');
  if (!list) return;
  const cards = Array.from(list.querySelectorAll('.unit'));
  const search = document.getElementById('unitSearch');
  const type = document.getElementById('unitType');
  const count = document.getElementById('resultCount');
  const empty = document.getElementById('emptyState');
  const tabs = Array.from(document.querySelectorAll('.tab'));
  let category = 'regular';

  function update(){
    const query = search.value.trim().toLocaleLowerCase('ru');
    const selectedType = type.value;
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = category === 'all' || card.dataset.category === category;
      const textMatch = card.textContent.toLocaleLowerCase('ru').includes(query);
      const typeMatch = selectedType === 'all' || (card.dataset.type || '').includes(selectedType);
      const show = categoryMatch && textMatch && typeMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = visible + (visible === 1 ? ' позиция' : visible >= 2 && visible <= 4 ? ' позиции' : ' позиций');
    empty.style.display = visible ? 'none' : 'block';
  }
  tabs.forEach(tab => tab.addEventListener('click', () => {
    category = tab.dataset.category;
    tabs.forEach(item => item.setAttribute('aria-pressed', String(item === tab)));
    update();
  }));
  search.addEventListener('input', update);
  type.addEventListener('change', update);
  update();
})();
