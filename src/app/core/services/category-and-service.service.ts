import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class CategoryAndMaterialService { 

  readonly baseUrl = environment.baseUrl;
  readonly categoryUrl = this.baseUrl+"categories";
  readonly materialUrl = this.baseUrl+"materials";
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.materialUrl);
  }

  getCategoriesByProductId(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryUrl}/${id}`);
  }

  getMaterialsByProductId(id: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.materialUrl}/${id}`);
  }


  addCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, data);
  }

  addMaterial(data: Material): Observable<Material> {
    return this.http.post<Material>(this.materialUrl, data);
  }

}
