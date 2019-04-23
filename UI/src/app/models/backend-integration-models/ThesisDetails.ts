import { ThesisCommentDetails } from "./ThesisCommentDetails";

export interface ThesisDetails{
    thesisName: string;
    stateName: string;
    lastActionDate: Date;
    defenseGrade: string;
    studyGrade: string;
    thesisGrade: string;
    graduateFile: number;
    promoterFile: number;
    comments: Array<ThesisCommentDetails>
}