// Simulating an asynchronous data retrieval system

// Helper function to simulate delay and random failure
function fetchData(name, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail && Math.random() < 0.3) {  // 30% chance of failure
                reject(`❌ Failed to fetch ${name}`);
            } else {
                resolve(`✅ ${name} data retrieved`);
            }
        }, delay);
    });
}

// Fetch user profile
function fetchUserProfile() {
    return fetchData("User Profile", 1000);
}

// Fetch user posts
function fetchUserPosts() {
    return fetchData("User Posts", 1500);
}

// Fetch comments
function fetchComments() {
    return fetchData("Comments", 1200, true);  // Random failure enabled
}

// Display messages in the output div
function displayMessage(message) {
    const outputDiv = document.getElementById("output");
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    outputDiv.appendChild(messageElement);
}

// Clear previous output
function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

// Sequential fetching
async function fetchSequentially() {
    clearOutput();
    displayMessage("Fetching data sequentially...");

    try {
        const user = await fetchUserProfile();
        displayMessage(user);

        const posts = await fetchUserPosts();
        displayMessage(posts);

        const comments = await fetchComments();
        displayMessage(comments);

        displayMessage("✅ All data fetched successfully (Sequential)");
    } catch (error) {
        displayMessage(error);
    }
}

// Parallel fetching
async function fetchInParallel() {
    clearOutput();
    displayMessage("Fetching data in parallel...");

    try {
        const [user, posts, comments] = await Promise.all([
            fetchUserProfile(),
            fetchUserPosts(),
            fetchComments()
        ]);

        displayMessage(user);
        displayMessage(posts);
        displayMessage(comments);

        displayMessage("✅ All data fetched successfully (Parallel)");
    } catch (error) {
        displayMessage(error);
    }
}

// Primary function chaining async functions
async function getUserContent() {
    clearOutput();
    displayMessage("Starting getUserContent...");

    try {
        const user = await fetchUserProfile();
        displayMessage(user);

        const posts = await fetchUserPosts();
        displayMessage(posts);

        const comments = await fetchComments();
        displayMessage(comments);

        displayMessage("✅ Final output: All user content retrieved successfully!");
    } catch (error) {
        displayMessage(error);
    }
}

// Event listeners for buttons
document.getElementById("fetchSequential").addEventListener("click", fetchSequentially);
document.getElementById("fetchParallel").addEventListener("click", fetchInParallel);
document.getElementById("fetchUserContent").addEventListener("click", getUserContent);