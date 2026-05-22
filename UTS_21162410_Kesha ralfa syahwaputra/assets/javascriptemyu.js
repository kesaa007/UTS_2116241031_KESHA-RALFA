// 1. Data Katalog Produk 

const produkMegastore = [
    { id: 1, nama: "Official Adidas Manchester United Home Jersey 2025/2026 ", harga: 2200000, kategori: "kit", img: "jerseyhome_emyu.jfif" },
    { id: 2, nama: "Official Adidas Manchester United Away Jersey 2025/2026 ", harga: 1900000, kategori: "kit", img: "jerseyaway_emyu.jfif" },
    { id: 3, nama: "Official Adidas Manchester United Third Jersey 2025/2026 ", harga: 1850000, kategori: "kit", img: "jerseythird_emyu.jfif" },
    { id: 4, nama: "Official Manchester United Retro Jersey ", harga: 1500000, kategori: "kit", img: "jerseyretro_emyu.jfif" },
    { id: 5, nama: "Official Adidas Manchester United Black and White training Kit", harga: 900000, kategori: "kit", img: "training_emyu.jfif" },
    { id: 6, nama: "Official Manchester United Adidas Jacket 25/26", harga: 1200000, kategori: "merch", img: "jacket_emyu.jfif" },
    { id: 7, nama: "Manchester united Fan Cap", harga: 350000, kategori: "merch", img: "topi_emyu.jfif" },
    { id: 8, nama: "Manchester United Black and White Stripe Duffle Bag", harga: 700000, kategori: "merch", img: "tas_emyu.jfif" },
    { id: 9, nama: "Manchester United Black and Red Scarf", harga: 550000, kategori: "merch", img: "syal_emyu.jfif" },
    { id: 10, nama: "Match Ticket: Man United vs Man City (VIP Sir Alex Ferguson Stand)", harga: 3150000, kategori: "tiket", img: "tiketemyu_siti.png" },
    { id: 11, nama: "Match Ticket: Man United vs Man City (Stretford End)", harga: 1750000, kategori: "tiket", img: "tiketemyu_siti.png" },
    { id: 12, nama: "Old Trafford Stadium Tour VIP Ticket", harga: 2800000, kategori: "tiket", img: "emyu_vip.png" }
];

let databaseKeranjang = [];
const BIAYA_HANDLING = 10000; // Layanan administrasi klub
let ongkosKirimGlobal = 0;

