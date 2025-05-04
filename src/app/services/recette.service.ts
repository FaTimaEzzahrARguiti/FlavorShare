import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recette } from '../recette.model';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:3000/recettes'; // Base URL

  constructor(private http: HttpClient) {}    

  getRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.apiUrl);
  }

  createRecette(recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(this.apiUrl, recette);
  }

  getRecette(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.apiUrl}/${id}`)
  }

  updateRecette(id: number, recette: Recette): Observable<Recette> {
    return this.http.put<Recette>(`${this.apiUrl}/${id}`, recette);
  }

  deleteRecette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
