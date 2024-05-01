import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-closest-word',
  templateUrl: './closest-word.component.html',
  styleUrls: ['./closest-word.component.scss']
})
export class ClosestWordComponent {
  inputWord: string = '';
  closestWord: string = '';

  constructor(private http: HttpClient) { }

  async getClosestWord() {
    try {
      const response: any = await this.http.post('http://127.0.0.1:5000/get_closest_word', { input_word: this.inputWord }).toPromise();
      this.closestWord = response.closest_word || 'No closest word found';
    } catch (error) {
      console.error('Error fetching closest word:', error);
    }
  }
}
