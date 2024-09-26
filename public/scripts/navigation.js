// public/scripts/navigation.js
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('submit-bug-feedback').addEventListener('click', function (event) {
		event.preventDefault();
		openBugFeedbackModal();
	});
});

function openBugFeedbackModal() {
	// Ensure the modal element exists
	const modal = document.getElementById('bug-feedback-modal');
	if (modal) {
		modal.style.display = 'block';
	} else {
		console.error('Bug feedback modal not found');
	}
}
