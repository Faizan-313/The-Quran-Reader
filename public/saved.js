function savesurah(){
    fetch('/savedSurah/save', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'} , body: JSON.stringify(data) // Convert data to JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        const bookmarkIcon = document.getElementById('bookmark-icons');
        bookmarkIcon.innerHTML = `
            <div class="bookmark-icon" id="added"  onclick="alreadySaved()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 850 850" width="24px" fill="#020710">
                <path d="M713-600 600-713l56-57 57 57 141-142 57 57-198 198ZM200-120v-640q0-33 23.5-56.5T280-840h280q-20 30-30 57.5T520-720q0 72 45.5 127T680-524q23 3 40 3t40-3v404L480-240 200-120Z"/></svg>
            </div>`;
    })
    .catch(error => {
    alert('Failed to save  bookmark.');
    });
}


function alreadySaved(){
    fetch('/savedSurah/removeBookmark',{
        method: 'delete',
        headers: {'Content-type': 'application/json'}, body: JSON.stringify(data)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Network reponse was not ok');
        }
    })
    .then(data =>{
        const bookmarkIcon = document.getElementById('bookmark-icons');
        bookmarkIcon.innerHTML = `                
            <div class="bookmark-icon" id="Not-added"  onclick="savesurah()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 850 850" width="24px" fill="#e6f7ff">
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg>              </div>`;
    })
    .catch(error=>{
        alert('Failed to remove from saved');
    });
}