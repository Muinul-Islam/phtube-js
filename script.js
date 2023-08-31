const loadData = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const allCategory = data.data;

  allCategory.forEach(category => {
    console.log(category);
    const btnContainer = document.getElementById('btn-container');
    const div = document.createElement('div');
    div.innerHTML = `
      <button class="px-3 py-1 bg-gray-300 text-xl">
          ${category.category}
        </button>
    `
    btnContainer.appendChild(div);
  })

};



loadData();