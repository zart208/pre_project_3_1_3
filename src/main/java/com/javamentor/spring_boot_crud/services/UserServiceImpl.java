package com.javamentor.spring_boot_crud.services;

import com.javamentor.spring_boot_crud.models.User;
import com.javamentor.spring_boot_crud.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User add(User user) {
        if (getByName(user.getUsername()) == null) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public User get(long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User update(User user) {
        if (user.getPassword() == "" || user.getPassword() == null) {
            user.setPassword(get(user.getId()).getPassword());
        } else {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public User getByName(String name) {
        return userRepository.findByName(name);
    }
}
