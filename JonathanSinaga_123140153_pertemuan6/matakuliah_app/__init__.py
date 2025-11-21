from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import (
    DBSession,
    Base,
)

def main(global_config, **settings):
    """Function returns a Pyramid WSGI application."""
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    
    config = Configurator(settings=settings)
    config.include('pyramid_tm')
    config.include('pyramid_retry')
    
    # Add routes dengan request_method yang spesifik
    config.add_route('get_all_matakuliah', '/api/matakuliah', request_method='GET')
    config.add_route('create_matakuliah', '/api/matakuliah', request_method='POST')
    config.add_route('get_matakuliah', '/api/matakuliah/{id}', request_method='GET')
    config.add_route('update_matakuliah', '/api/matakuliah/{id}', request_method='PUT')
    config.add_route('delete_matakuliah', '/api/matakuliah/{id}', request_method='DELETE')
    
    config.scan('.views')
    return config.make_wsgi_app()