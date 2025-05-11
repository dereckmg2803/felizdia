const button = document.querySelector('.button');

button.addEventListener('touchstart', () => {
  button.style.backgroundColor = 'gray';
  
  setTimeout(() => {
    button.style.backgroundColor = ''; // Vuelve al color original
  }, 500); // 500ms después del toque
});
