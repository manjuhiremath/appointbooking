let isEdit = false;
let currentId = null;

async function getAll() {
    axios.get("http://localhost:3000/users")
        .then((response) => {
            // console.log(response.data);
            const users = response.data;
            const userDiv = document.getElementById("users-list");
            let tableView = users
                .map((user) => {
                    return `
              <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.phoneNo}</td>
                <td>${user.email}</td>
                <td><button onclick="handleEdit(${user.id})">Edit</button></td>
                <td><button onclick="deleteAppointment(${user.id})">Delete</button></td>
              </tr>
            `;
                })
                .join("");
            userDiv.innerHTML = tableView;
        })
        .catch((error) => {
            console.error("There was an error fetching the users:", error);
        });
}

getAll();
async function handleUser() {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phoneNo = document.getElementById("phoneNo").value;
    const email = document.getElementById("email").value;
    try {
        if (!isEdit) {
            await axios.post("http://localhost:3000/users", { name, phoneNo, email });
        } else {
            await axios.put(`http://localhost:3000/users/${currentId}`, { name, phoneNo, email });
            isEdit = false;
        }
        document.getElementById('submit').textContent = "Submit";
        resetForm();
        await getAll();
    } catch (err) {
        console.log(err);
    }
}

async function handleEdit(id) {
    try {
        const response = await axios.get(`http://localhost:3000/users/${id}`)
        const user = response.data;
        document.getElementById('name').value = user.name;
        document.getElementById('phoneNo').value = user.phoneNo;
        document.getElementById('email').value = user.email;
        currentId = user.id;
        isEdit = true;
        console.log(currentId)
        document.getElementById('submit').textContent = "Update User";
    } catch (err) {
        console.log(err)
    }
}

async function deleteAppointment(id) {
    try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        await getAll();
    } catch (err) {
        console.log(err);
    }

}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('phoneNo').value = '';
    document.getElementById('email').value = '';
    document.getElementById('submit').textContent = "Submit";  // Reset button text to "Submit"
    isEdit = false;
    currentId = null;
}