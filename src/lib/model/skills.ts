export interface SkillRecord {
    items:      SingleSkillItem[];
    page:       number;
    perPage:    number;
    totalItems: number;
    totalPages: number;
}

export interface SingleSkillItem     {
    category:       string;
    expand:         Expand;
    skill_icon:     string;
    skill_name:     string;
}

export interface Expand {
    category: Category;
}

export interface Category {
    collectionId:   string;
    collectionName: string;
    created:        Date;
    id:             string;
    name:           string;
    updated:        Date;
}

export type GroupedSkills = Array<{
    category: string;
    items: Array<{
      name: string;
      icon: string;
    }>;
  }>;
  