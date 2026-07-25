package com.lifestyleai.repository;

import com.lifestyleai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmailAndIsActiveTrue(String email);
	
	Optional<User> findByIdAndIsActiveTrue(Long id);
	
	List<User> findByIsActiveTrue();
    
    boolean existsByEmail(String email);

}