package com.javamentor.spring_boot_crud.controllers;

import com.javamentor.spring_boot_crud.models.Role;
import com.javamentor.spring_boot_crud.models.User;
import com.javamentor.spring_boot_crud.services.RoleService;
import com.javamentor.spring_boot_crud.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class UsersRestController {

    private final UserService userService;
    private final RoleService roleService;

    public UsersRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.getAll();
    }

    @GetMapping("/user")
    public User getUser(int id) {
        return userService.get(id);
    }

    @PostMapping("/new")
    public User createUser(@RequestBody User user) {
        return userService.add(user);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestBody User user) {
        userService.delete(user);
        return ResponseEntity.ok().build();
    }
}