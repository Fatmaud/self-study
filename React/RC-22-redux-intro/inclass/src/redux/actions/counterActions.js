import { INC, DEC, RESET } from "../types/counterTypes";

export const increment = () => {
  return { type: INC }; //return ile object döndürme
};
export const decrement = () => ({ type: DEC }); //return yazmadan object döndürme

export const reset = () => ({ type: RESET });

//Redux ta context i consume ederken dipsatch te actionin typeini yazmaya gerek kalmadan buradaki fonksiyonlari import edip yazabiliriz. (Counter  component sayfasinda kullandik)

// Action: Bir javascript objesidir. Store’da hangi state’in değişeceği bilgisini(type) ve state verisini taşır(payload).

// Bir action type ve payload olmak üzere iki adet property’den oluşur. type action’un belirteçi hangi işlemin yapıldığını belirtir. payload ise gönderilecek veriyi içeren property’dir.
//payload yerine gönderdiğiniz verinin adını da (movie, comment vs.) yazabilirsiniz fakat genel bir kural olarak payload property’sini kullanmaya özen göstermelisiniz.
//* Bir action her zaman javascript objesi olmak zorundadır.

//? Action creater fonksyionlarının tanimlanmsi
// Action’ları daha kullanışlı yapmak için için çoğu zaman Action Creator’lardan faydalanırız. Action Creator’lar birer arrow function’lardır. Sadece değişen payload kısmını parametre alıp bir action geri döner. Type’lar genelde değişmeyen, sadece yönlendirici sabitler olduğu için ayrı bir dosyada tutulur(actionTypes). Ama artık redux toolkit kullanımı ile birlikte hepsi tek dosyada yapılır.
