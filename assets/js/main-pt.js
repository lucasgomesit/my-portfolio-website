let str = 'Olá, sou o Lucas.'.split('');

const interval = setInterval(() => {
  document.querySelector('.first-line').innerHTML += str[0];
  str = str.slice(1);

  if(!str.length) {
    clearInterval(interval)
  }
}, 160);