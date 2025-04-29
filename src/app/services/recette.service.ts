import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recette } from '../recette.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl= 'http://localhost:3000/recettes';
  constructor(private http : HttpClient){}

  getRecettes(): Observable<Recette[]>{
    return this.http.get<Recette[]>(this.apiUrl);
  }

  getRecette(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.apiUrl}/${id}`);
  }

  createRecette(recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(this.apiUrl, recette);
  }

  updateRecette(id: number, recette: Recette): Observable<Recette> {
    return this.http.put<Recette>(`${this.apiUrl}/${id}`, recette);
  }

  deleteRecette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
