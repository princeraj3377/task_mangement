


const loginForm = document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();



        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        const errorMessage =
            document.getElementById("loginError");


        errorMessage.textContent = "";



        try {

            const response = await fetch(API.LOGIN, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });


            const data = await response.json();



            if (!response.ok) {

                errorMessage.textContent =
                    data.detail || "Login failed.";

                return;
            }




            saveToken(data.token);


            console.log("Login successful");



            window.location.href = "dashboard.html";


        } catch (error) {

            console.error("Login error:", error);

            errorMessage.textContent =
                "Server se connection nahi ho pa raha.";

        }

    });
}




const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();



            const name =
                document.getElementById("name").value.trim();


            const username =
                document.getElementById("username").value.trim();


            const email =
                document.getElementById("email").value.trim();


            const password =
                document.getElementById("password").value;


            const confirmPassword =
                document.getElementById("confirmPassword").value;


            const errorMessage =
                document.getElementById("registerError");


            errorMessage.textContent = "";




            if (password !== confirmPassword) {

                errorMessage.textContent =
                    "Passwords do not match.";

                return;
            }



            try {

                const response = await fetch(API.REGISTER, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        username: username,

                        email: email,

                        password: password
                    })
                });


                const data = await response.json();



                if (!response.ok) {

                    errorMessage.textContent =
                        data.detail || "Registration failed.";

                    return;
                }



                console.log("Registration successful:", data);


                alert("Account created successfully!");


                window.location.href = "index.html";


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                errorMessage.textContent =
                    "Server se connection nahi ho pa raha.";

            }

        }
    );
}




const togglePassword =
    document.getElementById("togglePassword");


if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            const password =
                document.getElementById("password");


            if (password.type === "password") {

                password.type = "text";

            } else {

                password.type = "password";
            }

        }
    );
}




const toggleRegisterPassword =
    document.getElementById("togglePassword");


if (toggleRegisterPassword) {

    toggleRegisterPassword.addEventListener(
        "click",
        function () {

            const password =
                document.getElementById("password");


            if (password.type === "password") {

                password.type = "text";

            } else {

                password.type = "password";

            }

        }
    );
}




const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


if (toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener(
        "click",
        function () {

            const confirmPassword =
                document.getElementById("confirmPassword");


            if (confirmPassword.type === "password") {

                confirmPassword.type = "text";

            } else {

                confirmPassword.type = "password";

            }

        }
    );
}