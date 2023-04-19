import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Miki",
      email: "mik@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },

    {
      name: "Nhatty",
      email: "nhatty@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "GUARESS SLIM FIT SHIRT",
      slug: "guaress slim fit shirt1",
      category: "shirt",
      image: "https://addismercato.com/var/images/product/200.250/6Y7A2437.jpg",
      price: 1500,
      brand: "Italy",
      rating: 4.1,
      star: "⭐⭐⭐⭐",
      numReviews: 5,
      countInStock: 9,
      desc: "A classic shirt",
    },

    {
      name: "FIT SHIRT",
      slug: "guaress slim fit shirt2",
      category: "shirt",
      image: "https://addismercato.com/var/images/product/200.250/6Y7A2437.jpg",
      price: 1500,
      brand: "Italy",
      rating: 4.1,
      star: "⭐⭐⭐⭐",
      numReviews: 5,
      countInStock: 9,
      desc: "A classic shirt",
    },

    {
      name: "GUARESS SLIM FIT SHIRT",
      slug: "guaress slim fit shirt3",
      category: "shirt",
      image: "https://addismercato.com/var/images/product/200.250/6Y7A2437.jpg",
      price: 1500,
      brand: "Italy",
      rating: 4.1,
      star: "⭐⭐⭐⭐",
      numReviews: 5,
      countInStock: 9,
      desc: "A classic shirt",
    },

    {
      name: "FIT SHIRT",
      slug: "guaress slim fit shirt4",
      category: "shirt",
      image: "https://addismercato.com/var/images/product/200.250/6Y7A2437.jpg",
      price: 1500,
      brand: "Italy",
      rating: 4.1,
      star: "⭐⭐⭐⭐",
      numReviews: 5,
      countInStock: 9,
      desc: "A classic shirt",
    },

    {
      name: "GUARESS SLIM FIT SHIRT",
      slug: "guaress slim fit shirt5",
      category: "shirt",
      image: "https://addismercato.com/var/images/product/200.250/6Y7A2437.jpg",
      price: 1500,
      brand: "Italy",
      rating: 4.1,
      star: "⭐⭐⭐⭐",
      numReviews: 5,
      countInStock: 9,
      desc: "A classic shirt",
    },

    {
      name: "FIT SHIRT",
      slug: "guaress slim fit shirt6",
      category: "shirt",
      image: "https://addismercato.com/var/images/product/200.250/6Y7A2437.jpg",
      price: 1500,
      brand: "Italy",
      rating: 4.1,
      star: "⭐⭐⭐⭐",
      numReviews: 5,
      countInStock: 9,
      desc: "A classic shirt",
    },
  ],
};

export default data;
