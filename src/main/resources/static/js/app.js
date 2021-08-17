document.addEventListener('DOMContentLoaded', function() {

    const editBtns = document.querySelectorAll(".eBtn");
    const deleteBtns = document.querySelectorAll(".dBtn");

    const editModal = new bootstrap.Modal(document.querySelector('#editModal'));
    const deleteModal = new bootstrap.Modal(document.querySelector('#deleteModal'));

    let xhr = new XMLHttpRequest();


    for (let edBtn of editBtns) {
        edBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let href = edBtn.href;
            let parsedResponse;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", href, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    parsedResponse = JSON.parse(this.response);

                    document.getElementById('edit_id').value = parsedResponse.id;
                    document.getElementById('edit_username').value = parsedResponse.username;
                    document.getElementById('edit_first_name').value = parsedResponse.firstName;
                    document.getElementById('edit_last_name').value = parsedResponse.lastName;
                    document.getElementById('edit_email').value = parsedResponse.email;
                    document.getElementById('edit_age').value = parsedResponse.age;
                    let roles = parsedResponse.roles;
                    let options = document.getElementById('edit_roles').options;
                    for (let option of options) {
                        option.selected = false;
                    }
                    for (let option of options) {
                        for (let role of roles) {
                            if(option.value.toString() === role.id.toString()) {
                                option.selected = true;
                                break;
                            }
                        }
                    }
                }
            }
            xhr.send();

            editModal.show();
        });
    }

    for (let delBtn of deleteBtns) {
        delBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let href = delBtn.href;
            let parsedResponse;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", href, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    parsedResponse = JSON.parse(this.response);

                    document.getElementById('delete_id').value = parsedResponse.id;
                    document.getElementById('delete_username').value = parsedResponse.username;
                    document.getElementById('delete_first_name').value = parsedResponse.firstName;
                    document.getElementById('delete_last_name').value = parsedResponse.lastName;
                    document.getElementById('delete_email').value = parsedResponse.email;
                    document.getElementById('delete_age').value = parsedResponse.age;
                    let roles = parsedResponse.roles;
                    let options = document.getElementById('delete_roles').options;
                    for (let option of options) {
                        option.selected = false;
                    }
                    for (let option of options) {
                        for (let role of roles) {
                            if(option.value.toString() === role.id.toString()) {
                                option.selected = true;
                                break;
                            }
                        }
                    }
                }
            }
            xhr.send();

            deleteModal.show();
        });
    }

});