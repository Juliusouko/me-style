
// javascript for create.html
const form = document.querySelector('form');

const createPost = async (e) => {
  e.preventDefault();

  const doc = {
    title: form.title.value,
    body: form.body.value,
    likes: 0,
  }

  await fetch('https://database-2-w43g.onrender.com/posts', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('/')
}

form.addEventListener('submit', createPost);
