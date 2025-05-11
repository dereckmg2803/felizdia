const getRandomFromArr = (arr, currentItem) => {
  if (arr.length <= 1) return arr[0]; // Evitar bucles infinitos si solo hay un elemento

  let newItem;
  do {
    newItem = arr[Math.floor(Math.random() * arr.length)];
  } while (newItem === currentItem); // Asegura que sea diferente

  return newItem;
};

export default getRandomFromArr;
