import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Course, CourseInfoApiResponse, CourseListApiResponse } from "../../../shared/types/courses.mjs"
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Courses {

  private httpService = inject(HttpClient)
  readonly baseUrl = environment.baseUrl
  readonly courseList: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([])

  constructor() {
    this.getCourses()
  }

  getCourses() {
    const token = `${localStorage.getItem("token")}`
    this.httpService.get<CourseListApiResponse>(`${this.baseUrl}/course/`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).subscribe({
      next: (res) => {
        this.courseList.next(res.data.results)
      }
    })
  }

  getCourseInfo(id: string) {
    const token = `${localStorage.getItem("token")}`
    return this.httpService.get<CourseInfoApiResponse>(`${this.baseUrl}/course/${id}/`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
  }
}
