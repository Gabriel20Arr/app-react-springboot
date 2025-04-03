package com.apirest.apirestfull.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.apirest.apirestfull.dto.Mensaje;
import com.apirest.apirestfull.dto.ProductoDto;
import com.apirest.apirestfull.entity.Producto;
import com.apirest.apirestfull.security.entity.Usuario;
import com.apirest.apirestfull.security.service.UsuarioService;
import com.apirest.apirestfull.service.ProductoService;
import com.apirest.apirestfull.service.CloudinaryService;

import io.micrometer.common.util.StringUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Controlador para gestionar productos
 * @author [Tu nombre]
 */
@RestController
@RequestMapping("api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    @Autowired
    ProductoService productoService;

    @Autowired 
    UsuarioService usuarioService;

    @Autowired
    CloudinaryService cloudinaryService;

    /**
     * Obtiene todos los productos
     * @return Lista de productos
     */
    @GetMapping("")
    public ResponseEntity<List<Producto>> findAll(){
        // Obtener todos los productos sin filtrar por usuario
        List<Producto> listProduct = productoService.list();
        return new ResponseEntity<>(listProduct, HttpStatus.OK);
    }

    /**
     * Obtiene los productos del usuario actual
     * @param principal Información del usuario actual
     * @return Lista de productos del usuario actual
     */
    @GetMapping("/mis-productos")
    public ResponseEntity<List<Producto>> findMyProducts(Principal principal){
        Usuario usuario = usuarioService.getByNombreUsuario(principal.getName()).orElseThrow();
        List<Producto> listProduct = productoService.findByUsuarioId(usuario.getId());
        return new ResponseEntity<>(listProduct, HttpStatus.OK);
    }

    /**
     * Obtiene un producto por ID
     * @param id ID del producto
     * @return Producto con el ID especificado
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id){
        if(!productoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("El producto solicitado no existe"), HttpStatus.NOT_FOUND);
        
        Producto producto = productoService.getOne(id).orElse(null);
        return new ResponseEntity<>(producto, HttpStatus.OK);
    }

    /**
     * Crea un nuevo producto (solo para administradores)
     * @param productoDto Información del producto a crear
     * @param imagen Imagen del producto
     * @param principal Información del usuario actual
     * @return Mensaje de confirmación
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/nuevo")
    public ResponseEntity<Mensaje> create(
            @RequestPart("producto") ProductoDto productoDto,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen,
            Principal principal) {
        
        if(StringUtils.isBlank(productoDto.getNombre())){
            return new ResponseEntity<>(new Mensaje("El nombre del producto es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if(productoDto.getPrecio()==null || productoDto.getPrecio() < 0){ 
            return new ResponseEntity<>(new Mensaje("El precio del producto debe ser mayor que 0.0"), HttpStatus.BAD_REQUEST);
        }
        if(productoService.existsByNombre(productoDto.getNombre())){ 
            return new ResponseEntity<>(new Mensaje("El nombre " + productoDto.getNombre() + " ya se encuentra registrado"), HttpStatus.BAD_REQUEST);
        }

        Usuario usuario = usuarioService.getByNombreUsuario(principal.getName()).orElseThrow();
        Producto producto = new Producto(
            0, 
            productoDto.getNombre(), 
            productoDto.getPrecio(),
            productoDto.getPeso(),
            productoDto.getAltura(),
            productoDto.getAncho(),
            productoDto.getStock(),
            productoDto.getDescripcion(),
            productoDto.getFeatured(),
            productoDto.getCategoria(),
            usuario
        );

        // Subir imagen si está presente
        if (imagen != null && !imagen.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(imagen);
            producto.setImagen(imageUrl);
        }

        productoService.create(producto);
        return new ResponseEntity<>(new Mensaje("Producto creado exitosamente"), HttpStatus.OK);
    }

    /**
     * Actualiza un producto existente (solo para administradores)
     * @param id ID del producto a actualizar
     * @param productoJson JSON del producto actualizado
     * @param imagen Imagen del producto
     * @return Mensaje de confirmación
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Mensaje> update(
            @PathVariable("id") int id,
            @RequestPart("producto") String productoJson,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen) {
        
        try {
            System.out.println("Recibiendo actualización para producto ID: " + id);
            System.out.println("Datos JSON recibidos: " + productoJson);
            
            // Convertir el JSON a ProductoDto
            ObjectMapper objectMapper = new ObjectMapper();
            ProductoDto productoDto = objectMapper.readValue(productoJson, ProductoDto.class);
            
            System.out.println("ProductoDto convertido: " + productoDto.toString());
            
            if(!productoService.existsById(id))
                return new ResponseEntity<>(new Mensaje("El producto no existe"), HttpStatus.NOT_FOUND);
                
            if(productoService.existsByNombre(productoDto.getNombre()) && 
               productoService.getByNombre(productoDto.getNombre()).get().getId() != id)
                return new ResponseEntity<>(new Mensaje("El nombre " + productoDto.getNombre() + " ya se encuentra registrado"), HttpStatus.BAD_REQUEST);
                
            if(StringUtils.isBlank(productoDto.getNombre()))
                return new ResponseEntity<>(new Mensaje("El nombre del producto es obligatorio"), HttpStatus.BAD_REQUEST);
                
            if(productoDto.getPrecio()==null || productoDto.getPrecio() < 0)
                return new ResponseEntity<>(new Mensaje("El precio del producto debe ser mayor que 0.0"), HttpStatus.BAD_REQUEST);

            Producto producto = productoService.getOne(id).orElse(null);
            if (producto == null) {
                return new ResponseEntity<>(new Mensaje("Producto no encontrado"), HttpStatus.NOT_FOUND);
            }

            // Actualizar solo los campos que no son null
            if (productoDto.getNombre() != null) producto.setNombre(productoDto.getNombre());
            if (productoDto.getPrecio() != null) producto.setPrecio(productoDto.getPrecio());
            if (productoDto.getPeso() != null) producto.setPeso(productoDto.getPeso());
            if (productoDto.getAltura() != null) producto.setAltura(productoDto.getAltura());
            if (productoDto.getAncho() != null) producto.setAncho(productoDto.getAncho());
            if (productoDto.getStock() != null) producto.setStock(productoDto.getStock());
            if (productoDto.getDescripcion() != null) producto.setDescripcion(productoDto.getDescripcion());
            if (productoDto.getFeatured() != null) producto.setFeatured(productoDto.getFeatured());
            if (productoDto.getCategoria() != null) producto.setCategoria(productoDto.getCategoria());

            // Actualizar imagen solo si se proporciona una nueva
            if (imagen != null && !imagen.isEmpty()) {
                try {
                    String imageUrl = cloudinaryService.uploadFile(imagen);
                    producto.setImagen(imageUrl);
                    System.out.println("Nueva imagen subida: " + imageUrl);
                } catch (Exception e) {
                    System.err.println("Error al subir la imagen: " + e.getMessage());
                    return new ResponseEntity<>(new Mensaje("Error al subir la imagen: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            productoService.save(producto);
            return new ResponseEntity<>(new Mensaje("Producto actualizado correctamente"), HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error al actualizar producto: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(new Mensaje("Error al actualizar el producto: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Elimina un producto existente (solo para administradores)
     * @param id ID del producto a eliminar
     * @return Mensaje de confirmación
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Mensaje> delete(@PathVariable("id") int id){
        if(!productoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("El producto a eliminar no existe"), HttpStatus.NOT_FOUND);
            
        productoService.delete(id);
        return new ResponseEntity<>(new Mensaje("Producto eliminado correctamente"), HttpStatus.OK);
    }            
}
