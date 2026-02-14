
import { requestStepUpAuth, SCOPES } from './googleAuth';

const CLASSROOM_API_BASE = 'https://classroom.googleapis.com/v1';

interface ClassroomCourse {
    id: string;
    name: string;
    section?: string;
    descriptionHeading?: string;
    description?: string;
    room?: string;
    ownerId?: string;
    creationTime?: string;
    updateTime?: string;
    enrollmentCode?: string;
    courseState?: 'ACTIVE' | 'ARCHIVED' | 'PROVISIONED' | 'DECLINED' | 'SUSPENDED';
    alternateLink?: string;
    teacherGroupEmail?: string;
    courseGroupEmail?: string;
    teacherFolder?: { id: string; title: string; alternateLink: string };
    guardiansEnabled?: boolean;
}

interface ClassroomCourseWork {
    title: string;
    description: string;
    workType: 'ASSIGNMENT' | 'SHORT_ANSWER_QUESTION' | 'MULTIPLE_CHOICE_QUESTION';
    state: 'PUBLISHED' | 'DRAFT';
}

/**
 * createCourse
 * Creates a new course in Google Classroom.
 * implicitly requests CLASSROOM_COURSES scope if needed.
 */
export const createCourse = async (courseData: { name: string; section?: string; description?: string }): Promise<ClassroomCourse> => {
    // 1. Ensure we have the token
    const token = await requestStepUpAuth([SCOPES.CLASSROOM_COURSES]);

    // 2. Make the API call
    const response = await fetch(`${CLASSROOM_API_BASE}/courses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: courseData.name,
            section: courseData.section,
            descriptionHeading: courseData.description,
            ownerId: 'me', // The authenticated user
            courseState: 'ACTIVE', // Create as active immediately
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create course: ${errorData.error.message}`);
    }

    return await response.json();
};

/**
 * createCourseWork
 * Adds an assignment/material to a course.
 */
export const createCourseWork = async (courseId: string, work: ClassroomCourseWork) => {
    const token = await requestStepUpAuth([SCOPES.CLASSROOM_COURSEWORK]);

    const response = await fetch(`${CLASSROOM_API_BASE}/courses/${courseId}/courseWork`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: work.title,
            description: work.description,
            workType: work.workType,
            state: work.state,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create coursework: ${errorData.error.message}`);
    }

    return await response.json();
}

/**
 * enrollStudent
 * Enrolls the current user in a course using the enrollment code.
 */
export const enrollStudent = async (courseId: string, enrollmentCode: string) => {
    // Requires distinct scope? usually classroom.rosters or classroom.courses might cover it, 
    // but typically "classroom.rosters" is for teachers managing students.
    // For a student finding and joining, they might need "classroom.courses" (to list) or specific enroll scope.
    // "https://www.googleapis.com/auth/classroom.rosters" is for managing rosters.
    // "https://www.googleapis.com/auth/classroom.profile.emails" etc.
    // Actually, creating a student (joining) behaves like "modifying the roster".
    // Let's try requesting ROSTERS scope.
    const token = await requestStepUpAuth([SCOPES.CLASSROOM_ROSTERS]);

    const response = await fetch(`${CLASSROOM_API_BASE}/courses/${courseId}/students`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: 'me',
            enrollmentCode: enrollmentCode
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        // If already enrolled, API might return 409 conflict, which we can treat as success.
        if (response.status === 409) {
            return { alreadyEnrolled: true };
        }
        throw new Error(`Failed to join course: ${errorData.error.message}`);
    }

    return await response.json();
}

/**
 * listCourses
 * Lists courses for the user.
 */
export const listCourses = async (): Promise<ClassroomCourse[]> => {
    const token = await requestStepUpAuth([SCOPES.CLASSROOM_COURSES]);

    const response = await fetch(`${CLASSROOM_API_BASE}/courses?courseStates=ACTIVE`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        // Silently fail or throw?
        console.error("Failed to list courses");
        return [];
    }

    const data = await response.json();
    return data.courses || [];
}
