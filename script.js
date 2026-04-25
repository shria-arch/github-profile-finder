async function getProfile() {
    const username = document.getElementById("username").value;
    const profileDiv = document.getElementById("profile");

    if (username === "") {
        profileDiv.innerHTML = "<p>Please enter a username</p>";
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        profileDiv.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}">
                <h2>${data.name || data.login}</h2>
                <p>${data.bio || "No bio available"}</p>
                <p>Followers: ${data.followers}</p>
                <p>Repositories: ${data.public_repos}</p>
                <a href="${data.html_url}" target="_blank">View Profile</a>
            </div>
        `;

    } catch (error) {
        profileDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}