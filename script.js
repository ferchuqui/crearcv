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
    const experienceHtml = `<p class='experience-content'><span class='bold-text'>${job}</span>(${period}): <br/> ${tasks}. Tel: ${phone}</p>`;
    experienceOutput.innerHTML += experienceHtml;
  }

  const educationOutput = document.getElementById("output-education");
  educationOutput.innerHTML = "<p class='education-title'><strong>Educación:</strong></p>";
  for (let i = 1; i <= educationCount; i++) {
    const type = document.getElementById(`education-type-${i}`).value;
    const period = document.getElementById(`education-period-${i}`).value;
    const title = document.getElementById(`education-title-${i}`).value;
    const educationHtml = `<p class='education-content'><span class='bold-text'>${type}: <br/> ${title} </span>(${period})</p>`;
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
  const name = document.getElementById("cv-title").innerText;
  console.log(document.getElementById("cv-title"), document.getElementById("cv-title").innerText);
  const cvOutput = document.getElementById("cv-output").innerHTML;
  const styles = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    `;
  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write(`
    <html>
      <head>
        <title>${name}.pdf</title>
        ${styles}
      </head>
      <body >
        ${cvOutput}
      </div>
    </html>
    `);
  printWindow.document.getElementById("buttons").style.display = "none";
  printWindow.print();
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
