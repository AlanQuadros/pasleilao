import { Component, Injectable } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Leilão App';
  
  lances = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarLances()
      .subscribe(l => this.lances = l)
  } 

  enviarLancePost(lance): Observable<any> {
    const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
    }

    return this.http.post<any>('http://localhost:3000/lance', lance);
  }

  buscarLances(): Observable<any> {
    return this.http.get('http://localhost:3000');
  }
  
  enviarLance(valor, nome) {
    this.enviarLancePost({ valor: valor, nome: nome })
      .subscribe((resp) => {
        this.buscarLances()
          .subscribe(l => this.lances = l);
        document.getElementById('lance').value = '';
      }, error => {
        console.log('Erro')
      });
  }
}
