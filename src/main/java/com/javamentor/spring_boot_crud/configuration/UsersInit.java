package com.javamentor.spring_boot_crud.configuration;

import com.javamentor.spring_boot_crud.models.Role;
import com.javamentor.spring_boot_crud.models.User;
import com.javamentor.spring_boot_crud.services.RoleServiceImpl;
import com.javamentor.spring_boot_crud.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class UsersInit {

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private RoleServiceImpl roleService;


    @PostConstruct
    private void loadTestUsers() {

        Role adminRole = new Role();
        adminRole.setRoleName("ADMIN");
        adminRole.setDescription("Allow user's and roles administration");
        roleService.add(adminRole);
        Role userRole = new Role();
        userRole.setRoleName("USER");
        userRole.setDescription("Simply user");
        roleService.add(userRole);

        Set<Role> roles = new HashSet<>();
        User userAdmin = new User("Alex", "Johnes", "a.jonhes@gmail.com", (byte) 35, "a.johnes", "Q123456y");
        roles.add(userRole);
        roles.add(adminRole);
        userAdmin.setRoles(roles);
        userService.add(userAdmin);

        roles.clear();
        User user1 = new User("Bill", "Ward", "b.ward@gmail.com", (byte) 32, "b.ward", "Qwerty123");
        roles.add(userRole);
        user1.setRoles(roles);
        userService.add(user1);

        roles.clear();
        User user2 = new User("Jack", "Black", "j.black@gmail.com", (byte) 27, "j.black", "Qwerty123");
        roles.add(userRole);
        user2.setRoles(roles);
        userService.add(user2);

        roles.clear();
        User user3 = new User("Ashley", "Jackson", "a.jackson@gmail.com", (byte) 25, "a.jackson", "Qwerty123");
        roles.add(userRole);
        roles.add(adminRole);
        user3.setRoles(roles);
        userService.add(user3);
    }
}