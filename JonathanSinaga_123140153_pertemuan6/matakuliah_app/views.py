from pyramid.view import view_config
from pyramid.response import Response
import json
from sqlalchemy.exc import IntegrityError
from .models import DBSession, Matakuliah

class MatakuliahViews:
    def __init__(self, request):
        self.request = request
        self.dbsession = DBSession

    @view_config(route_name='get_all_matakuliah', renderer='json')
    def get_all_matakuliah(self):
        """Mengambil semua data matakuliah"""
        try:
            matakuliah_list = self.dbsession.query(Matakuliah).all()
            return {
                'status': 'success',
                'data': [mk.to_dict() for mk in matakuliah_list],
                'count': len(matakuliah_list)
            }
        except Exception as e:
            return Response(
                json.dumps({'status': 'error', 'message': str(e)}),
                status=500,
                content_type='application/json'
            )

    @view_config(route_name='get_matakuliah', renderer='json')
    def get_matakuliah(self):
        """Mengambil satu data matakuliah berdasarkan ID"""
        try:
            matakuliah_id = int(self.request.matchdict['id'])
            matakuliah = self.dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()
            
            if not matakuliah:
                return Response(
                    json.dumps({'status': 'error', 'message': 'Matakuliah tidak ditemukan'}),
                    status=404,
                    content_type='application/json'
                )
            
            return {
                'status': 'success',
                'data': matakuliah.to_dict()
            }
        except ValueError:
            return Response(
                json.dumps({'status': 'error', 'message': 'ID harus berupa angka'}),
                status=400,
                content_type='application/json'
            )
        except Exception as e:
            return Response(
                json.dumps({'status': 'error', 'message': str(e)}),
                status=500,
                content_type='application/json'
            )

    @view_config(route_name='create_matakuliah', renderer='json')
    def create_matakuliah(self):
        """Menambah data matakuliah baru"""
        try:
            # Validasi input
            if not self.request.json_body:
                return Response(
                    json.dumps({'status': 'error', 'message': 'Data harus berupa JSON'}),
                    status=400,
                    content_type='application/json'
                )
            
            data = self.request.json_body
            
            # Validasi field wajib
            required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
            for field in required_fields:
                if field not in data or not data[field]:
                    return Response(
                        json.dumps({'status': 'error', 'message': f'Field {field} harus diisi'}),
                        status=400,
                        content_type='application/json'
                    )
            
            # Validasi tipe data
            if not isinstance(data['sks'], int) or data['sks'] <= 0:
                return Response(
                    json.dumps({'status': 'error', 'message': 'SKS harus berupa angka positif'}),
                    status=400,
                    content_type='application/json'
                )
            
            if not isinstance(data['semester'], int) or data['semester'] <= 0:
                return Response(
                    json.dumps({'status': 'error', 'message': 'Semester harus berupa angka positif'}),
                    status=400,
                    content_type='application/json'
                )
            
            # Buat objek matakuliah baru
            matakuliah = Matakuliah(
                kode_mk=data['kode_mk'].strip(),
                nama_mk=data['nama_mk'].strip(),
                sks=data['sks'],
                semester=data['semester']
            )
            
            self.dbsession.add(matakuliah)
            self.dbsession.flush()
            
            return {
                'status': 'success',
                'message': 'Matakuliah berhasil ditambahkan',
                'data': matakuliah.to_dict()
            }
            
        except IntegrityError:
            return Response(
                json.dumps({'status': 'error', 'message': 'Kode MK sudah ada'}),
                status=400,
                content_type='application/json'
            )
        except Exception as e:
            return Response(
                json.dumps({'status': 'error', 'message': str(e)}),
                status=500,
                content_type='application/json'
            )

    @view_config(route_name='update_matakuliah', renderer='json')
    def update_matakuliah(self):
        """Update data matakuliah berdasarkan ID"""
        try:
            matakuliah_id = int(self.request.matchdict['id'])
            matakuliah = self.dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()
            
            if not matakuliah:
                return Response(
                    json.dumps({'status': 'error', 'message': 'Matakuliah tidak ditemukan'}),
                    status=404,
                    content_type='application/json'
                )
            
            if not self.request.json_body:
                return Response(
                    json.dumps({'status': 'error', 'message': 'Data harus berupa JSON'}),
                    status=400,
                    content_type='application/json'
                )
            
            data = self.request.json_body
            
            # Update field yang ada di request
            if 'kode_mk' in data:
                matakuliah.kode_mk = data['kode_mk'].strip()
            if 'nama_mk' in data:
                matakuliah.nama_mk = data['nama_mk'].strip()
            if 'sks' in data:
                if not isinstance(data['sks'], int) or data['sks'] <= 0:
                    return Response(
                        json.dumps({'status': 'error', 'message': 'SKS harus berupa angka positif'}),
                        status=400,
                        content_type='application/json'
                    )
                matakuliah.sks = data['sks']
            if 'semester' in data:
                if not isinstance(data['semester'], int) or data['semester'] <= 0:
                    return Response(
                        json.dumps({'status': 'error', 'message': 'Semester harus berupa angka positif'}),
                        status=400,
                        content_type='application/json'
                    )
                matakuliah.semester = data['semester']
            
            self.dbsession.flush()
            
            return {
                'status': 'success',
                'message': 'Matakuliah berhasil diupdate',
                'data': matakuliah.to_dict()
            }
            
        except IntegrityError:
            return Response(
                json.dumps({'status': 'error', 'message': 'Kode MK sudah ada'}),
                status=400,
                content_type='application/json'
            )
        except ValueError:
            return Response(
                json.dumps({'status': 'error', 'message': 'ID harus berupa angka'}),
                status=400,
                content_type='application/json'
            )
        except Exception as e:
            return Response(
                json.dumps({'status': 'error', 'message': str(e)}),
                status=500,
                content_type='application/json'
            )

    @view_config(route_name='delete_matakuliah', renderer='json')
    def delete_matakuliah(self):
        """Hapus data matakuliah berdasarkan ID"""
        try:
            matakuliah_id = int(self.request.matchdict['id'])
            matakuliah = self.dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()
            
            if not matakuliah:
                return Response(
                    json.dumps({'status': 'error', 'message': 'Matakuliah tidak ditemukan'}),
                    status=404,
                    content_type='application/json'
                )
            
            self.dbsession.delete(matakuliah)
            
            return {
                'status': 'success',
                'message': 'Matakuliah berhasil dihapus'
            }
            
        except ValueError:
            return Response(
                json.dumps({'status': 'error', 'message': 'ID harus berupa angka'}),
                status=400,
                content_type='application/json'
            )
        except Exception as e:
            return Response(
                json.dumps({'status': 'error', 'message': str(e)}),
                status=500,
                content_type='application/json'
            )