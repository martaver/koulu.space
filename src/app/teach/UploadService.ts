import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UploadService {

  constructor () {

  }

  public makeBlobRequest (url: string, name: string, email: string, topic: string, blob: Blob, filename: string): Observable<any> {
    return Observable.create(observer => {
      let formData: FormData = new FormData();
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append("blob", blob, filename);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('response', xhr.response);
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('person_name', name);
      xhr.setRequestHeader('person_email', email);
      xhr.setRequestHeader('person_topic', topic);
      xhr.send(formData);
    });
  }
}
