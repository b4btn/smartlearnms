export interface Course {
  "uid": string;
  "course_thumbnail": string;
  "course_documents": [],
  "is_course_owner": boolean;
  "course_reviews": [],
  "average_rating": number;
  "lecture_count": number;
  "is_bookmarked": boolean;
  "course_name": string;
  "course_author": string;
  "course_language": string;
  "course_duration": number;
  "course_price": null,
  "course_offer_price": null,
  "course_currency": null,
  "course_description": string;
  "is_published": boolean;
  "course_published_date": null,
  "course_created_date": string;
  "course_updated_date": string;
  "is_public": boolean;
  "user": {
    "uid": string;
    "phone_number": string;
    "gender": number;
    "date_of_birth": string;
    "profession": string;
    "profile_image": null,
    "is_active": boolean;
    "created_date": string;
    "updated_date": string;
    "calendar_consent": boolean;
    "is_email_verified": boolean;
    "otp_hash": string;
    "otp_created_at": string;
    "user": number;
    "role": number;
    "nationality": number;
    "address": null,
    "categories": number[]
  },
  "course_category": {
    "id": number;
    "category_name": string;
    "category_description": string;
    "created_date": string;
    "updated_date": string;
  },
  "course_subcategory": null
}

export interface CourseListApiResponse {
  status: string;
  code: number;
  data: {
    count: number;
    next: null;
    previous: null;
    results: Course[]
  }
  message: string
}

export interface CourseInfoApiResponse {
  status: string;
  code: number;
  data: Course;
  message: string
}
