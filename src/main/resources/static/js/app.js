/*
--------------- Declaration and initialization section for UI elements, modal forms, url's for requests ---------------
 */

const usersTable = document.querySelector('.table-users');
const rolesListEdit = document.querySelector('.role-select-edit');
const rolesListDelete = document.querySelector('.role-select-delete');
const rolesListAdd = document.querySelector('.role-select-add');
const editForm = document.querySelector('.edit-form');
const deleteForm = document.querySelector('.delete-form');
const addForm = document.querySelector('.add-form');

const editID = document.querySelector('#edit_id');
const editName = document.querySelector('#edit_username');
const editPassword = document.querySelector('#edit_password');
const editFirstName = document.querySelector('#edit_first_name');
const editLastName = document.querySelector('#edit_last_name');
const editEmail = document.querySelector('#edit_email');
const editAge = document.querySelector('#edit_age');
const editRoles = document.querySelector('#edit_roles');

const deleteID = document.querySelector('#delete_id');
const deleteName = document.querySelector('#delete_username');
const deleteFirstName = document.querySelector('#delete_first_name');
const deleteLastName = document.querySelector('#delete_last_name');
const deleteEmail = document.querySelector('#delete_email');
const deleteAge = document.querySelector('#delete_age');
const deleteRoles = document.querySelector('#delete_roles');

const addName = document.querySelector('#new_username');
const addPassword = document.querySelector('#new_password');
const addFirstName = document.querySelector('#new_first_name');
const addLastName = document.querySelector('#new_last_name');
const addEmail = document.querySelector('#new_email');
const addAge = document.querySelector('#new_age');
const addRoles = document.querySelector('#new_roles');


const allUsersUrl = 'http://localhost:8080/api/users';
const allRolesUrl = 'http://localhost:8080/api/roles';
const addUserUrl = 'http://localhost:8080/api/new';
const updateUserUrl = 'http://localhost:8080/api/update';
const deleteUserUrl = 'http://localhost:8080/api/delete';

let editBtns = document.querySelectorAll(".eBtn");
let deleteBtns = document.querySelectorAll(".dBtn");

const editModal = new bootstrap.Modal(document.querySelector('#editModal'));
const deleteModal = new bootstrap.Modal(document.querySelector('#deleteModal'));

/*
--------------------- Function's declaration and creation event listeners section ------------------------------------
 */

let drawRolesList = () => {
    let generatedHTML = '';
    fetch(allRolesUrl)
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                generatedHTML += `
                <option text="${role.roleName.substring(5)}" value="${role.id}">${role.roleName.substring(5)}</option>
                `;
            })
            rolesListEdit.innerHTML = generatedHTML;
            rolesListDelete.innerHTML = generatedHTML;
            rolesListAdd.innerHTML = generatedHTML;
        })
}

let initBtnsListeners = () => {
    editBtns = document.querySelectorAll(".eBtn");
    deleteBtns = document.querySelectorAll(".dBtn");
    for (let edBtn of editBtns) {
        edBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let href = edBtn.href;
            fetch(href)
                .then(res => res.json())
                .then(user => {
                    editID.value = user.id;
                    editName.value = user.name;
                    editFirstName.value = user.firstName;
                    editLastName.value = user.lastName;
                    editEmail.value = user.email;
                    editAge.value = user.age;
                    let roles = user.roles;
                    let options = editRoles.options;
                    for (let option of options) {
                        option.selected = false;
                    }
                    for (let option of options) {
                        for (let role of roles) {
                            if (option.value.toString() === role.id.toString()) {
                                option.selected = true;
                                break;
                            }
                        }
                    }
                })

            editModal.show();
        });
    }

    for (let delBtn of deleteBtns) {
        delBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let href = delBtn.href;
            fetch(href)
                .then(res => res.json())
                .then(user => {
                    deleteID.value = user.id;
                    deleteName.value = user.name;
                    deleteFirstName.value = user.firstName;
                    deleteLastName.value = user.lastName;
                    deleteEmail.value = user.email;
                    deleteAge.value = user.age;
                    let roles = user.roles;
                    let options = deleteRoles.options;
                    for (let option of options) {
                        option.selected = false;
                    }
                    for (let option of options) {
                        for (let role of roles) {
                            if (option.value.toString() === role.id.toString()) {
                                option.selected = true;
                                break;
                            }
                        }
                    }
                })

            deleteModal.show();
        });
    }
}

