const careerForm = document.getElementById("careerForm");

if (careerForm) {
    const formStatus = document.getElementById("formStatus");
    const submitBtn = careerForm.querySelector("button[type='submit']");
    const nameInput = careerForm.querySelector("input[name='name']");
    const resumeMailto = document.getElementById("resumeMailto");

    // Personalize the "email resume" link with the applicant's name once they type it
    if (nameInput && resumeMailto) {
        nameInput.addEventListener("input", () => {
            const name = nameInput.value.trim();
            const subject = encodeURIComponent("Job Application - Resume" + (name ? ` (${name})` : ""));
            const body = encodeURIComponent(
                `Hi,\n\nPlease find my resume attached.\n\n${name ? "- " + name : ""}`
            );
            resumeMailto.href = `mailto:majorfinishings@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    careerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        formStatus.textContent = "";
        formStatus.className = "form-status";

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
            const response = await fetch(careerForm.action, {
                method: "POST",
                body: new FormData(careerForm),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks! Your application has been sent. Don't forget to email us your resume.";
                formStatus.classList.add("success");
                careerForm.reset();
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
