// // src/models/Showroom.js

// class Showroom {
//   constructor({
//     id,
//     name,
//     address,
//     image,
//     latitude,
//     longitude,
//   }) {
//     this.id = id;
//     this.name = name;
//     this.address = address;
//     this.image = image; // URL string or local require()
//     this.location = {
//       latitude,
//       longitude,
//     };
//   }

//   // Optional: static method to parse from API response
//   static fromApi(data) {
//     return new Showroom({
//       id: data.id,
//       name: data.name,
//       address: data.address,
//       image: data.image_url, // adjust to your API
//       latitude: data.latitude,
//       longitude: data.longitude,
//     });
//   }
// }

// export default Showroom;