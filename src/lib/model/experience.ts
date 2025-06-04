export interface ExperienceRecord {
    items:      ExperienceRecordItem[];
    page:       number;
    perPage:    number;
    totalItems: number;
    totalPages: number;
}

export interface ExperienceRecordItem {
    collectionId:     string;
    collectionName:   string;
    company:          string;
    created:          Date;
    description:      string;
    from:             Date;
    id:               string;
    position:         string;
    skills_developed: string[];
    to:               Date;
    updated:          Date;
    userid:           string;
}
