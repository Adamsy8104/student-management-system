// ======================================
// STUDENT MANAGEMENT SYSTEM
// ======================================


// ======================================
// STUDENT DATA
// ======================================

let students = [];


// ======================================
// GET HTML ELEMENTS
// ======================================

const form = document.getElementById("studentForm");

const nameInput = document.getElementById("name");

const departmentInput =
    document.getElementById("department");

const levelInput =
    document.getElementById("level");

const studentList =
    document.getElementById("studentList");

const searchInput =
    document.getElementById("search");

const levelFilter =
    document.getElementById("levelFilter");


// ======================================
// LOAD SAVED STUDENTS
// ======================================

const savedStudents =
    localStorage.getItem("students");

if (savedStudents) {

    try {

        students = JSON.parse(savedStudents);

        // Make sure saved data is actually an array
        if (!Array.isArray(students)) {
            students = [];
        }

    } catch (error) {

        console.error(
            "Error loading students:",
            error
        );

        students = [];
    }
}


// ======================================
// DISPLAY STUDENTS ON PAGE LOAD
// ======================================

displayStudents();


// ======================================
// ADD STUDENT
// ======================================

form.addEventListener("submit", (event) => {

    event.preventDefault();


    // Get values
    const name =
        nameInput.value.trim();

    const department =
        departmentInput.value.trim();

    const level =
        Number(levelInput.value);


    // ==================================
    // VALIDATION
    // ==================================

    if (name === "") {

        alert("Student name is required.");

        return;
    }


    if (department === "") {

        alert("Department is required.");

        return;
    }


    if (![100, 200, 300, 400].includes(level)) {

        alert(
            "Level must be 100, 200, 300 or 400."
        );

        return;
    }


    // ==================================
    // CHECK DUPLICATE STUDENT
    // ==================================

    const exists = students.some(
        (student) =>
            student.name.toLowerCase() ===
            name.toLowerCase()
    );


    if (exists) {

        alert("Student already exists.");

        return;
    }


    // ==================================
    // CREATE STUDENT
    // ==================================

    const student = {

        id: Date.now(),

        name: name,

        department: department,

        level: level

    };


    // ==================================
    // ADD TO ARRAY
    // ==================================

    students.push(student);


    // ==================================
    // SAVE TO LOCAL STORAGE
    // ==================================

    saveStudents();


    // ==================================
    // DISPLAY
    // ==================================

    displayStudents();


    // ==================================
    // CLEAR FORM
    // ==================================

    form.reset();

});


// ======================================
// SAVE STUDENTS
// ======================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ======================================
// DISPLAY STUDENTS
// ======================================

function displayStudents() {

    studentList.innerHTML = "";


    // No students
    if (students.length === 0) {

        studentList.innerHTML = `
            <p class="empty">
                No students registered yet.
            </p>
        `;

        return;
    }


    // Display every student
    students.forEach((student) => {

        const card =
            document.createElement("div");


        // Add CSS class
        card.className = "student-card";


        card.innerHTML = `

            <h3>${student.name}</h3>

            <p>
                <strong>Department:</strong>
                ${student.department}
            </p>

            <p>
                <strong>Level:</strong>
                ${student.level}
            </p>

            <button
                onclick="editStudent(${student.id})"
            >
                ✏️ Edit
            </button>

            <button
                onclick="deleteStudent(${student.id})"
            >
                🗑️ Delete
            </button>

        `;


        studentList.appendChild(card);

    });

}


// ======================================
// DELETE STUDENT
// ======================================

function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    students = students.filter(
        (student) =>
            student.id !== id
    );


    saveStudents();


    displayStudents();

}


// ======================================
// EDIT STUDENT
// ======================================

function editStudent(id) {

    const student =
        students.find(
            (student) =>
                student.id === id
        );


    if (!student) {

        alert("Student not found.");

        return;
    }


    // ==================================
    // NEW NAME
    // ==================================

    const newName =
        prompt(
            "Enter student name:",
            student.name
        );


    if (newName === null) {
        return;
    }


    const name =
        newName.trim();


    if (name === "") {

        alert("Name cannot be empty.");

        return;
    }


    // ==================================
    // NEW DEPARTMENT
    // ==================================

    const newDepartment =
        prompt(
            "Enter department:",
            student.department
        );


    if (newDepartment === null) {
        return;
    }


    const department =
        newDepartment.trim();


    if (department === "") {

        alert(
            "Department cannot be empty."
        );

        return;
    }


    // ==================================
    // NEW LEVEL
    // ==================================

    const newLevel =
        prompt(
            "Enter level (100, 200, 300 or 400):",
            student.level
        );


    if (newLevel === null) {
        return;
    }


    const level =
        Number(newLevel);


    if (![100, 200, 300, 400].includes(level)) {

        alert(
            "Level must be 100, 200, 300 or 400."
        );

        return;
    }


    // ==================================
    // CHECK DUPLICATE NAME
    // ==================================

    const duplicate =
        students.some(
            (otherStudent) =>
                otherStudent.id !== id &&
                otherStudent.name.toLowerCase() ===
                name.toLowerCase()
        );


    if (duplicate) {

        alert(
            "Another student with this name already exists."
        );

        return;
    }


    // ==================================
    // UPDATE STUDENT
    // ==================================

    student.name = name;

    student.department = department;

    student.level = level;


    // ==================================
    // SAVE
    // ==================================

    saveStudents();


    // ==================================
    // DISPLAY
    // ==================================

    displayStudents();

}


// ======================================
// SEARCH STUDENTS
// ======================================

searchInput.addEventListener(
    "input",
    () => {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        // If search is empty
        if (searchText === "") {

            displayStudents();

            return;
        }


        const filteredStudents =
            students.filter(
                (student) =>

                    student.name
                        .toLowerCase()
                        .includes(searchText)

            );


        displayFilteredStudents(
            filteredStudents
        );

    }
);


// ======================================
// DISPLAY FILTERED STUDENTS
// ======================================

function displayFilteredStudents(list) {

    studentList.innerHTML = "";


    // No results
    if (list.length === 0) {

        studentList.innerHTML = `
            <p class="empty">
                No matching students found.
            </p>
        `;

        return;
    }


    list.forEach((student) => {

        const card =
            document.createElement("div");


        card.className =
            "student-card";


        card.innerHTML = `

            <h3>${student.name}</h3>

            <p>
                <strong>Department:</strong>
                ${student.department}
            </p>

            <p>
                <strong>Level:</strong>
                ${student.level}
            </p>

            <button
                onclick="editStudent(${student.id})"
            >
                ✏️ Edit
            </button>

            <button
                onclick="deleteStudent(${student.id})"
            >
                🗑️ Delete
            </button>

        `;


        studentList.appendChild(card);

    });

}


// ======================================
// LEVEL FILTER
// ======================================

levelFilter.addEventListener(
    "change",
    () => {

        const selectedLevel =
            levelFilter.value;


        // Show all
        if (selectedLevel === "all") {

            displayStudents();

            return;
        }


        const filteredStudents =
            students.filter(
                (student) =>
                    student.level ===
                    Number(selectedLevel)
            );


        displayFilteredStudents(
            filteredStudents
        );

    }
);