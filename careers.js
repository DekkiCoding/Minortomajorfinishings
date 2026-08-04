const careerForm = document.getElementById("careerForm");

if (careerForm) {
    const fileInput = document.getElementById("resume");
    const fileLabel = document.querySelector(".file-upload-label");
    const fileText = document.getElementById("fileUploadText");
    const fileError = document.getElementById("fileError");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = careerForm.querySelector("button[type='submit']");

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED = [".pdf", ".doc", ".docx"];

    fileInput.addEventListener("change", () => {
        fileError.textContent = "";
        const file = fileInput.files[0];

        if (!file) {
            fileText.textContent = "Click to upload your resume";
            fileLabel.classList.remove("file-selected");
            return;
        }

        const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

        if (!ALLOWED.includes(ext)) {
            fileError.textContent = "Please upload a PDF, DOC, or DOCX file.";
            fileInput.value = "";
            fileText.textContent = "Click to upload your resume";
            fileLabel.classList.remove("file-selected");
            return;
        }

        if (file.size > MAX_SIZE) {
            fileError.textContent = "That file is too large. Max size is 10MB.";
            fileInput.value = "";
            fileText.textContent = "Click to upload your resume";
            fileLabel.classList.remove("file-selected");
            return;
        }

        fileText.textContent = file.name;
        fileLabel.classList.add("file-selected");
    });

    careerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        formStatus.textContent = "";
        formStatus.className = "form-status";

        if (!fileInput.files[0]) {
            fileError.textContent = "Please attach your resume.";
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
            const response = await fetch(careerForm.action, {
                method: "POST",
                body: new FormData(careerForm),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks! Your application has been sent.";
                formStatus.classList.add("success");
                careerForm.reset();
                fileText.textContent = "Click to upload your resume";
                fileLabel.classList.remove("file-selected");
            } else {
                const data = await response.json().catch(() => null);
                const msg = data && data.errors
                    ? data.errors.map(er => er.message).join(", ")
                    : "Something went wrong. Please try again or email us directly.";
                formStatus.textContent = msg;
                formStatus.classList.add("error");
            }
        } catch (err) {
            formStatus.textContent = "Network error. Please try again or email us directly.";
            formStatus.classList.add("error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Application";
        }
    });
}
