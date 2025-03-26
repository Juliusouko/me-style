// javascript for index.html
const container = document.querySelector('.posts');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
  console.log(term);
  let uri = 'http://localhost:3000/posts?_sort=likes&_order=asc';
  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  const posts = await res.json();
  console.log(posts);

  let template = '';
  posts.forEach(post => {
    template += `
    <h2>${post.title}</h2>
      <div class="post">
        <p>${post.body.slice(0, 50)}</p>
        <a href="/details.html?id=${post.id}">Details</a>
      </div>
      <div class="likes">
      <p><span class="material-symbols-outlined">
      favorite</span></p>
      <span class="likes">${post.likes}</span>
      </div>
    `
  });

  container.innerHTML = template;
}

// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderPosts());