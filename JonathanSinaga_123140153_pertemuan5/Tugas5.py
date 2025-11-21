from abc import ABC, abstractmethod
from typing import List, Optional

class LibraryItem(ABC):
    """
    Abstract class untuk merepresentasikan item perpustakaan.
    Class ini menjadi base class untuk semua jenis item di perpustakaan.
    """
    
    def __init__(self, item_id: str, title: str):
        """
        Constructor untuk LibraryItem
        
        Args:
            item_id (str): ID unik untuk item
            title (str): Judul item
        """
        self._id = item_id  # protected attribute
        self._title = title  # protected attribute
        self._is_available = True  # protected attribute
    
    @property
    def id(self) -> str:
        """Getter untuk id menggunakan property decorator"""
        return self._id
    
    @id.setter
    def id(self, value: str):
        """Setter untuk id dengan validasi"""
        if not value or not isinstance(value, str):
            raise ValueError("ID harus string yang tidak kosong")
        self._id = value
    
    @property
    def title(self) -> str:
        """Getter untuk title"""
        return self._title
    
    @title.setter
    def title(self, value: str):
        """Setter untuk title dengan validasi"""
        if not value or not isinstance(value, str):
            raise ValueError("Judul harus string yang tidak kosong")
        self._title = value
    
    @property
    def is_available(self) -> bool:
        """Getter untuk status ketersediaan"""
        return self._is_available
    
    def borrow_item(self):
        """Method untuk meminjam item"""
        if not self._is_available:
            raise ValueError("Item sedang tidak tersedia")
        self._is_available = False
    
    def return_item(self):
        """Method untuk mengembalikan item"""
        self._is_available = True
    
    @abstractmethod
    def display_info(self):
        """
        Abstract method untuk menampilkan informasi item.
        Harus diimplementasikan oleh subclass.
        """
        pass
    
    def __str__(self):
        """String representation dari item"""
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"{self._id}: {self._title} - {status}"


class Book(LibraryItem):
    """
    Subclass untuk merepresentasikan buku.
    Mewarisi dari LibraryItem.
    """
    
    def __init__(self, item_id: str, title: str, author: str, isbn: str, pages: int):
        """
        Constructor untuk Book
        
        Args:
            item_id (str): ID buku
            title (str): Judul buku
            author (str): Penulis buku
            isbn (str): ISBN buku
            pages (int): Jumlah halaman
        """
        super().__init__(item_id, title)
        self._author = author  # protected attribute
        self._isbn = isbn  # protected attribute
        self._pages = pages  # protected attribute
    
    @property
    def author(self) -> str:
        """Getter untuk author"""
        return self._author
    
    @property
    def isbn(self) -> str:
        """Getter untuk ISBN"""
        return self._isbn
    
    @property
    def pages(self) -> int:
        """Getter untuk jumlah halaman"""
        return self._pages
    
    def display_info(self):
        """
        Implementasi method abstract display_info() untuk Book.
        Menunjukkan polymorphism dengan implementasi yang berbeda.
        """
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"=== INFORMASI BUKU ===")
        print(f"ID: {self.id}")
        print(f"Judul: {self.title}")
        print(f"Penulis: {self.author}")
        print(f"ISBN: {self.isbn}")
        print(f"Halaman: {self.pages}")
        print(f"Status: {status}")
        print("=" * 20)


class Magazine(LibraryItem):
    """
    Subclass untuk merepresentasikan majalah.
    Mewarisi dari LibraryItem.
    """
    
    def __init__(self, item_id: str, title: str, issue: str, publisher: str, publication_date: str):
        """
        Constructor untuk Magazine
        
        Args:
            item_id (str): ID majalah
            title (str): Judul majalah
            issue (str): Edisi majalah
            publisher (str): Penerbit
            publication_date (str): Tanggal terbit
        """
        super().__init__(item_id, title)
        self._issue = issue  # protected attribute
        self._publisher = publisher  # protected attribute
        self._publication_date = publication_date  # protected attribute
    
    @property
    def issue(self) -> str:
        """Getter untuk issue/edisi"""
        return self._issue
    
    @property
    def publisher(self) -> str:
        """Getter untuk publisher"""
        return self._publisher
    
    @property
    def publication_date(self) -> str:
        """Getter untuk tanggal terbit"""
        return self._publication_date
    
    def display_info(self):
        """
        Implementasi method abstract display_info() untuk Magazine.
        Menunjukkan polymorphism dengan implementasi yang berbeda dari Book.
        """
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"=== INFORMASI MAJALAH ===")
        print(f"ID: {self.id}")
        print(f"Judul: {self.title}")
        print(f"Edisi: {self.issue}")
        print(f"Penerbit: {self.publisher}")
        print(f"Tanggal Terbit: {self.publication_date}")
        print(f"Status: {status}")
        print("=" * 25)


