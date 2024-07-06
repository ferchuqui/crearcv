let educationCount = 1;

document.getElementById("cv-form").addEventListener("submit", function (event) {
  event.preventDefault();

  document.getElementById("output-first-name").textContent =
    document.getElementById("first-name").value;
  document.getElementById("output-last-name").textContent =
    document.getElementById("last-name").value;
  document.getElementById("output-dni").textContent =
    document.getElementById("dni").value;
  document.getElementById("output-cuit").textContent =
    document.getElementById("cuit").value;
  document.getElementById("output-birthdate").textContent =
    document.getElementById("birthdate").value;
  document.getElementById("output-age").textContent = calculateAge(
    new Date(document.getElementById("birthdate").value)
  );
  document.getElementById("output-gender").textContent =
    document.getElementById("gender").value;
  document.getElementById("output-address").textContent =
    document.getElementById("address").value;
  document.getElementById("output-email").textContent =
    document.getElementById("email").value;
  document.getElementById("output-phone").textContent =
    document.getElementById("phone").value;
  document.getElementById("output-marital-status").textContent =
    document.getElementById("marital-status").value;
  document.getElementById("output-experience").textContent =
    document.getElementById("experience").value;
  document.getElementById("output-license").textContent =
    document.getElementById("license").value;

  const educationOutput = document.getElementById("output-education");
  educationOutput.innerHTML = "<p><strong>Educación:</strong></p>";
  for (let i = 1; i <= educationCount; i++) {
    const type = document.getElementById(`education-type-${i}`).value;
    const period = document.getElementById(`education-period-${i}`).value;
    const title = document.getElementById(`education-title-${i}`).value;
    const educationHtml = `<p>${type}: ${title} (${period})</p>`;
    educationOutput.innerHTML += educationHtml;
  }

  const photoInput = document.getElementById("photo");
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("output-photo").src = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  document.getElementById("cv-output").classList.remove("d-none");
});

document.getElementById("print-cv").addEventListener("click", function () {
  window.print();
});

document.getElementById("save-html").addEventListener("click", function () {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const fileName = `${firstName}_${lastName}_cvauto.html`;

  const cvContent = document.getElementById("cv-output").innerHTML;
  const blob = new Blob([cvContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
});

document.getElementById("save-pdf").addEventListener("click", function () {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const fileName = `${firstName}_${lastName}_cvauto.pdf`;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Curriculum Vitae", 10, 10);
  doc.text(`Nombre: ${firstName}`, 10, 20);
  doc.text(`Apellido: ${lastName}`, 10, 30);
  doc.text(`DNI: ${document.getElementById("dni").value}`, 10, 40);
  doc.text(`CUIT: ${document.getElementById("cuit").value}`, 10, 50);
  doc.text(
    `Fecha de Nacimiento: ${document.getElementById("birthdate").value}`,
    10,
    60
  );
  doc.text(
    `Edad: ${document.getElementById("output-age").textContent}`,
    10,
    70
  );
  doc.text(`Sexo: ${document.getElementById("gender").value}`, 10, 80);
  doc.text(`Domicilio: ${document.getElementById("address").value}`, 10, 90);
  doc.text(
    `Correo Electrónico: ${document.getElementById("email").value}`,
    10,
    100
  );
  doc.text(`Teléfono: ${document.getElementById("phone").value}`, 10, 110);
  doc.text(
    `Estado Civil: ${document.getElementById("marital-status").value}`,
    10,
    120
  );
  doc.text(
    `Experiencia Laboral: ${document.getElementById("experience").value}`,
    10,
    130
  );

  let educationY = 140;
  for (let i = 1; i <= educationCount; i++) {
    const type = document.getElementById(`education-type-${i}`).value;
    const period = document.getElementById(`education-period-${i}`).value;
    const title = document.getElementById(`education-title-${i}`).value;
    doc.text(`Educación ${i}: ${type}, ${title} (${period})`, 10, educationY);
    educationY += 10;
  }

  doc.text(
    `Posee Licencia de Conducir: ${document.getElementById("license").value}`,
    10,
    educationY
  );

  const photo = document.getElementById("output-photo");
  if (photo.src) {
    doc.addImage(photo.src, "JPEG", 10, educationY + 10, 50, 50);
  }

  doc.save(fileName);
});

document.getElementById("add-education").addEventListener("click", function () {
  educationCount++;
  const educationFields = document.getElementById("education-fields");
  const newField = document.createElement("div");
  newField.classList.add("education-field");
  newField.innerHTML = `
        <div class="form-group">
            <label for="education-type-${educationCount}">Tipo</label>
            <select class="form-control" id="education-type-${educationCount}" required>
                <option value="" disabled selected>Seleccione el tipo de educación</option>
                <option value="Secundario">Secundario</option>
                <option value="Terciario">Terciario</option>
                <option value="Universitario">Universitario</option>
                <option value="Curso Particular">Curso Particular</option>
            </select>
        </div>
        <div class="form-group">
            <label for="education-period-${educationCount}">Período</label>
            <input type="text" class="form-control" id="education-period-${educationCount}" required>
        </div>
        <div class="form-group">
            <label for="education-title-${educationCount}">Título Logrado</label>
            <input type="text" class="form-control" id="education-title-${educationCount}" required>
        </div>
    `;
  educationFields.appendChild(newField);
});

function calculateAge(birthdate) {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  return age;
}
