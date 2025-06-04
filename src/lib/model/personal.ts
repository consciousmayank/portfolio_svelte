export interface PersonalData {
    items:      PersonalDataItem[];
    page:       number;
    perPage:    number;
    totalItems: number;
    totalPages: number;
}

export interface PersonalDataItem {
    about_me:          string[];
    address:           string;
    avatar:            string;
    collectionId:      string;
    collectionName:    string;
    created:           Date;
    email_id:          string;
    expand:            Expand;
    id:                string;
    name:              string;
    one_liner:         string;
    phone_number:      string;
    soceial_media:     string[];
    typewrite_options: string[];
    updated:           Date;
    userid:            string;
}

export interface Expand {
    soceial_media: SoceialMedia[];
    userid:        Userid;
}

export interface SoceialMedia {
    collectionId:   string;
    collectionName: string;
    created:        Date;
    id:             string;
    name:           string;
    link:           string;
    updated:        Date;
}

export interface Userid {
    avatar:          string;
    collectionId:    string;
    collectionName:  string;
    created:         Date;
    email:           string;
    emailVisibility: boolean;
    id:              string;
    name:            string;
    updated:         Date;
    verified:        boolean;
}
