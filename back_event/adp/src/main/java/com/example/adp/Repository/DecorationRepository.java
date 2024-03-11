package com.example.adp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adp.Model.Decorations;

@Repository
public interface DecorationRepository extends JpaRepository<Decorations, Long> {

}
