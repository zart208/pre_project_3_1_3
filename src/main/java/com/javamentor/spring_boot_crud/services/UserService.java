package com.javamentor.spring_boot_crud.services;

import com.javamentor.spring_boot_crud.models.User;

import java.util.List;

public interface UserService {
    void add(User user);

    User get(long id);

    List<User> getAll();

    void update(User user);

    void delete(User user);

    User getByName(String name);
}
