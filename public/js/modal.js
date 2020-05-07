document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#done-username');

  btn.onclick = (e) => {
    e.preventDefault();
    const modal = document.querySelector('#modal');
    const username = document.querySelector('#username');
    
    if (username.value) {
      user.name = username.value;
      modal.style.display = "none";
    }
  }
});