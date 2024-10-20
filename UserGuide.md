# User Guide for additional NodeBB Features

## Introduction
This document provides an outline of the new features implemented in the NodeBB platform. The following functionalities have been added to enhance user experience for both instructors and students:

1. Marking answers as "Instructor-Approved."
2. Sharing posts anonymously.
3. Displaying estimated reading time for each post.

## Feature 1: Marking Answers as "Instructor-Approved"

### Description
Instructors can now mark specific answers as "Instructor-Approved." This feature helps students easily identify which responses are accurate and verified by their instructors.

### How to Use
1. **For Instructors:**
   - Navigate to the post containing the answers.
   - Hover over the answer you want to approve.
   - toggle on the **"Mark as Approved"** button that appears.
   - The answer will now be highlighted, indicating that it has been approved by an instructor.

2. **For Students:**
   - Look for answers marked with the "Instructor-Approved" label.
   - Engage with these answers confidently, knowing they are verified.

### Testing
Automated tests for this feature are located in the `tests/instructorApproval.test.js` file. The tests cover:
- Approval of an answer by an instructor.
- Verification that approved answers are highlighted appropriately.

---

## Feature 2: Sharing Posts Anonymously

### Description
Students can now share posts anonymously, allowing them to ask questions or share information without revealing their identities. This feature promotes a more open and peaceful discussion environment.

### How to Use
1. **For Students:**
   - When creating a new post, check the **"Post Anonymously"** option. you can choose to be anonymous to all, none or your students.
   - Submit your post as usual. Your identity will remain hidden from other users.

### Testing
Automated tests for this feature can be found in the `tests/anonymity.test.js` file. The tests validate:
- Successful submission of an anonymous post.
- Proper display of anonymous posts without revealing the user’s identity.

---

## Feature 3: Estimated Reading Time for Posts

### Description
Each post now includes an estimated reading time, helping students decide whether they have sufficient time to read the content before engaging.

### How to Use
1. **For Students:**
   - When viewing a post, look for the estimated reading time displayed at the top right of the post.
   - Use this information to gauge if you can read the content within your available time.
   - This implementation can be seen when you click on discussion and then click on the post. Within the post, you can see the estimated reading time for each of the posts.

### Testing
Automated tests for this feature are located in the `tests/readingTime.test.js` file. The tests ensure:
- Accurate calculation of estimated reading time based on the post's word count.
- Proper display of reading time in the post view.

---

## Conclusion
These new features aim to enhance the overall experience for instructors and students on the NodeBB platform. By providing verified answers, allowing anonymous discussions, and indicating reading times, we hope to foster a more effective and supportive learning environment.
