# PROGRAM PENGELOLAAN DATA NILAI MAHASISWA
# =========================================

# Data awal mahasiswa (minimal 5 dictionary)
data_mahasiswa = [
    {"nama": "Ahmad Fauzi", "nim": "20210001", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Siti Aminah", "nim": "20210002", "nilai_uts": 75, "nilai_uas": 80, "nilai_tugas": 78},
    {"nama": "Budi Santoso", "nim": "20210003", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 68},
    {"nama": "Dewi Lestari", "nim": "20210004", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
    {"nama": "Rizki Pratama", "nim": "20210005", "nilai_uts": 45, "nilai_uas": 50, "nilai_tugas": 48}
]

# FUNGSI-FUNGSI UTAMA
# ===================

def hitung_nilai_akhir(uts, uas, tugas):
    """
    Menghitung nilai akhir berdasarkan rumus:
    0.3 * UTS + 0.4 * UAS + 0.3 * Tugas
    """
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas

def tentukan_grade(nilai_akhir):
    """
    Menentukan grade berdasarkan nilai akhir
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def tampilkan_data_mahasiswa(data):
    """
    Menampilkan data mahasiswa dalam format tabel yang rapi
    """
    if not data:
        print("Tidak ada data mahasiswa!")
        return
    
    print("\n" + "=" * 100)
    print(f"{'NAMA':<15} {'NIM':<12} {'UTS':<6} {'UAS':<6} {'TUGAS':<8} {'NILAI AKHIR':<12} {'GRADE':<6}")
    print("=" * 100)
    
    for mahasiswa in data:
        nilai_akhir = hitung_nilai_akhir(
            mahasiswa["nilai_uts"], 
            mahasiswa["nilai_uas"], 
            mahasiswa["nilai_tugas"]
        )
        grade = tentukan_grade(nilai_akhir)
        
        print(f"{mahasiswa['nama']:<15} {mahasiswa['nim']:<12} "
              f"{mahasiswa['nilai_uts']:<6} {mahasiswa['nilai_uas']:<6} "
              f"{mahasiswa['nilai_tugas']:<8} {nilai_akhir:<12.2f} {grade:<6}")
    
    print("=" * 100)

def cari_nilai_ekstrem(data):
    """
    Mencari mahasiswa dengan nilai akhir tertinggi dan terendah
    """
    if not data:
        print("Tidak ada data mahasiswa!")
        return None, None
    
    tertinggi = data[0]
    terendah = data[0]
    
    for mahasiswa in data:
        nilai_mhs = hitung_nilai_akhir(
            mahasiswa["nilai_uts"], 
            mahasiswa["nilai_uas"], 
            mahasiswa["nilai_tugas"]
        )
        
        nilai_tertinggi = hitung_nilai_akhir(
            tertinggi["nilai_uts"], 
            tertinggi["nilai_uas"], 
            tertinggi["nilai_tugas"]
        )
        
        nilai_terendah = hitung_nilai_akhir(
            terendah["nilai_uts"], 
            terendah["nilai_uas"], 
            terendah["nilai_tugas"]
        )
        
        if nilai_mhs > nilai_tertinggi:
            tertinggi = mahasiswa
        if nilai_mhs < nilai_terendah:
            terendah = mahasiswa
    
    return tertinggi, terendah

# FITUR TAMBAHAN
# ==============

def tambah_mahasiswa():
    """
    Fitur input untuk menambah data mahasiswa baru
    """
    print("\n--- TAMBAH MAHASISWA BARU ---")
    
    nama = input("Masukkan Nama: ")
    nim = input("Masukkan NIM: ")
    
    # Validasi input nilai
    try:
        uts = float(input("Masukkan Nilai UTS: "))
        uas = float(input("Masukkan Nilai UAS: "))
        tugas = float(input("Masukkan Nilai Tugas: "))
        
        # Validasi range nilai (0-100)
        if not (0 <= uts <= 100 and 0 <= uas <= 100 and 0 <= tugas <= 100):
            print("Error: Nilai harus antara 0-100!")
            return
    except ValueError:
        print("Error: Nilai harus berupa angka!")
        return
    
    # Tambahkan ke data
    mahasiswa_baru = {
        "nama": nama,
        "nim": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    }
    
    data_mahasiswa.append(mahasiswa_baru)
    print(f"Mahasiswa {nama} berhasil ditambahkan!")

def filter_berdasarkan_grade():
    """
    Fitur filter mahasiswa berdasarkan grade tertentu
    """
    print("\n--- FILTER BERDASARKAN GRADE ---")
    print("Pilih grade: A, B, C, D, E")
    grade_input = input("Masukkan grade: ").upper()
    
    if grade_input not in ["A", "B", "C", "D", "E"]:
        print("Grade tidak valid!")
        return
    
    hasil_filter = []
    for mahasiswa in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(
            mahasiswa["nilai_uts"], 
            mahasiswa["nilai_uas"], 
            mahasiswa["nilai_tugas"]
        )
        grade = tentukan_grade(nilai_akhir)
        
        if grade == grade_input:
            hasil_filter.append(mahasiswa)
    
    if hasil_filter:
        print(f"\nMahasiswa dengan grade {grade_input}:")
        tampilkan_data_mahasiswa(hasil_filter)
    else:
        print(f"Tidak ada mahasiswa dengan grade {grade_input}")

def hitung_rata_rata_kelas():
    """
    Menghitung rata-rata nilai akhir seluruh kelas
    """
    if not data_mahasiswa:
        print("Tidak ada data mahasiswa!")
        return
    
    total_nilai = 0
    for mahasiswa in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(
            mahasiswa["nilai_uts"], 
            mahasiswa["nilai_uas"], 
            mahasiswa["nilai_tugas"]
        )
        total_nilai += nilai_akhir
    
    rata_rata = total_nilai / len(data_mahasiswa)
    print(f"\nRata-rata nilai akhir seluruh kelas: {rata_rata:.2f}")

# MENU UTAMA DAN INTERFACE
# =========================

def tampilkan_menu():
    """
    Menampilkan menu utama program
    """
    print("\n" + "=" * 50)
    print("     PROGRAM PENGELOLAAN DATA NILAI MAHASISWA")
    print("=" * 50)
    print("1. Tampilkan Semua Data Mahasiswa")
    print("2. Tambah Mahasiswa Baru")
    print("3. Cari Nilai Tertinggi dan Terendah")
    print("4. Filter Berdasarkan Grade")
    print("5. Hitung Rata-rata Kelas")
    print("6. Keluar")
    print("=" * 50)

def main():
    """
    Fungsi utama program dengan menu interaktif
    """
    print("Selamat datang di Program Pengelolaan Data Nilai Mahasiswa!")
    
    while True:
        tampilkan_menu()
        pilihan = input("Masukkan pilihan (1-6): ")
        
        if pilihan == "1":
            tampilkan_data_mahasiswa(data_mahasiswa)
        
        elif pilihan == "2":
            tambah_mahasiswa()
        
        elif pilihan == "3":
            tertinggi, terendah = cari_nilai_ekstrem(data_mahasiswa)
            if tertinggi and terendah:
                print("\n--- NILAI EKSTREM ---")
                print("Nilai Tertinggi:")
                tampilkan_data_mahasiswa([tertinggi])
                print("\nNilai Terendah:")
                tampilkan_data_mahasiswa([terendah])
        
        elif pilihan == "4":
            filter_berdasarkan_grade()
        
        elif pilihan == "5":
            hitung_rata_rata_kelas()
        
        elif pilihan == "6":
            print("Terima kasih telah menggunakan program ini!")
            break
        
        else:
            print("Pilihan tidak valid! Silakan pilih 1-6.")
        
        # Tunggu user menekan enter sebelum melanjutkan
        input("\nTekan Enter untuk melanjutkan...")

# JALANKAN PROGRAM
# ================
if __name__ == "__main__":
    main()