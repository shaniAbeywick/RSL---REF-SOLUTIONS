function sendMail(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Disable the submit button until reCAPTCHA is verified
  document.getElementById("submitButton").disabled = true;

  // Verify reCAPTCHA response token
  var recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
      // If reCAPTCHA response token is missing, display an error message to the user
      console.error('reCAPTCHA verification failed: Response token is missing');
      // Enable the submit button
      document.getElementById("submitButton").disabled = false;
      return;
  }

  var params = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
  };

  const serviceID = "service_0gex7h6";
  const templateID = "template_o0lst6m";

  emailjs.send(serviceID, templateID, params)
      .then(res => {
          // Clear form fields
          document.getElementById("firstName").value = "";
          document.getElementById("lastName").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
          console.log(res);
          // Create a Bootstrap alert message
          var alertDiv = document.createElement("div");
          alertDiv.classList.add("alert", "alert-primary", "alert-dismissible", "fade", "show");
          alertDiv.role = "alert";
          alertDiv.innerHTML = "Your message sent successfully!";
          var closeButton = document.createElement("button");
          closeButton.type = "button";
          closeButton.classList.add("btn-close");
          closeButton.setAttribute("data-bs-dismiss", "alert");
          alertDiv.appendChild(closeButton);
          // Append the alert to the alertContainer div
          document.getElementById("alertContainer").appendChild(alertDiv);

          // Automatically remove the alert after 2 seconds
          setTimeout(function () {
              alertDiv.classList.remove("show"); // Remove the "show" class to hide the alert
              setTimeout(function () {
                  alertDiv.remove(); // Remove the alertDiv element from the DOM after hiding
              }, 1000); // Wait for 1 second before removing the element to ensure transition effect
          }, 2000); // 

          // Enable the submit button after successfully sending the email
          document.getElementById("submitButton").disabled = false;
      })
      .catch(err => {
          console.log(err);
          // Enable the submit button if an error occurs while sending the email
          document.getElementById("submitButton").disabled = false;
      });
}





