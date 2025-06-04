export interface EducationData {
    items:      EducationDataItem[];
    page:       number;
    perPage:    number;
    totalItems: number;
    totalPages: number;
}

export interface EducationDataItem {
    city:           string;
    collectionId:   string;
    collectionName: string;
    created:        Date;
    from:           Date;
    id:             string;
    institute:      string;
    title:          string;
    to:             Date;
    updated:        Date;
    userid:         string;
}
