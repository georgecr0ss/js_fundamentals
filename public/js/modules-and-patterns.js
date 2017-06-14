const regex = {
    whiteSpaces: /(^\s+)|(\s+$)/gi,
    consecutiveSpaces: /\b\s{2,}\b/gi,
    hasCapitalLettersOrNoCharSymbols: /[A-Z\W\d]/g
}
const courseTree = {
    title: 'JS advanced',
    presentations: [
        {
            name: "Structures and algorithms",
            homeworkSubmissions: []
        }
    ],
    students: {
        '1245848': {
            firstname: "Pesho",
            lastname: "Peshev"
        }
    }
}

const TelerickAcademyCOurse = (function() {
    const course = {
        studentsById: {},
        studentIds:[],
        submitHomeworks: {},
        homeworkIds: [],
        examResults:[],
        examsById: [],
    };
    const studentsById = [];
    const homeworkSubmissions = [];

    const handleErrors = error => {
        throw Error(error)
    }

    const checkTitle = title => {
        const hasWhiteSpaces = !!title.match(regex.whiteSpaces);

        if (!!title.match(regex.whiteSpaces)) {
            handleErrors('White space are not allowed either on start and end of the strign');
        }

        if (!!title.match(regex.consecutiveSpaces)) {
            handleErrors('Consecutive Spaces are not allowed');
        }

        if (title.length < 1) {
            handleErrors('TItle should be at least 1 char');
        }
    }

    const init = (name, presentations) => {
        try {
            if (presentations.length === 0) {
                handleErrors('presentation cannot be an empty array');
            }

            const newArray = presentations.map(p => p);
            newArray.unshift(name);
            presentations.forEach(el => checkTitle(el));

            course.name = name;
            course.presentations = presentations.map((presentaion,i) => {
                course.homeworkIds.push(i);
                course.submitHomeworks[i] = [];

                return presentaion;
            });

        } catch (error) {
            console.log(error);
        }
    }

    const checkChars = (char, error) => {

    }

    const nameValidation = name => {
        if (name[0] !== name[0].toUpperCase()) {
            handleErrors('Name should start with capital letter');
        }

        const subStr = name.substring(1, name.length -1);

        if (regex.hasCapitalLettersOrNoCharSymbols.test(subStr)) {
            handleErrors('Name can contain only chars and non capital letters');
        }
    }
    let count = 1;
    const addStudent = name => {
        const names = name.split(/\s+/);

        names.forEach(name => {
            nameValidation(name);
        });

        const newStudent = {
            firstname: names[0],
            lastname: names[1],
        };
        const { studentIds, studentsById } = course;
        const studetnId = count++;

        studentIds.push(studetnId);
        studentsById[studetnId] = newStudent;

    }


    const submitHomework = (studentID, homeworkID) => {
        const { submitHomeworks, studentsById, homeworkIds } = course;

        if(homeworkIds.indexOf(homeworkID) === -1) {
            handleErrors('Invalid homeworkID');
        }

        if (studentsById[studentID] ===  undefined) {
            handleErrors('Invalid studentID');
        }

        submitHomeworks[homeworkID].push(studentID);

    }

    const getAllStudents = () => {
        const { studentsById, studentIds } = course;

        return studentIds.map(id => {
            const {[id]: studentById} = studentsById;

            return {
                firstname: studentById.firstname,
                lastname: studentById.lastname,
                id
            };
        })
    }

    const pushExamResults = data => {
        data.forEach(el => {
            if (examsById.indexOf(el.studentId) === -1) {
                examsById.push(el.studentId)
                course.examResults.push(el);
            } else {
                const {firstname, lastname} = course.studentsById[el.studentId];
                handleErrors(`Student: ${firstname} ${lastname} is cheating`);
            }
        })
    }

    return {
        init,
        addStudent,
        getAllStudents,
        submitHomework,
        studetnIds: course.studentIds
    }
})();

const students = [
    "Misho Pesa",
    "Ivancho Zmiicharow",
    "Pencho Penchev",
    "Ivancho Muhov",
    "Misho Pesa",
    "Ivancho Zmiicharow",
    "Pencho Penchev",
    "Ivancho Muhov",
    "Misho Pesa",
    "Ivancho Zmiicharow",
    "Pencho Penchev",
    "Ivancho Muhov",
    "Misho Pesa",
    "Ivancho Zmiicharow",
    "Pencho Penchev",
    "Ivancho Muhov",
    "Misho Pesa",
    "Ivancho Zmiicharow",
    "Pencho Penchev",
    "Ivancho Muhov"
];

const presentations = [
	'Modules and Patterns',
	'Ofresult, this is a valid title!',
	'No errors hIr.',
	'Moar taitles',
	'Businessmen arrested for harassment of rockers',
	'Miners handed cabbages to the delight of children',
	'Dealer stole Moskvitch',
	'Shepherds huddle',
	'Retired Officers rally',
	'Moulds detonate tunnel',
	'sailors furious',
];

const courseName = "Structures and algorithms";

const {
    init,
    addStudent,
    getAllStudents,
    submitHomework
} = TelerickAcademyCOurse;

// adding new course  init(name, presentations);
init(courseName, presentations);

students.forEach(student => {
    addStudent(student);
});

console.log(getAllStudents());

// submitHomework()