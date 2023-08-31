const loadData = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const allCategory = data?.data;

  allCategory?.forEach(category => {
    const btnContainer = document.getElementById('btn-container');
    const div = document.createElement('div');
    div.innerHTML = `
      <button onclick="loadCategory(${category?.category_id
      })" class="px-3 py-1 bg-gray-300 text-xl hover:bg-red-500 hover:text-white rounded-lg">
          ${category?.category}
        </button>
    `
    btnContainer.appendChild(div);
  });

};

const loadCategory = async (categoryId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
  const allCategory = data?.data;
  const cardContainer = document.getElementById('card-container')

  allCategory?.forEach(category => {
    console.log(category);
    const div = document.createElement('div');
    div.innerHTML = `
          <div class="card bg-base-100 shadow-xl">
          <figure><img class="h-[350px]" src="${category?.thumbnail}" alt="images" /></figure>
          <div class="card-body">
           <div class="flex items-center gap-8">
            <img class="w-[48px] h-[48px] rounded-full" src="${category?.authors[0]?.profile_picture}" alt="images"/>
            <h3 class="text-xl font-semibold">${category?.title}</h3>
           </div>
            <div class="flex w-9/12">
            <p class="ml-20">${category?.authors[0].profile_name}</p>
            <img src="./img/blueTick.jpg" alt="images"/>
            </div>
            <p class="ml-20">${category?.others?.views} views</p>
          </div>
        </div>
    `;

    cardContainer.appendChild(div)
  });
}


loadData();


const blog = () => {
  window.location.href = 'blog.html';
}