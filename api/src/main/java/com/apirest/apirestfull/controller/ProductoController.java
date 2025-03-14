package com.apirest.apirestfull.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
     * @param productoDto Información del producto actualizado
     * @param imagen Imagen del producto
     * @return Mensaje de confirmación
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Mensaje> update(
            @PathVariable("id") int id,
            @RequestPart("producto") ProductoDto productoDto,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen) {
        
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
        producto.setNombre(productoDto.getNombre());
        producto.setPrecio(productoDto.getPrecio());
        producto.setPeso(productoDto.getPeso());
        producto.setAltura(productoDto.getAltura());
        producto.setAncho(productoDto.getAncho());
        producto.setStock(productoDto.getStock());
        producto.setDescripcion(productoDto.getDescripcion());
        producto.setFeatured(productoDto.getFeatured());
        producto.setCategoria(productoDto.getCategoria());

        // Actualizar imagen si se proporciona una nueva
        if (imagen != null && !imagen.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(imagen);
            producto.setImagen(imageUrl);
        }

        productoService.create(producto);
        return new ResponseEntity<>(new Mensaje("Producto actualizado correctamente"), HttpStatus.OK);
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
