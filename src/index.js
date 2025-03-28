// javascript for index.html
const container = document.querySelector('.posts');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
  console.log(term);
  let uri = 'https://database-2-w43g.onrender.com/posts?_sort=likes&_order=asc';
  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  const posts = await res.json();
  console.log(posts);



  posts.forEach(post => {
    
    let postName = document.createElement('h2')
    postName.innerHTML = post.title

    let details = document.createElement('div')
    details.setAttribute('class', 'post')

    let detailsText = document.createElement('p')
    detailsText.innerHTML = post.body.slice(0, 50)

    let detailsLink = document.createElement('a')
    detailsLink.setAttribute('href', `/details.html?id=${post.id}`)

    detailsLink.innerHTML = 'Details'

    details.appendChild(detailsText)
    details.appendChild(detailsLink)

    let likesContainer = document.createElement('div')
    likesContainer.setAttribute('class', 'likes')

    //let commentContainer = document.createElement('div')
    //commentContainer.setAttribute('class', comments)
    //commentContainer.innerHTML = `This is a comment`

    let likesText = document.createElement('p')
    let likesIcon = document.createElement('span')
    likesIcon.setAttribute('class','material-symbols-outlined')

    likesIcon.innerHTML = 'favorite'

    // add event listener on the icon 
    likesIcon.addEventListener('click', async () => {
      try {
        const newLikes = parseInt(likesCount.textContent) + 1
        likesCount.textContent = newLikes

        const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({likes: newLikes})
        })
        if (!response.ok) {
          throw new Error ('Failed to update likes')
        }
      } catch (err) {
        console.error('Error updating likes:', err)
      }
    })

    likesText.appendChild(likesIcon)

    let likesCount = document.createElement('span')
    likesCount.setAttribute('class', 'likes-count')
    likesCount.innerHTML = post.likes

    likesContainer.appendChild(likesText)
    likesContainer.appendChild(likesCount)

    container.appendChild(postName)
    container.appendChild(details)
    container.appendChild(likesContainer)

  });

}

// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderPosts());