let educationCount = 1;
let experienceCount = 1;

document.getElementById("cv-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;

  document.getElementById("cv-title").textContent = `${firstName} ${lastName}`;
  document.getElementById("output-first-name").textContent = firstName;
  document.getElementById("output-last-name").textContent = lastName;
  document.getElementById("output-nationality").textContent =
    document.getElementById("nationality").value;
  document.getElementById("output-marital-status").textContent =
    document.getElementById("marital-status").value;
  document.getElementById("output-birthdate").textContent =
    document.getElementById("birthdate").value;
  document.getElementById("output-age").textContent = calculateAge(
    new Date(document.getElementById("birthdate").value)
  );
  document.getElementById("output-dni").textContent =
    document.getElementById("dni").value;
  document.getElementById("output-cuit").textContent =
    document.getElementById("cuit").value;
  document.getElementById("output-address").textContent =
    document.getElementById("address").value;
  document.getElementById("output-postal-code").textContent =
    document.getElementById("postal-code").value;
  document.getElementById("output-email").textContent =
    document.getElementById("email").value;
  document.getElementById("output-phone").textContent =
    document.getElementById("phone").value;
  document.getElementById("output-license").textContent =
    document.getElementById("license").value;

  const experienceOutput = document.getElementById("output-experience");
  experienceOutput.innerHTML = "<p class='experience-title'><strong>Experiencia Laboral:</strong></p>";
  for (let i = 1; i <= experienceCount; i++) {
    const period = document.getElementById(`experience-period-${i}`).value;
    const job = document.getElementById(`experience-job-${i}`).value;
    const tasks = document.getElementById(`experience-tasks-${i}`).value;
    const phone = document.getElementById(`experience-phone-${i}`).value;
    const experienceHtml = `<p class='experience-content'><span class='bold-text'>${job}</span>(${period}): ${tasks}. Tel: ${phone}</p>`;
    experienceOutput.innerHTML += experienceHtml;
  }

  const educationOutput = document.getElementById("output-education");
  educationOutput.innerHTML = "<p class='education-title'><strong>Educación:</strong></p>";
  for (let i = 1; i <= educationCount; i++) {
    const type = document.getElementById(`education-type-${i}`).value;
    const period = document.getElementById(`education-period-${i}`).value;
    const title = document.getElementById(`education-title-${i}`).value;
    const educationHtml = `<p class='education-content'><span class='bold-text'>${type}: ${title} </span>(${period})</p>`;
    educationOutput.innerHTML += educationHtml;
  }

  const photoInput = document.getElementById("photo");
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const outputPhoto = document.getElementById("output-photo");
      outputPhoto.src = e.target.result;
      outputPhoto.style.width = "150px";
      outputPhoto.style.height = "150px";
      outputPhoto.style.objectFit = "cover";
      outputPhoto.style.borderRadius = "50%";
      outputPhoto.style.border = "1px solid #dee2e6";
      outputPhoto.style.margin = "0 auto";
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

  doc.setFont("Nunito");
  doc.setFontSize(24);
  doc.text(`${firstName} ${lastName}`, 10, 10);

  doc.setFontSize(12);
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
    `Código Postal: ${document.getElementById("postal-code").value}`,
    10,
    100
  );
  doc.text(
    `Correo Electrónico: ${document.getElementById("email").value}`,
    10,
    110
  );
  doc.text(`Teléfono: ${document.getElementById("phone").value}`, 10, 120);
  doc.text(
    `Estado Civil: ${document.getElementById("marital-status").value}`,
    10,
    130
  );

  let y = 140;
  for (let i = 1; i <= experienceCount; i++) {
    const period = document.getElementById(`experience-period-${i}`).value;
    const job = document.getElementById(`experience-job-${i}`).value;
    const tasks = document.getElementById(`experience-tasks-${i}`).value;
    const phone = document.getElementById(`experience-phone-${i}`).value;
    doc.text(
      `Experiencia ${i}: ${job} (${period}). Tareas: ${tasks}. Tel: ${phone}`,
      10,
      y
    );
    y += 10;
  }

  for (let i = 1; i <= educationCount; i++) {
    const type = document.getElementById(`education-type-${i}`).value;
    const period = document.getElementById(`education-period-${i}`).value;
    const title = document.getElementById(`education-title-${i}`).value;
    doc.text(`Educación ${i}: ${type}, ${title} (${period})`, 10, y);
    y += 10;
  }

  doc.text(
    `Posee Licencia de Conducir: ${document.getElementById("license").value}`,
    10,
    y
  );

  const photo = document.getElementById("output-photo");
  if (photo.src) {
    doc.addImage(photo.src, "JPEG", 10, y + 10, 50, 50);
  }

  doc.save(fileName);
});

document
  .getElementById("add-experience")
  .addEventListener("click", function () {
    experienceCount++;
    const experienceFields = document.getElementById("experience-fields");
    const newField = document.createElement("div");
    newField.classList.add("experience-field");
    newField.innerHTML = `
        <div class="form-group">
            <label for="experience-period-${experienceCount}">Período</label>
            <input type="text" class="form-control" id="experience-period-${experienceCount}" required>
        </div>
        <div class="form-group">
            <label for="experience-job-${experienceCount}">Nombre del Trabajo</label>
            <input type="text" class="form-control" id="experience-job-${experienceCount}" required>
        </div>
        <div class="form-group">
            <label for="experience-tasks-${experienceCount}">Tareas Realizadas</label>
            <textarea class="form-control" id="experience-tasks-${experienceCount}" rows="3" required></textarea>
        </div>
        <div class="form-group">
            <label for="experience-phone-${experienceCount}">Teléfono del Empleo</label>
            <input type="tel" class="form-control" id="experience-phone-${experienceCount}" required>
        </div>
    `;
    experienceFields.appendChild(newField);
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
