import { GradeEnum } from '../enums/grade.enum';

export class CheckGrade {
    public static isAdmin(grade: GradeEnum | string | undefined): boolean {
        if (!grade) {
            return false;
        }

        return [GradeEnum.COMBAT_OFFICER, GradeEnum.COMMANDER, GradeEnum.EXECUTIVE_OFFICER].includes(grade as GradeEnum);
    }
}
