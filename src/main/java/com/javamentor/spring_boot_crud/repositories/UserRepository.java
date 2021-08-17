package com.javamentor.spring_boot_crud.repositories;

import com.javamentor.spring_boot_crud.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String userName);
}
