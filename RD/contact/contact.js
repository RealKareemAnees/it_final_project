document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // 2. مراقبة حدث الإرسال (Submit)
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        clearErrors();


      
        if (nameInput.value.trim() === "") {
            showError(nameInput, nameError, "Please enter your full name.");
            isValid = false;
        }

        
        const emailValue = emailInput.value.trim();
        if (emailValue === "") {
            showError(emailInput, emailError, "Email address is required.");
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
           
            showError(emailInput, emailError, "Please enter a valid email format (e.g., name@example.com).");
            isValid = false;
        }

       
        if (messageInput.value.trim() === "") {
            showError(messageInput, messageError, "Please write a message before sending.");
            isValid = false;
        }

       
        if (isValid) {
            
            alert("Success! Your message has been validated and is ready to be sent.");
            form.reset();
        }
    });

    
    function showError(inputElement, errorElement, errorMessage) {
        errorElement.textContent = errorMessage;
        inputElement.classList.add("input-error");
    }

  
    function clearErrors() {
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";

        nameInput.classList.remove("input-error");
        emailInput.classList.remove("input-error");
        messageInput.classList.remove("input-error");
    }

  
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});