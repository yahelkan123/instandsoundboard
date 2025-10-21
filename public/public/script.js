const buttonsDiv = document.getElementById('buttons');
const uploadForm = document.getElementById('uploadForm');
const soundFileInput = document.getElementById('soundFile');

// Functie om buttons te maken
async function loadSounds() {
  const res = await fetch('/sounds');
  const sounds = await res.json();

  buttonsDiv.innerHTML = '';
  sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.textContent = sound.split('/').pop();
    btn.onclick = () => new Audio(sound).play();
    buttonsDiv.appendChild(btn);
  });
}

// Upload geluid
uploadForm.addEventListener('submit', async e => {
  e.preventDefault();
  const file = soundFileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('sound', file);

  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.success) {
    alert('Geluid geüpload!');
    loadSounds();
  }
});

// Initial load
loadSounds();
