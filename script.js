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
  cardContainer.innerHTML = '';

  if (allCategory.length === 0) {
    const div = document.createElement('div');
    div.innerHTML = `
    <img class='w-[280px] h-[280px] mt-8' src="./img/icon.png"/>
    <h3 class='mt-12 text-3xl'>Oops!! Sorry, There is no content here</h3>
    `;
    cardContainer.appendChild(div);
    return;
  }

  allCategory?.forEach(category => {
    const div = document.createElement('div');
    const timeSec = category?.others?.posted_date;

    let timeField = '';
    if (timeSec !== null) {
      const timeHours = Math.floor(timeSec / 3600);
      const remainingTime = timeSec % 3600;
      const timeMins = Math.floor(remainingTime / 60);
      timeField = `${timeHours}hrs ${timeMins}min ago`;
    }

    div.innerHTML = `
      <div class="card bg-base-100 shadow-xl">
          <div class="relative">
           <img class="h-[350px] rounded-xl" src="${category?.thumbnail}" alt="images" />
           ${timeSec !== '' ? `<small class="absolute bottom-0 right-0 m-2 p-1 rounded-lg mt-[-30px] bg-black text-white">${timeField}</small>` : ' '}
          </div >
          <div class="card-body">
            <div class="flex items-center gap-8">
              <img class="w-[48px] h-[48px] rounded-full" src="${category?.authors[0]?.profile_picture}" alt="images" />
              <h3 class="text-xl font-semibold">${category?.title}</h3>
            </div>
            <div class="flex w-9/12">
              <p class="ml-20">${category?.authors[0].profile_name}</p>
              ${category?.authors[0]?.verified === true ? `<img src="./img/blueTick.jpg" alt="images" />` : ' '}
            </div>
            <p class="ml-20">${category?.others?.views} views</p>
          </div>
      </div >
  `;

    cardContainer.appendChild(div)
  });
}


loadData();

loadCategory("1000");

const blog = () => {
  window.location.href = 'blog.html';
}