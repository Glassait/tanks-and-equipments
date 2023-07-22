import { GradeEnum } from '../enum/grade.enum';

export class CheckGrade {
    public static isAdmin(grade: GradeEnum) {
        return [
            GradeEnum.COMBAT_OFFICER,
            GradeEnum.COMMANDER,
            GradeEnum.EXECUTIVE_OFFICER,
            GradeEnum.INTELLIGENCE_OFFICER,
            GradeEnum.PERSONNEL_OFFICER,
            GradeEnum.RECRUITMENT_OFFICER,
        ].includes(grade);
    }
}
