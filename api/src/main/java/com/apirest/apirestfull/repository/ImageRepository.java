package com.apirest.apirestfull.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apirest.apirestfull.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

}
