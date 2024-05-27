import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-closest-word',
  templateUrl: './closest-word.component.html',
  styleUrls: ['./closest-word.component.scss']
})
export class ClosestWordComponent implements OnInit {
  inputWordControl = new FormControl('');
  suggestion: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.inputWordControl.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms after each keystroke
        distinctUntilChanged(), // Only send request if the value has changed
        switchMap((inputWord: string) => this.fetchSuggestions(inputWord)),
        catchError(error => {
          console.error('Error fetching suggestions:', error);
          return throwError('Failed to fetch suggestions. Please try again.');
        })
      )
      .subscribe((suggestions: string[]) => {
        console.log(suggestions);
        this.suggestion = suggestions;
        console.log(this.suggestion)
      });
  }

  fetchSuggestions(inputWord: string) {
    if (inputWord.trim() !== '') { // Check if inputWord is not empty after trimming whitespace
      return this.http.post<string[]>('http://127.0.0.1:5000/get_suggestions', { input_word: inputWord })
        .pipe(
          catchError(error => {
            console.error('Error fetching suggestions:', error);
            return throwError('Failed to fetch suggestions. Please try again.');
          })
        );
    } else {
      // Return an observable with an empty array if inputWord is empty
      return [];
    }
  }


  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
