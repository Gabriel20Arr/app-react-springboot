package com.apirest.apirestfull.controller;

import java.security.Principal;
import java.util.List;

import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apirest.apirestfull.dto.Mensaje;
import com.apirest.apirestfull.dto.ProductoDto;
import com.apirest.apirestfull.entity.Producto;
import com.apirest.apirestfull.security.entity.Usuario;
import com.apirest.apirestfull.security.service.UsuarioService;
import com.apirest.apirestfull.service.ProductoService;

import io.micrometer.common.util.StringUtils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    @Autowired
    ProductoService productoService;

    @Autowired 
    UsuarioService usuarioService;

    @GetMapping("")
    public ResponseEntity<List<Producto>> findAll(Principal principal){
        //? Obtenemos el usaurio 
        Usuario usuario = usuarioService.getByNombreUsuario(principal.getName()).orElseThrow();
        List<Producto> listProduct = productoService.findByUsuarioId(usuario.getId());
        // obterner usuario
        return new ResponseEntity<>(listProduct, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id, Principal principal){
        if(!productoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("El producto solicitado no existe"), HttpStatus.NOT_FOUND);

        //? Obtener User
        Usuario usuario = usuarioService.getByNombreUsuario(principal.getName()).orElseThrow();
        //? obtenemos el Product
        Producto producto = productoService.getOne(id).orElse(null);

        if (producto != null && producto.getUsuario().getId() != usuario.getId()) {
            return new ResponseEntity<>(new Mensaje("No tienes permiso para actualizar este producto"), HttpStatus.FORBIDDEN);
        }
        
        return new ResponseEntity<>(producto, HttpStatus.OK);
    }


    @PostMapping("/nuevo")
    public ResponseEntity<Mensaje> create(@RequestBody ProductoDto productoDto, Principal principal){
        if(StringUtils.isBlank(productoDto.getNombre())){
            return new ResponseEntity<Mensaje>(new Mensaje("El nombre del producto es obligatorio"), HttpStatus.BAD_REQUEST);
        }else if(productoDto.getPrecio()==null || productoDto.getPrecio() < 0){ 
            return new ResponseEntity<Mensaje>(new Mensaje("El precio del producto debe ser mayor que 0.0"), HttpStatus.BAD_REQUEST);
        }else if(productoService.existsByNombre(productoDto.getNombre())){ 
            return new ResponseEntity<Mensaje>(new Mensaje("El nombre " + productoDto.getNombre() + " ya se encuentra registrado"), HttpStatus.BAD_REQUEST);
        }else{
            Usuario usuario = usuarioService.getByNombreUsuario(principal.getName()).orElseThrow();
            Producto producto = new Producto(
                0, 
                productoDto.getNombre(), 
                productoDto.getPrecio(),
                productoDto.getPeso(),
                productoDto.getAltura(),
                productoDto.getDescripcion(),
                productoDto.getUrlimg(),
                usuario
            );
            productoService.create(producto);

            return new ResponseEntity<>(new Mensaje("Producto creado exitosamente"), HttpStatus.OK);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mensaje> update(@PathVariable("id") int id, @RequestBody ProductoDto productoDto, Principal principal){
        if(!productoService.existsById(id))
            return new ResponseEntity<Mensaje>(new Mensaje("El producto no existe"), HttpStatus.NOT_FOUND);

        //? Obtener User
        Usuario usuario = usuarioService.getByNombreUsuario(principal.getName()).orElseThrow();
        //? obtenemos el Product
        Producto producto = productoService.getOne(id).orElse(null);

        if (producto != null && producto.getUsuario().getId() != usuario.getId()) {
            return new ResponseEntity<>(new Mensaje("No tienes permiso para actualizar este producto"), HttpStatus.FORBIDDEN);
        }
            
        if(productoService.existsByNombre(productoDto.getNombre()) && productoService.getByNombre(productoDto.getNombre()).get().getId() != id)
            return new ResponseEntity<Mensaje>(new Mensaje("El nombre " + productoDto.getNombre() + " ya se encuentra registrado"), HttpStatus.BAD_REQUEST);
            
        if(StringUtils.isBlank(productoDto.getNombre()))
            return new ResponseEntity<Mensaje>(new Mensaje("El nombre del producto es obligatorio"), HttpStatus.BAD_REQUEST);
            
        if(productoDto.getPrecio()==null || productoDto.getPrecio() < 0)
            return new ResponseEntity<Mensaje>(new Mensaje("El precio del producto debe ser mayor que 0.0"), HttpStatus.BAD_REQUEST);

        producto.setNombre(productoDto.getNombre());
        producto.setPrecio(productoDto.getPrecio());
        producto.setPeso(productoDto.getPeso());
        producto.setAltura(productoDto.getAltura());
        producto.setDescripcion(productoDto.getDescripcion());
        producto.setUrlimg(productoDto.getUrlimg());
        productoService.create(producto);
        
        return new ResponseEntity<Mensaje>(new Mensaje("Producto actulizado correctamente"), HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Mensaje> delete(@PathVariable("id") int id, Principal principal){
        if(!productoService.existsById(id))
            return new ResponseEntity<Mensaje>(new Mensaje("El productoa eliminar no existe"), HttpStatus.NOT_FOUND);
        
        //? Obtener User
        Usuario usuario = usuarioService.getByNombreUsuario(principal.getName()).orElseThrow();
        //? obtenemos el Product
        Producto producto = productoService.getOne(id).orElse(null);

        if (producto != null && producto.getUsuario().getId() != usuario.getId()) {
            return new ResponseEntity<>(new Mensaje("No tienes permiso para actualizar este producto"), HttpStatus.FORBIDDEN);
        }
            
        productoService.delete(id);
        return new ResponseEntity<Mensaje>(new Mensaje("Producto eliminado correctamente"), HttpStatus.OK);
        
    }            
}
