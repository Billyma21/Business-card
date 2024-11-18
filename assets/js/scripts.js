        let linkedinQR = null;
        let websiteQR = null;
    
        function generateQRCode(element, text) {
          if (element.querySelector('.qr-code')) {
            element.querySelector('.qr-code').innerHTML = '';
          }
          return new QRCode(element.querySelector('.qr-code'), {
            text: text,
            width: 160,
            height: 160,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
            margin: 1
          });
        }
    
        function handleImageUpload(event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              const profilePicture = document.querySelector('.profile-picture');
              profilePicture.innerHTML = `<img src="${e.target.result}" alt="Photo de profil">`;
            }
            reader.readAsDataURL(file);
          }
        }
    
        function resetProfileImage() {
          const profilePicture = document.querySelector('.profile-picture');
          profilePicture.innerHTML = '<i class="fas fa-user"></i>';
        }
    
        function generateCard() {
          const name = document.getElementById('fullName').value;
          const title = document.getElementById('title').value;
          const bio = document.getElementById('bio').value;
          const linkedin = document.getElementById('linkedin').value;
          const website = document.getElementById('website').value;
    
          document.getElementById('nameDisplay').textContent = name;
          document.getElementById('titleDisplay').textContent = title;
          document.getElementById('bioDisplay').textContent = bio;
    
          // Update contact details
          document.getElementById('emailDisplay').textContent = document.getElementById('email').value;
          document.getElementById('phoneDisplay').textContent = document.getElementById('phone').value;
          document.getElementById('linkedinDisplay').textContent = document.getElementById('linkedin').value;
          document.getElementById('websiteDisplay').textContent = document.getElementById('website').value;
    
          const linkedinQRBox = document.getElementById('linkedinQRBox');
          const websiteQRBox = document.getElementById('websiteQRBox');
    
          // Handle LinkedIn QR Code
          if (linkedin && linkedin.trim() !== '') {
            linkedinQRBox.style.display = 'flex';
            linkedinQR = generateQRCode(linkedinQRBox, linkedin);
          } else {
            linkedinQRBox.style.display = 'none';
          }
    
          // Handle Website QR Code
          if (website && website.trim() !== '') {
            websiteQRBox.style.display = 'flex';
            websiteQR = generateQRCode(websiteQRBox, website);
          } else {
            websiteQRBox.style.display = 'none';
          }
        }
    
        async function downloadCard() {
          const card = document.getElementById('businessCard');
          const canvas = await html2canvas(card, {
            scale: 4,
            useCORS: true,
            backgroundColor: null,
            logging: false,
            width: card.offsetWidth,
            height: card.offsetHeight,
            removeContainer: true,
            allowTaint: true
          });
          
          const link = document.createElement('a');
          link.download = 'carte-visite.png';
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
        }
    
        function changeCardStyle(color1, color2) {
          document.documentElement.style.setProperty('--primary-color', color1);
          document.querySelector('.business-card').style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        }
    
        document.getElementById('colorPicker1').addEventListener('input', function(e) {
          document.getElementById('preview1').style.backgroundColor = e.target.value;
          const color2 = document.getElementById('colorPicker2').value;
          changeCardStyle(e.target.value, color2);
        });
    
        document.getElementById('colorPicker2').addEventListener('input', function(e) {
          document.getElementById('preview2').style.backgroundColor = e.target.value;
          const color1 = document.getElementById('colorPicker1').value;
          changeCardStyle(color1, e.target.value);
        });
    
        // Initialize card on load
        generateCard();
    