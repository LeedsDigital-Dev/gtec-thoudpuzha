export interface CourseListItem {
  code: string;
  name: string;
}

export interface CourseListBlock {
  type: "course_list";
  heading: string;
  items: CourseListItem[];
}

export interface BenefitsItem {
  textEn: string;
  textMl?: string;
}

export interface BenefitsBlock {
  type: "benefits";
  heading?: string;
  items: BenefitsItem[];
}

export type CourseContentBlock = CourseListBlock | BenefitsBlock;

export interface CourseContent {
  heroTaglineEn?: string;
  heroTaglineMl?: string;
  overviewEn?: string;
  overviewMl?: string;
  detailedContentEn?: string;
  detailedContentMl?: string;
  detailedContentImageUrl?: string;
  courseLists: CourseListBlock[];
  benefits?: BenefitsBlock;
}
