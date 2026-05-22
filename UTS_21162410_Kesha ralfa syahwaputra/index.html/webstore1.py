<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beco Burger - Pemesanan Online</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <div class="logo">Beco Burger 🍔</div>
        <nav>
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#cart">Keranjang</a>
            <a href="#checkout">Checkout</a>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <h1>Selamat Datang di Beco Burger</h1>
            <p>Nikmati burger terbaik dengan layanan Pickup (Ambil Sendiri) atau Delivery (Antar ke Rumah)!</p>
        </section>

        <section id="menu">
            <h2>Daftar Menu</h2>
            
            <div class="filter-container">
                <button onclick="filterMenu('semua')">Semua</button>
                <button onclick="filterMenu('makanan')">Makanan</button>
                <button onclick="filterMenu('minuman')">Minuman</button>
            </div>

            <div class="menu-grid" id="menu-container">
                </div>
        </section>

        <section id="cart">
            <h2>Keranjang Belanja Anda</h2>
            <table id="cart-table">
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th>Subtotal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="cart-items">
                    </tbody>
            </table>

            <div class="cart-summary">
                <p>Subtotal: <span id="summary-subtotal">Rp 0</span></p>
                <p>Biaya Layanan: <span id="summary-layanan">Rp 0</span></p>
                <p>Ongkos Kirim: <span id="summary-ongkir">Rp 0</span></p>
                <h3>Total: <span id="summary-total">Rp 0</span></h3>
            </div>
        </section>

        <section id="checkout">
            <h2>Formulir Checkout</h2>
            <form id="checkout-form" onsubmit="prosesCheckout(event)">
                <label for="nama">Nama Lengkap:</label>
                <input type="text" id="nama" required placeholder="Masukkan nama Anda">

                <label for="telepon">Nomor Telepon:</label>
                <input type="tel" id="telepon" required placeholder="Contoh: 0812345678">

                <label for="layanan">Jenis Layanan:</label>
                <select id="layanan" onchange="updateBiayaLayanan()" required>
                    <option value="pickup">Pickup (Ambil Sendiri)</option>
                    <option value="delivery">Delivery (Antar)</option>
                </select>

                <label for="alamat">Alamat Pengiriman (Kosongkan jika Pickup):</label>
                <textarea id="alamat" rows="3" placeholder="Tulis alamat lengkap jika memilih Delivery"></textarea>

                <label for="pembayaran">Metode Pembayaran:</label>
                <select id="pembayaran" required>
                    <option value="cash">Cash (Tunai)</option>
                    <option value="qris">QRIS</option>
                </select>

                <label for="catatan">Catatan Pesanan:</label>
                <textarea id="catatan" rows="2" placeholder="Contoh: Tanpa bawang, sambal banyakin"></textarea>

                <button type="submit" class="btn-checkout">Proses Pesanan</button>
            </form>
        </section>

        <section id="receipt" class="receipt-section hidden">
            <div class="receipt-box">
                <h2>🍔 STRUK PESANAN BECO BURGER 🍔</h2>
                <hr>
                <div id="receipt-content"></div>
                <hr>
                <p style="text-align: center;">Terima kasih telah memesan!</p>
                <button onclick="tutupStruk()">Selesai & Pesan Lagi</button>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Beco Burger Resto. Semua Hak Dilindungi.</p>
    </footer>

</body>
</html>