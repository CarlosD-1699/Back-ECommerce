import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: "carlos",
      email: "Adminexample@gmail.com",
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: "Andres",
      email: "User1@gmail.com",
      password: bcrypt.hashSync('654321'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: '1',
      name: "Nike Slim Shirt1",
      slug: "nike-slim-shirt1",
      category: "Shirts",
      image: "/images/p2.png",
      price: 120,
      countInStock: 0,
      brand: "Nike",
      rating: 2.5,
      numReviews: 10,
      description: "sample product",
    },
    {
      //_id: '2',
      name: "Nike Slim Shirt2",
      slug: "nike-slim-shirt2",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 120,
      countInStock: 20,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "sample product",
    },
    {
      //_id: '3',
      name: "Nike Slim Shirt3",
      slug: "nike-slim-shirt3",
      category: "Shirts",
      image: "/images/p2.png",
      price: 120,
      countInStock: 20,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "sample product",
    },
  ],
};

export default data;
