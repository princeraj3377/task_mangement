



if (!isLoggedIn()) {

    window.location.href = "index.html";

}




async function loadUserInfo() {

    try {

        const response = await fetch(API.IS_AUTH, {

            method: "GET",

            headers: getAuthHeaders()

        });


        if (!response.ok) {

            removeToken();

            window.location.href = "index.html";

            return;
        }


        const data = await response.json();

        console.log("User information:", data);



        const username =
            data.username ||
            data.user?.username ||
            "User";


        const userNameElement =
            document.getElementById("userName");

        const welcomeNameElement =
            document.getElementById("welcomeName");


        if (userNameElement) {

            userNameElement.textContent = username;

        }


        if (welcomeNameElement) {

            welcomeNameElement.textContent = username;

        }


        const avatar =
            document.querySelector(".user-avatar");


        if (avatar && username) {

            avatar.textContent =
                username.charAt(0).toUpperCase();

        }


    } catch (error) {

        console.error(
            "User information error:",
            error
        );

    }

}




const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            removeToken();


            window.location.href = "index.html";

        }
    );

}




loadUserInfo();