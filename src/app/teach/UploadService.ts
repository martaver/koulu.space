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

      console.log('appending file: ', filename, blob);
      formData.append("person_selfie", blob, filename);
      formData.append("person_name", name);
      formData.append("person_email", email);
      formData.append("person_topic", topic);

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
      xhr.send(formData);
    });
  }
}
