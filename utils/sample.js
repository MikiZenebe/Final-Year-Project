import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Micky",
      email: "mikizenebe10@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: "SAMSUNG GALAXY A20S",
      slug: "samsung galaxy a20",
      category: "Mobile",
      image:
        "https://addismercato.com/var/images/product/200.250/A20%20Front%20tilt.png",
      price: 13799,
      brand: "samsung",
      rating: 5,
      star: "⭐⭐⭐⭐⭐",
      numReviews: 5,
      countInStock: 20,
      desc: "REAR CAMERA. Dual Camera. Ultra wide 5 MP (F2.2) ...,FRONT CAMERA. 8 MP (F2.0) Face recognition...FINGERPRINT SENSOR...INFINITY-V DISPLAY. Super AMOLED. 6.4 FHD+ (720 x 1560) ...PROCESSOR. Lassen-P+ Dual 1.6 GHz + Hexa 1.35 GHz...CHARGING. 4,000 mAh (typical*) ...STORAGE.starts from 32 gb...MEMORY. RAM: 3 GB.",
    },
  ],
};

export default data;
