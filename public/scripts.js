document.addEventListener('DOMContentLoaded', () => {
    const itemsTableBody = document.getElementById('itemsTableBody');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemModal = document.getElementById('itemModal');
    const closeBtn = document.querySelector('.close-btn');
    const itemForm = document.getElementById('itemForm');
    const modalTitle = document.getElementById('modalTitle');
    const itemIdInput = document.getElementById('itemId');

    const API_URL = '/api/items';

    async function fetchItems() {
        const response = await fetch(API_URL);
        const items = await response.json();
        itemsTableBody.innerHTML = items.map(item => `
            <tr>
                <td>
                    <button class="edit-btn" data-id="${item.id}">Edit</button>
                    <button class="delete-btn" data-id="${item.id}">Delete</button>
                </td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.affiliation}</td>
                <td>${item.other_names}</td>
                <td>${item.species}</td>
                <td>${item.homeland}</td>
                <td>${item.comments}</td>
            </tr>
        `).join('');
    }


    function showModal(title, item = {}) {
        modalTitle.textContent = title;
        itemIdInput.value = item.id || ''; 
        itemForm.name.value = item.name || '';
        itemForm.affiliation.value = item.affiliation || '';
        itemForm.other_names.value = item.other_names || '';
        itemForm.species.value = item.species || '';
        itemForm.homeland.value = item.homeland || '';
        itemForm.comments.value = item.comments || '';
        itemModal.classList.remove('hidden');
    }

    function hideModal() {
        itemModal.classList.add('hidden');
    }

    itemForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = itemIdInput.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        const formData = {
            name: itemForm.name.value,
            affiliation: itemForm.affiliation.value,
            other_names: itemForm.other_names.value,
            species: itemForm.species.value,
            homeland: itemForm.homeland.value,
            comments: itemForm.comments.value,
        };

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        hideModal();
        fetchItems();
    });

    itemsTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            fetch(`${API_URL}/${id}`)
                .then(response => response.json())
                .then(item => {
                    console.log('Item to edit:', item);
                    showModal('Edit Item', item);
                })
                .catch(error => console.error('Error fetching item:', error));
        }
    });

    itemsTableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchItems();
        }
    });

    addItemBtn.addEventListener('click', () => showModal('Add Item'));

    closeBtn.addEventListener('click', hideModal);

    fetchItems();
});
