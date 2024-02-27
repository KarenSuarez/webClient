function showRegistrationForm() {
  document.getElementById("registration-form").style.display = "block";
  document.getElementById("cars-list").style.display = "none";
  document.getElementById("removal-form").style.display = "none";
}

function showCarsList() {
  document.getElementById("registration-form").style.display = "none";
  document.getElementById("cars-list").style.display = "block";
  document.getElementById("removal-form").style.display = "none";
}

function showRemovalForm() {
  document.getElementById("registration-form").style.display = "none";
  document.getElementById("cars-list").style.display = "none";
  document.getElementById("removal-form").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const formData = new FormData(registrationForm);
    const requestData = {
      name: formData.get("name"),
      license_plate: formData.get("placa"),
      color: formData.get("ColorCar"),
    };

    fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Mostrar mensaje de éxito
        registrationForm.reset(); // Reiniciar el formulario
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again."); // Mostrar mensaje de error
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Función para obtener y mostrar la lista de carros
  function fetchCarsList() {
    fetch("http://localhost:3000/cars") // Reemplaza con la URL correcta de tu servidor
      .then((response) => response.json())
      .then((data) => {
        const carsTableBody = document.getElementById("cars-table-body");
        carsTableBody.innerHTML = ""; // Limpiar el cuerpo de la tabla antes de agregar filas

        data.forEach((car) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${car.name}</td>
                <td>${car.license_plate}</td>
                <td>${car.color}</td>
                <td>${car.timestamp}</td>
            `;
          carsTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "An error occurred while fetching the car list. Please try again."
        ); // Mostrar mensaje de error
      });
  }

  // Llamar a fetchCarsList cuando la página se cargue
  fetchCarsList();
});

document.addEventListener("DOMContentLoaded", function () {
  const removalForm = document.getElementById("removal-form");

  // Evento para manejar el envío del formulario de eliminación
  removalForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const formData = new FormData(removalForm);
    const licensePlate = formData.get("license-plate");

    fetch("http://localhost:3000/cars", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ license_plate: licensePlate }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Mostrar mensaje de éxito
        fetchCarsList(); // Actualizar la lista de carros después de eliminar uno
        removalForm.reset(); // Reiniciar el formulario
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while removing the car. Please try again."); // Mostrar mensaje de error
      });
  });
});
