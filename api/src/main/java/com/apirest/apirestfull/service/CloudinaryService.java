package com.apirest.apirestfull.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @SuppressWarnings("unchecked")
    public String uploadFile(MultipartFile file) {
        try {
            File uploadedFile = convertMultiPartToFile(file);
            Map<String, Object> params = new HashMap<>();
            params.put("folder", "productos"); // Carpeta en Cloudinary donde se guardarán las imágenes
            Map<String, Object> uploadResult = cloudinary.uploader().upload(uploadedFile, params);
            uploadedFile.delete(); // Eliminar el archivo temporal
            return (String) uploadResult.get("url");
        } catch (Exception e) {
            throw new RuntimeException("Error al subir archivo a Cloudinary: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar archivo de Cloudinary: " + e.getMessage(), e);
        }
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
