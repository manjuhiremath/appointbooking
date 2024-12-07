const form = document.getElementById('userForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const name = document.getElementById('name').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const email = document.getElementById('email').value;
    const userData = {
        name,
        phoneNo,
        email,
    };
    try {
        const response = await axios.post('http://localhost:8080/add-user', userData);
        alert('User added successfully!');
        console.log('Response:', response.data);
        form.reset();
    } catch (error) {
        alert('Failed to add user');
        console.error('Error:', error.message);
    }
});
