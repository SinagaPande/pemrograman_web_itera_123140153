import os
import sys

# Tambahkan path project ke sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine
from matakuliah_app.models import DBSession, Base, Matakuliah

def seed_data():
    """Script untuk menambahkan data awal matakuliah"""
    
    # Konfigurasi database
    database_url = 'sqlite:///matakuliah.db'
    engine = create_engine(database_url)
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    
    # Data matakuliah yang akan ditambahkan
    matakuliah_data = [
        {
            'kode_mk': 'MK001',
            'nama_mk': 'Pemrograman Web',
            'sks': 3,
            'semester': 4
        },
        {
            'kode_mk': 'MK002', 
            'nama_mk': 'Basis Data',
            'sks': 3,
            'semester': 3
        },
        {
            'kode_mk': 'MK003',
            'nama_mk': 'Algoritma dan Struktur Data',
            'sks': 4,
            'semester': 2
        }
    ]
    
    try:
        # Cek apakah data sudah ada
        existing_data = DBSession.query(Matakuliah).count()
        
        if existing_data > 0:
            print("⚠️  Data sudah ada, skipping seeding...")
            return
        
        # Tambahkan data baru
        for data in matakuliah_data:
            matakuliah = Matakuliah(
                kode_mk=data['kode_mk'],
                nama_mk=data['nama_mk'],
                sks=data['sks'],
                semester=data['semester']
            )
            DBSession.add(matakuliah)
        
        DBSession.commit()
        print("✅ Data matakuliah berhasil ditambahkan!")
        print("📊 Data yang ditambahkan:")
        
        # Tampilkan data yang berhasil ditambahkan
        all_matakuliah = DBSession.query(Matakuliah).all()
        for mk in all_matakuliah:
            print(f"  - {mk.kode_mk}: {mk.nama_mk} ({mk.sks} SKS) - Semester {mk.semester}")
            
    except Exception as e:
        DBSession.rollback()
        print(f"❌ Error: {e}")
    finally:
        DBSession.remove()

if __name__ == '__main__':
    seed_data()