class Library:
    """
    Class untuk mengelola koleksi perpustakaan.
    Bertanggung jawab atas manajemen item LibraryItem.
    """
    
    def __init__(self):
        """Constructor untuk Library"""
        self._items = []  # private attribute - encapsulation
    
    def add_item(self, item: LibraryItem):
        """
        Menambahkan item ke dalam koleksi perpustakaan
        
        Args:
            item (LibraryItem): Item yang akan ditambahkan
        """
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan instance dari LibraryItem")
        
        # Cek apakah ID sudah ada
        for existing_item in self._items:
            if existing_item.id == item.id:
                raise ValueError(f"Item dengan ID {item.id} sudah ada")
        
        self._items.append(item)
        print(f"Item '{item.title}' berhasil ditambahkan ke perpustakaan")
    
    def display_all_items(self):
        """Menampilkan semua item dalam perpustakaan"""
        if not self._items:
            print("Perpustakaan kosong")
            return
        
        print(f"\n=== DAFTAR SEMUA ITEM PERPUSTAKAAN ===")
        print(f"Total item: {len(self._items)}")
        print("-" * 40)
        
        for i, item in enumerate(self._items, 1):
            print(f"{i}. {item}")
    
    def find_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item berdasarkan ID
        
        Args:
            item_id (str): ID yang dicari
            
        Returns:
            Optional[LibraryItem]: Item yang ditemukan atau None
        """
        for item in self._items:
            if item.id == item_id:
                return item
        return None
    
    def find_by_title(self, title: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan judul (case-insensitive)
        
        Args:
            title (str): Judul yang dicari
            
        Returns:
            List[LibraryItem]: List item yang sesuai
        """
        results = []
        for item in self._items:
            if title.lower() in item.title.lower():
                results.append(item)
        return results
    
    def search_items(self, search_term: str):
        """
        Mencari item berdasarkan ID atau judul dan menampilkan hasilnya
        
        Args:
            search_term (str): Kata kunci pencarian
        """
        print(f"\n=== HASIL PENCARIAN: '{search_term}' ===")
        
        # Coba cari berdasarkan ID terlebih dahulu
        item_by_id = self.find_by_id(search_term)
        if item_by_id:
            print("Ditemukan berdasarkan ID:")
            item_by_id.display_info()
            return
        
        # Jika tidak ditemukan berdasarkan ID, cari berdasarkan judul
        items_by_title = self.find_by_title(search_term)
        if items_by_title:
            print(f"Ditemukan {len(items_by_title)} item berdasarkan judul:")
            for i, item in enumerate(items_by_title, 1):
                print(f"\n{i}.")
                item.display_info()
        else:
            print("Tidak ditemukan item yang sesuai dengan pencarian")
    
    def get_total_items(self) -> int:
        """Mengembalikan total jumlah item dalam perpustakaan"""
        return len(self._items)


def main():
    """
    Fungsi utama untuk demonstrasi penggunaan program
    """
    # Membuat instance Library
    library = Library()
    
    print("=== SISTEM MANAJEMEN PERPUSTAKAAN ===")
    
    # Membuat beberapa item
    try:
        # Membuat buku
        book1 = Book("B001", "Python Programming", "John Doe", "978-0134853456", 350)
        book2 = Book("B002", "Data Structures", "Jane Smith", "978-0262533058", 450)
        
        # Membuat majalah
        magazine1 = Magazine("M001", "Tech Monthly", "Vol. 15 No. 3", "Tech Media", "2024-03-01")
        magazine2 = Magazine("M002", "Science Today", "Issue 2024-02", "Science Press", "2024-02-15")
        
        # Menambahkan item ke perpustakaan
        library.add_item(book1)
        library.add_item(book2)
        library.add_item(magazine1)
        library.add_item(magazine2)
        
        print("\n" + "="*50)
        
        # Menampilkan semua item
        library.display_all_items()
        
        print("\n" + "="*50)
        
        # Demonstrasi pencarian berdasarkan ID
        print("\n1. PENCARIAN BERDASARKAN ID:")
        library.search_items("B001")
        
        print("\n2. PENCARIAN BERDASARKAN JUDUL:")
        library.search_items("Tech")
        
        print("\n3. PENCARIAN YANG TIDAK DITEMUKAN:")
        library.search_items("Nonexistent")
        
        print("\n" + "="*50)
        
        # Demonstrasi polymorphism
        print("\n4. DEMONSTRASI POLYMORPHISM:")
        print("Memanggil display_info() pada berbagai jenis item:")
        
        items = [book1, magazine1]
        for item in items:
            item.display_info()
        
        print("\n" + "="*50)
        
        # Demonstrasi encapsulation dan property decorator
        print("\n5. DEMONSTRASI ENCAPSULATION DAN PROPERTY:")
        print(f"ID buku 1: {book1.id}")
        print(f"Judul buku 1: {book1.title}")
        
        # Menggunakan setter
        book1.title = "Advanced Python Programming"
        print(f"Judul buku 1 setelah diubah: {book1.title}")
        
        # Demonstrasi peminjaman dan pengembalian
        print("\n6. DEMONSTRASI PEMINJAMAN:")
        print(f"Status sebelum dipinjam: {'Tersedia' if book1.is_available else 'Dipinjam'}")
        book1.borrow_item()
        print(f"Status setelah dipinjam: {'Tersedia' if book1.is_available else 'Dipinjam'}")
        book1.return_item()
        print(f"Status setelah dikembalikan: {'Tersedia' if book1.is_available else 'Dipinjam'}")
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()