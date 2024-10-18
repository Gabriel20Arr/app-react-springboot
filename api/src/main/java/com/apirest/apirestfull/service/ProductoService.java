package com.apirest.apirestfull.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apirest.apirestfull.entity.Producto;
import com.apirest.apirestfull.repository.ProductoRepository;

@Service
@Transactional
public class ProductoService {
    @Autowired
    ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    public List<Producto> list(){
        return productoRepository.findAll();
    } 

    @Transactional(readOnly = true)
    public List<Producto> findByUsuarioId(int usuarioId){
        return productoRepository.findByUsuarioId(usuarioId);
    }

    @Transactional(readOnly = true)
    public Optional<Producto> getOne(int id) {
        return productoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public boolean existsById(int id){
        return productoRepository.existsById(id);
    }
    
    @Transactional(readOnly = true)
    public Optional<Producto> getByNombre(String nombre){
        return productoRepository.findByNombre(nombre);
    }
    
    @Transactional(readOnly = true)
    public boolean existsByNombre(String nombre){
        return productoRepository.existsByNombre(nombre);
    }

    @Transactional
    public void create(Producto producto){
        productoRepository.save(producto);
    }

    @Transactional
    public void delete(int id) {
        productoRepository.deleteById(id);
    }

}
