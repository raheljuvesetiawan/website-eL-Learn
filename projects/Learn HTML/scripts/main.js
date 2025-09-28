document.addEventListener('DOMContentLoaded', function() {
    // Tangani klik pada tombol modul
    const modulButtons = document.querySelectorAll('.btn-modul');
    const modulDisplay = document.getElementById('modul-display');
    
    modulButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modulItem = this.parentElement;
            const modulName = modulItem.getAttribute('data-modul');
            
            // Load konten modul
            loadModul(modulName);
            
            // Update UI untuk menunjukkan modul aktif
            modulButtons.forEach(btn => {
                btn.textContent = 'Buka Modul';
                btn.parentElement.style.borderLeft = 'none';
            });
            
            this.textContent = 'Sedang Dibuka';
            modulItem.style.borderLeft = '4px solid #3498db';
        });
    });
    
    // Fungsi untuk memuat konten modul
    function loadModul(modulName) {
        // Gunakan fetch untuk mengambil konten modul
        fetch(`modul/${modulName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Modul tidak ditemukan');
                }
                return response.text();
            })
            .then(data => {
                modulDisplay.innerHTML = data;
                
                // Tambahkan event listener untuk tab code/result
                const tabButtons = modulDisplay.querySelectorAll('.tab-button');
                const tabContents = modulDisplay.querySelectorAll('.tab-content');
                
                if (tabButtons.length > 0) {
                    tabButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            const tabName = this.getAttribute('data-tab');
                            
                            // Nonaktifkan semua tab
                            tabButtons.forEach(btn => btn.classList.remove('active'));
                            tabContents.forEach(content => content.classList.remove('active'));
                            
                            // Aktifkan tab yang diklik
                            this.classList.add('active');
                            document.getElementById(tabName).classList.add('active');
                        });
                    });
                }
                
                // Tambahkan event listener untuk button jalankan kode
                const runButtons = modulDisplay.querySelectorAll('.run-button');
                runButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const codeElement = this.previousElementSibling;
                        const resultFrame = this.nextElementSibling;
                        
                        if (codeElement && resultFrame) {
                            const code = codeElement.textContent;
                            resultFrame.srcdoc = code;
                        }
                    });
                });
            })
            .catch(error => {
                modulDisplay.innerHTML = `
                    <div class="error">
                        <h3>Terjadi Kesalahan</h3>
                        <p>${error.message}. Silakan coba lagi nanti.</p>
                    </div>
                `;
            });
    }
    
    // Smooth scrolling untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});