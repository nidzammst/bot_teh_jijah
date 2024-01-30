// Mengimpor mongoose
const mongoose = require('mongoose');

// Membuat schema product
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

// Membuat model product
const Product = mongoose.model('Product', productSchema);

// Membuat schema koperasi
const koperasiSchema = new mongoose.Schema({
  // Field keuntungan harian, mingguan, bulanan, dan total
  keuntunganHarian: Number,
  keuntunganMingguan: Number,
  keuntunganBulanan: Number,
  keuntunganTotal: Number,

  // Field array produk yang terhubung dengan schema product
  produkHarian: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  produkMingguan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  produkBulanan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  produkTotal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  // Field waktu reset harian, mingguan, dan bulanan
  waktuResetHarian: Date,
  waktuResetMingguan: Date,
  waktuResetBulanan: Date
});

// Membuat model koperasi
const Koperasi = mongoose.model('Koperasi', koperasiSchema);

// Membuat fungsi untuk mereset field harian, mingguan, atau bulanan jika sudah melewati waktu reset
koperasiSchema.methods.resetField = function (field) {
  // Mendapatkan tanggal saat ini
  const today = new Date();

  // Memeriksa apakah field yang akan direset adalah harian, mingguan, atau bulanan
  if (field === 'harian') {
    // Memeriksa apakah tanggal saat ini lebih besar dari waktu reset harian
    if (today > this.waktuResetHarian) {
      // Mereset field keuntungan harian dan produk harian menjadi nol
      this.keuntunganHarian = 0;
      this.produkHarian = [];

      // Mengatur ulang waktu reset harian menjadi besok
      this.waktuResetHarian.setDate(this.waktuResetHarian.getDate() + 1);

      // Menyimpan perubahan ke database
      this.save();
    }
  } else if (field === 'mingguan') {
    // Memeriksa apakah tanggal saat ini lebih besar dari waktu reset mingguan
    if (today > this.waktuResetMingguan) {
      // Mereset field keuntungan mingguan dan produk mingguan menjadi nol
      this.keuntunganMingguan = 0;
      this.produkMingguan = [];

      // Mengatur ulang waktu reset mingguan menjadi minggu depan
      this.waktuResetMingguan.setDate(this.waktuResetMingguan.getDate() + 7);

      // Menyimpan perubahan ke database
      this.save();
    }
  } else if (field === 'bulanan') {
    // Memeriksa apakah tanggal saat ini lebih besar dari waktu reset bulanan
    if (today > this.waktuResetBulanan) {
      // Mereset field keuntungan bulanan dan produk bulanan menjadi nol
      this.keuntunganBulanan = 0;
      this.produkBulanan = [];

      // Mengatur ulang waktu reset bulanan menjadi bulan depan
      this.waktuResetBulanan.setMonth(this.waktuResetBulanan.getMonth() + 1);

      // Menyimpan perubahan ke database
      this.save();
    }
  }
};

// Membuat contoh data koperasi
const koperasi1 = new Koperasi({
  keuntunganHarian: 100000,
  keuntunganMingguan: 500000,
  keuntunganBulanan: 2000000,
  keuntunganTotal: 10000000,
  produkHarian: [], // isi dengan id produk yang terjual hari ini
  produkMingguan: [], // isi dengan id produk yang terjual minggu ini
  produkBulanan: [], // isi dengan id produk yang terjual bulan ini
  produkTotal: [], // isi dengan id produk yang terjual sejak awal
  waktuResetHarian: new Date('2024-01-31'),
  waktuResetMingguan: new Date('2024-02-01'),
  waktuResetBulanan: new Date('2024-02-01')
});

// Menyimpan data koperasi ke database
koperasi1.save();
                                    
