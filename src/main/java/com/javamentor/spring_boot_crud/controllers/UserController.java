package com.javamentor.spring_boot_crud.controllers;

import com.javamentor.spring_boot_crud.models.User;
import com.javamentor.spring_boot_crud.services.RoleService;
import com.javamentor.spring_boot_crud.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/")
    public String printWelcome(@ModelAttribute("user") User user, Principal principal, ModelMap model) {
        if (principal != null) {
            model.addAttribute("currentUser", userService.getByName(principal.getName()));
        }
        model.addAttribute("usersList", userService.getAll());
        model.addAttribute("rolesList", roleService.getAll());
        return "index";
    }


}