let createUserRowHTML = (user) => {
    let generatedHTML = '';
    generatedHTML += `
                        <tr id = "row_user_${user.id}">
                            <td>${user.id}</td>
                            <td id = "user_${user.id}_name">${user.name}</td>
                            <td id = "user_${user.id}_first_name">${user.firstName}</td>
                            <td id = "user_${user.id}_last_name">${user.lastName}</td>
                            <td id = "user_${user.id}_email">${user.email}</td>
                            <td id = "user_${user.id}_age">${user.age}</td>
                            <td id = "user_${user.id}_roles">
                            `;
    user.roles.forEach(role => {
        generatedHTML += `
                        <span>${role.roleName.substring(5)}</span>
                               `;
    });

    generatedHTML += `            
                            </td>
                            <td>
                                <a href="api/user?id=${user.id}" class="btn btn-info text-white eBtn">Edit</a>
                            </td>
                            <td>
                                <a href="api/user?id=${user.id}" class="btn btn-danger dBtn">Delete</a>
                            </td>
                        </tr>
                        `;
    return generatedHTML
}

let drawAllUsersTable = () => {
    drawRolesList();
    let generatedHTML = '';
    fetch(allUsersUrl)
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                generatedHTML += createUserRowHTML(user)
            });
            usersTable.innerHTML = generatedHTML;
            initBtnsListeners();
        })
}

let addUserRow = (user) => {
    let generatedHTML = usersTable.innerHTML;
    generatedHTML += createUserRowHTML(user)
    usersTable.innerHTML = generatedHTML;
    initBtnsListeners();
}

let updateUserRow = (user) => {
    let nameColumn = document.querySelector('#user_' + user.id + '_name');
    let firstNameColumn = document.querySelector('#user_' + user.id + '_first_name');
    let lastNameColumn = document.querySelector('#user_' + user.id + '_last_name');
    let emailColumn = document.querySelector('#user_' + user.id + '_email');
    let ageColumn = document.querySelector('#user_' + user.id + '_age');
    let rolesColumn = document.querySelector('#user_' + user.id + '_roles');
    let rolesColumnHTML = '';

    nameColumn.innerHTML = user.name;
    firstNameColumn.innerHTML = user.firstName;
    lastNameColumn.innerHTML = user.lastName;
    emailColumn.innerHTML = user.email;
    ageColumn.innerHTML = user.age;
    user.roles.forEach(role => {
        rolesColumnHTML += `
                 <span>${role.roleName.substring(5)}</span>
                               `;
    });
    rolesColumn.innerHTML = rolesColumnHTML;
    initBtnsListeners()
}

let deleteUserRow = (user) => {
    let userRow = document.querySelector('#row_user_' + user.id);
    usersTable.removeChild(userRow)
    initBtnsListeners()
}

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let rolesArray = [];
    let user = {
        id: parseInt(editID.value),
        firstName: editFirstName.value,
        lastName: editLastName.value,
        email: editEmail.value,
        age: parseInt(editAge.value),
        name: editName.value,
        password: editPassword.value,
        roles: []
    }
    fetch(allRolesUrl)
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                for (let editRolesOption of editRoles.options) {
                    if (editRolesOption.selected && editRolesOption.value.toString() === role.id.toString()) {
                        rolesArray.push(role);
                        break;
                    }
                }
            })
            user.roles = rolesArray;

            fetch(updateUserUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    updateUserRow(data)
                })
        })
    editPassword.value=''
    editModal.hide()
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let rolesArray = []
    let user = {
        id: deleteID.value,
        firstName: deleteFirstName.value,
        lastName: deleteLastName.value,
        email: deleteEmail.value,
        age: deleteAge.value,
        name: deleteName.value,
        password: editPassword.value,
        roles: []
    }
    fetch(allRolesUrl)
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                for (let deleteRolesOption of deleteRoles.options) {
                    if (deleteRolesOption.selected && deleteRolesOption.value.toString() === role.id.toString()) {
                        rolesArray.push(role);
                        break;
                    }
                }
            })
            user.roles = rolesArray;

            fetch(deleteUserUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    deleteUserRow(user)
                })
        })
    deleteModal.hide()
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let rolesArray = [];
    let user = {
        id: 0,
        firstName: addFirstName.value,
        lastName: addLastName.value,
        email: addEmail.value,
        age: parseInt(addAge.value),
        name: addName.value,
        password: addPassword.value,
        roles: []
    }
    fetch(allRolesUrl)
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                for (let addRolesOption of addRoles.options) {
                    if (addRolesOption.selected && addRolesOption.value.toString() === role.id.toString()) {
                        rolesArray.push(role);
                        break;
                    }
                }
            })
            user.roles = rolesArray;

            fetch(addUserUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    addUserRow(data)
                })
        })
    addFirstName.value = ''
    addLastName.value = ''
    addEmail.value = ''
    addAge.value = ''
    addName.value = ''
    addPassword.value = ''
    drawRolesList()
})

/*
--------------------- Script RUN ------------------------------------
 */

drawAllUsersTable();