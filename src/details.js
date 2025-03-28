// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');

const renderDetails = async () => {
  const res = await fetch('https://database-2-w43g.onrender.com/posts/' + id);
  if (!res.ok) {
    window.location.replace("https://database-2-w43g.onrender.com/posts");
  }
  const post = await res.json();

  const template = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `

  container.innerHTML = template;
}

deleteBtn.addEventListener('click', async () => {
  const res = await fetch('https://database-2-w43g.onrender.com/posts/' + id, {
    method: 'DELETE'
  });
  window.location.replace("https://database-2-w43g.onrender.com/posts/");
})

window.addEventListener('DOMContentLoaded', renderDetails);