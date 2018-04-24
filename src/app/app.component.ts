import { Component, Injectable } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Lance } from './lance.model';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Leilão App';
  
  lances = []
  lance: Lance

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarLances()
      .subscribe(l => this.lances = l)
  } 

  enviarLancePost(lance): Observable<any> {
    const options: any = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
    }

    return this.http.post<any>('http://localhost:3000/lance', lance, options);
  }

  buscarLances(): Observable<any> {
    return this.http.get('http://localhost:3000');
  }
  
  enviarLance(valor, nome) {
    this.lance = new Lance()
    this.lance.valor = valor
    this.lance.nome = nome
    this.enviarLancePost(this.lance)
      .subscribe((resp) => {
        this.buscarLances()
          .subscribe(l => this.lances = l);
        let field: any = document.getElementById('lance');
        field.value = '';
      }, error => {
        console.log('Erro')
      });
  }
}
