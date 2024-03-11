package com.example.adp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adp.Model.Venue;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    
}
