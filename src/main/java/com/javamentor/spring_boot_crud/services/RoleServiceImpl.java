package com.javamentor.spring_boot_crud.services;

import com.javamentor.spring_boot_crud.models.Role;
import com.javamentor.spring_boot_crud.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void add(Role role) {
        List<Role> roles = getAll();
        if (!roles.contains(role)) {
            if (role.getRoleName().length() < 5 || !role.getRoleName().substring(0, 5).equals("ROLE_")) {
                role.setRoleName("ROLE_" + role.getRoleName());
            }
            roleRepository.save(role);
        }
    }

    @Override
    public Role get(int id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public Role getByRoleName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public void update(int id, Role role) {
        if (role.getRoleName().length() < 5 || !role.getRoleName().substring(0, 5).equals("ROLE_")) {
            role.setRoleName("ROLE_" + role.getRoleName());
        }
        roleRepository.save(role);
    }

    @Override
    public void delete(int id) {
        roleRepository.delete(get(id));
    }
}
