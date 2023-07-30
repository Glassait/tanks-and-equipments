import { GradeEnum } from '../enums/grade.enum';

export class CheckGrade {
    public static isAdmin(grade: GradeEnum | string | undefined) {
        if (!grade) {
            return false;
        }

        return [
            GradeEnum.COMBAT_OFFICER,
            GradeEnum.COMMANDER,
            GradeEnum.EXECUTIVE_OFFICER,
            GradeEnum.INTELLIGENCE_OFFICER,
            GradeEnum.PERSONNEL_OFFICER,
            GradeEnum.RECRUITMENT_OFFICER,
        ].includes(grade as GradeEnum);
    }
}