// Render produk ke grid halaman utama 
function renderProdukKeStore(produkArray) {
    const gridContainer = document.getElementById('products-container');
    if (!gridContainer) return;
    gridContainer.innerHTML = "";
    
    produkArray.forEach(item => {
        gridContainer.innerHTML += `
            <div class="product-card">
                <img src="${item.img}" alt="${item.nama}">
                <h3>${item.nama}</h3>
                <p class="product-price">IDR ${item.harga.toLocaleString('id-ID')}</p>
                <button class="add-to-cart-btn" onclick="addItemKeKeranjang(event, ${item.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Fitur Filter Berdasarkan Kategori
function filterProduk(kategoriDipilih) {
    // Kelola class active di tombol filter agar estetik
    const tombols = document.querySelectorAll('.filter-btn');
    tombols.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (kategoriDipilih === 'semua') {
        renderProdukKeStore(produkMegastore);
    } else {
        const filtered = produkMegastore.filter(p => p.kategori === kategoriDipilih);
        renderProdukKeStore(filtered);
    }
}

// 1. Fungsi Tambah Barang ke Keranjang (Menerima parameter event & id)
function addItemKeKeranjang(event, idProduk) {
    // Mencegah eror pembacaan event di beberapa browser
    if (event) event.preventDefault();

    const dataItem = produkMegastore.find(p => p.id === idProduk);
    if (!dataItem) {
        console.error("Produk dengan ID " + idProduk + " tidak ditemukan!");
        return;
    }

    const itemDiCart = databaseKeranjang.find(p => p.id === idProduk);

    if (itemDiCart) {
        itemDiCart.qty++;
    } else {
        databaseKeranjang.push({ ...dataItem, qty: 1 });
    }
    
    // 1. Fungsi Tambah / Kurang Kuantitas (Sudah Diamankan)
function sesuaikanKuantitas(idProduk, operasi) {
    // Mengubah id ke format angka asli untuk mencegah eror tipe data string
    const targetId = Number(idProduk);
    const item = databaseKeranjang.find(p => p.id === targetId);
    if (!item) return;

    if (operasi === 'tambah') {
        item.qty++;
    } else if (operasi === 'kurang') {
        item.qty--;
        if (item.qty === 0) {
            hapusItemDariCart(targetId);
            return;
        }
    }
    refreshTampilanKeranjang();
}

// 2. Fungsi Hapus Item dari Keranjang 
function hapusItemDariCart(idProduk) {
    // Mengubah id ke format angka asli untuk mencegah eror kecocokan data (.filter)
    const targetId = Number(idProduk);
    
    databaseKeranjang = databaseKeranjang.filter(p => p.id !== targetId);
    
    // Memperbarui tabel dan angka badge di menu navigasi atas secara real-time
    refreshTampilanKeranjang();
}
    // Perbarui data di layar tabel
    refreshTampilanKeranjang();
    
    // Jalankan animasi berkedip pada badge menu atas
    const badgeKeranjang = document.getElementById('cart-badge');
    if (badgeKeranjang) {
        badgeKeranjang.classList.add('badge-pulse');
        setTimeout(() => {
            badgeKeranjang.classList.remove('badge-pulse');
        }, 1000);
    }

    // Tampilkan Pop-up Custom Ceklis Sukses di Layar Depan
    const popupSukses = document.getElementById('custom-alert-modal');
    if (popupSukses) {
        popupSukses.classList.remove('alert-popup-hidden');
        setTimeout(() => {
            popupSukses.classList.add('alert-popup-hidden');
        }, 1500);
    }
}

// Fungsi Sinkronisasi Data ke Tabel Layar (VERSI AMAN UNTUK SEMUA TOMBOL)
function refreshTampilanKeranjang() {
    const tableBody = document.getElementById('cart-items-container');
    if (!tableBody) return;
    tableBody.innerHTML = "";

    let subtotalHarga = 0;
    let totalBarang = 0;

    databaseKeranjang.forEach(item => {
        const hitungSubtotal = item.harga * item.qty;
        subtotalHarga += hitungSubtotal;
        totalBarang += item.qty;

        tableBody.innerHTML += `
            <tr>
                <td style="text-align: left; color: white;">${item.nama}</td>
                <td>IDR ${item.harga.toLocaleString('id-ID')}</td>
                <td>
                    <button class="qty-btn" onclick="sesuaikanKuantitas(event, ${item.id}, 'kurang')">-</button>
                    <span style="margin: 0 8px; font-weight: bold; color: white;">${item.qty}</span>
                    <button class="qty-btn" onclick="sesuaikanKuantitas(event, ${item.id}, 'tambah')">+</button>
                </td>
                <td>IDR ${hitungSubtotal.toLocaleString('id-ID')}</td>
                <td><button class="delete-btn" onclick="hapusItemDariCart(event, ${item.id})">Delete</button></td>
            </tr>
        `;
    });

    // Update angka notifikasi badge di menu navigasi atas
    const badge = document.getElementById('cart-badge');
    if (badge) badge.innerText = `(${totalBarang})`;

    const finalLayanan = subtotalHarga > 0 ? BIAYA_HANDLING : 0;
    const totalSemuaBiaya = subtotalHarga > 0 ? (subtotalHarga + finalLayanan + ongkosKirimGlobal) : 0;

    // Suntikkan teks harga baru berformat IDR ke HTML
    if(document.getElementById('text-subtotal')) document.getElementById('text-subtotal').innerText = `IDR ${subtotalHarga.toLocaleString('id-ID')}`;
    if(document.getElementById('text-layanan')) document.getElementById('text-layanan').innerText = `IDR ${finalLayanan.toLocaleString('id-ID')}`;
    if(document.getElementById('text-ongkir')) document.getElementById('text-ongkir').innerText = `IDR ${ongkosKirimGlobal.toLocaleString('id-ID')}`;
    if(document.getElementById('text-total')) document.getElementById('text-total').innerText = `IDR ${totalSemuaBiaya.toLocaleString('id-ID')}`;
}
// Fungsi Tambah / Kurang Kuantitas (Sudah Menghandle Event)
function sesuaikanKuantitas(event, idProduk, operasi) {
    if (event) event.preventDefault(); // Mencegah eror klik browser

    const targetId = Number(idProduk);
    const item = databaseKeranjang.find(p => p.id === targetId);
    if (!item) return;

    if (operasi === 'tambah') {
        item.qty++;
    } else if (operasi === 'kurang') {
        item.qty--;
        if (item.qty === 0) {
            hapusItemDariCart(event, targetId);
            return;
        }
    }
    refreshTampilanKeranjang();
}

// Fungsi Hapus Item dari Keranjang (Dengan Efek Pop-up Custom)
function hapusItemDariCart(event, idProduk) {
    if (event) event.preventDefault(); // Mencegah eror klik browser

    const targetId = Number(idProduk);
    
    // Proses penyaringan/penghapusan data di array
    databaseKeranjang = databaseKeranjang.filter(p => p.id !== targetId);
    
    // Perbarui tabel keranjang belanja secara real-time
    refreshTampilanKeranjang();

    // === LOGIKA MENAMPILKAN POP-UP HAPUS CUSTOM ===
    const popupHapus = document.getElementById('custom-delete-modal');
    if (popupHapus) {
        // Memunculkan pop-up hapus di layar depan
        popupHapus.classList.remove('alert-popup-hidden');
        
        // Menyembunyikan kembali pop-up secara otomatis setelah 1,2 detik (1200 ms)
        setTimeout(() => {
            popupHapus.classList.add('alert-popup-hidden');
        }, 1100);
    }
}
function handleCheckout(event) {
    event.preventDefault();

    // PERBAIKAN: Jika keranjang kosong, munculkan Pop-up Custom Peringatan
    if (databaseKeranjang.length === 0) {
        const popupWarning = document.getElementById('empty-cart-warning-modal');
        if (popupWarning) {
            // Tampilkan pop-up peringatan ke layar depan
            popupWarning.classList.remove('alert-popup-hidden');
            
            // Tunggu 2,5 detik (2500 ms) sebelum menutup dan melempar user ke halaman Home
            setTimeout(() => {
                popupWarning.classList.add('alert-popup-hidden');
                // Alihkan otomatis ke halaman home biar user pilih barang
                pindahHalaman('home-page', 'nav-home');
            }, 2500);
        }
        return; // Hentikan fungsi agar struk belanja tidak keluar
    }

    const nama = document.getElementById('buyer-name').value;
    const telp = document.getElementById('buyer-phone').value;
    const opsiLayanan = document.getElementById('shipping-method').value;
    const alamat = document.getElementById('buyer-address').value || "Ambil Di Toko (Old Trafford Megastore)";
    const metodeBayar = document.getElementById('payment-method').value;
    const catatan = document.getElementById('order-notes').value || "-";

    let subtotalHarga = databaseKeranjang.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    let totalBiaya = subtotalHarga + BIAYA_HANDLING + ongkosKirimGlobal;

    // Format cetak teks struk belanja
    let formatStruk = `
        <p><strong>Customer:</strong> ${nama}</p>
        <p><strong>Phone:</strong> ${telp}</p>
        <p><strong>Method:</strong> ${opsiLayanan.toUpperCase()}</p>
        <p><strong>Address:</strong> ${alamat}</p>
        <p><strong>Payment:</strong> ${metodeBayar.toUpperCase()}</p>
        <p><strong>Notes:</strong> ${catatan}</p>
        <p>---------------------------------</p>
        <p><strong>ITEMS ORDERED:</strong></p>
    `;

    databaseKeranjang.forEach(item => {
        formatStruk += `<p style="font-size:0.85rem;">• ${item.nama}<br>&nbsp;&nbsp;${item.qty}x @ IDR ${item.harga.toLocaleString('id-ID')} = IDR ${(item.harga * item.qty).toLocaleString('id-ID')}</p>`;
    });

    formatStruk += `
        <p>---------------------------------</p>
        <p>Subtotal: IDR ${subtotalHarga.toLocaleString('id-ID')}</p>
        <p>Club Handling: IDR ${BIAYA_HANDLING.toLocaleString('id-ID')}</p>
        <p>Shipping Cost: IDR ${ongkosKirimGlobal.toLocaleString('id-ID')}</p>
        <p><strong>GRAND TOTAL: IDR ${totalBiaya.toLocaleString('id-ID')}</strong></p>
    `;

    // Suntikkan rincian teks ke struk
    document.getElementById('invoice-details').innerHTML = formatStruk;

    
    const qrisWrapper = document.getElementById('qris-wrapper');
    const qrisImageContainer = document.getElementById('qris-image-container');

    if (metodeBayar === 'qris') {
        qrisImageContainer.innerHTML = "";
        
        // Membuat string data QR unik berdasarkan total harga dan nama tanpa spasi
        const qrData = `MUMegastore-Chkt-${totalBiaya}-${nama.replace(/\s+/g, '')}`;
        
        // Memanggil gambar QR Code gratis dari API online (ukuran 180x180 px)
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}`;
        
        // Suntikkan tag <img src="..."> ke dalam HTML
        qrisImageContainer.innerHTML = `<img src="${qrCodeUrl}" alt="QRIS QR Code" style="border: 4px solid #fff; box-shadow: 0 0 5px rgba(0,0,0,0.3); margin-top: 5px;">`;
        
        // Hilangkan class 'hidden' supaya kotaknya tampil di layar
        if (qrisWrapper) qrisWrapper.classList.remove('hidden');
    } else {
        // Jika pembeli memilih Cash, sembunyikan gambar QRIS-nya
        if (qrisWrapper) qrisWrapper.classList.add('hidden');
        qrisImageContainer.innerHTML = "";
    }

    // Tampilkan modal struk/invoice ke layar depan
    document.getElementById('invoice-modal').classList.remove('hidden');
}



// Fungsi Reset Toko saat tombol "Done & New Order" di Struk ditekan
function clearAndResetStore() {
    
const qrisWrapper = document.getElementById('qris-wrapper');
if (qrisWrapper) qrisWrapper.classList.add('hidden');

const qrisImageContainer = document.getElementById('qris-image-container');
if (qrisImageContainer) qrisImageContainer.innerHTML = "";
    // 1. Sembunyikan dulu modal struk (invoice) dari layar depan
    const modalInvoice = document.getElementById('invoice-modal');
    if (modalInvoice) {
        modalInvoice.classList.add('hidden');
    }

    // 2. === LOGIKA MENAMPILKAN POP-UP CEKLIS IJO AKHIR ===
    const popupFinalSukses = document.getElementById('order-success-modal');
    if (popupFinalSukses) {
        // Munculkan pop-up ceklis hijau ke depan layar
        popupFinalSukses.classList.remove('alert-popup-hidden');

        // Tunggu selama 2,5 detik (2500 ms) sebelum menutup otomatis dan mereset halaman
        setTimeout(() => {
            // Sembunyikan kembali pop-up ceklis ijo
            popupFinalSukses.classList.add('alert-popup-hidden');

            // 3. Proses pengosongan keranjang dan form setelah pop-up selesai tampil
            databaseKeranjang = [];
            refreshTampilanKeranjang();

            const formOrder = document.getElementById('order-form');
            if (formOrder) formOrder.reset();

            // Kembalikan otomatis tampilan ke halaman depan katalog produk
            pindahHalaman('home-page', 'nav-home');
        }, 2500);
    } else {
        // Antisipasi cadangan jika elemen pop-up gagal terbaca, langsung reset biasa
        databaseKeranjang = [];
        refreshTampilanKeranjang();
        const formOrder = document.getElementById('order-form');
        if (formOrder) formOrder.reset();
        pindahHalaman('home-page', 'nav-home');
    }
}

// Inisialisasi awal saat web dibuka
renderProdukKeStore(produkMegastore);