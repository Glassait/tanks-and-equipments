import { GradeEnum } from '../enums/grade.enum';

export class CheckGrade {
    /**
     * Checks if the given grade is an admin grade
     * @param grade The grade to check
     * @returns Whether the given grade is an admin grade
     */
    public static isAdmin(grade: GradeEnum | string | undefined): boolean {
        if (!grade) {
            return false;
        }

        return [GradeEnum.COMMANDER, GradeEnum.EXECUTIVE_OFFICER].includes(grade as GradeEnum);
    }
}
