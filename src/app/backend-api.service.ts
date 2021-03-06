import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface SessionId{
  status: number;
  session_id: string;
}

export interface ImageId{
  status: number;
  image_id: string;
}

export interface ImageIds{
  status: number;
  image_ids: string[];
}

export interface ModelSolution{
  image_id: string;
  model_solution: string;
}


export interface Approval{
  status: number;
}

export interface Prediction{
  status: number;
  image_id: string;
  model_solution: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  constructor(private httpClient: HttpClient) { }
  private serverURL: string = "https://7f0e168462e5.ngrok.io";
  

  async requestSession(): Promise<string> {
    // сюда приходит 0 параметров
    return new Promise<string>((resolve, reject) => {
      this.httpClient.post<SessionId>(this.serverURL, {type: "session_begin"}).subscribe(data => resolve(data.session_id));
    });
  }

  async requestImageIds(session_id): Promise<string[]> {
    // сюда приходит 1 параметр - id сессии
    return new Promise<string[]>((resolve, reject) => {
      const body = {
        session_id: session_id,
        type: "get_image_list"
      }
      this.httpClient.post<ImageIds>(this.serverURL, body).subscribe(data => resolve(data.image_ids));
    });
  }

  async uploadDatasetImage(session_id, image): Promise<string> {
    // сюда приходит 2 параметра - id сессии и картинка, сериализованную как base64 (string)
    return new Promise<string>((resolve, reject) => {
      this.httpClient.post<ImageId>(this.serverURL, {
        session_id: session_id,
        type: "upload_data",
        image: image
    }).subscribe(data => resolve(data.image_id))
    });
  }

  async RequestDatasetImagesFromYandex(session_id, search_request, count): Promise<string[]> {
    // сюда приходит 3 параметра - id сессии, целевой запрос для поиска и количество изображений для парсинга.
    return new Promise<string[]>((resolve, reject) => {
      const body = {
        session_id: session_id,
        type: "parse_data_yandex",
        search_request: search_request,
        count: count
      }
      this.httpClient.post<ImageIds>(this.serverURL, body).subscribe(data => resolve(data.image_ids))
    });
  }

  async removeImage(session_id, image_id): Promise<string> {
    // сюда приходит 2 параметра - id сессии и id картинки, которую необходимо удалить
    return new Promise<null>((resolve, reject) => {
      this.httpClient.post<null>(this.serverURL, {
        session_id: session_id,
        type: "remove_image",
        image_id: image_id
    }).subscribe(() => resolve())
    });
  }

  async startTraining(session_id, class_name): Promise<string> {
    // сюда приходит 2 параметра - id сессии и имя класса, указанное пользователю
    return new Promise<null>((resolve, reject) => {
      this.httpClient.post<null>(this.serverURL, {
        session_id: session_id,
        type: "start_training",
        class_name: class_name
    }).subscribe(() => resolve())
    });
  }

  async RequestTestImageFromYandex(session_id, search_request): Promise<string[]> {
    // сюда приходит  параметра - id сессии и целевой запрос поиска для парсинга.
    return new Promise<any>((resolve, reject) => {
      const body = {
        session_id: session_id,
        type: "parse_test_yandex",
        search_request: search_request,
      }
      this.httpClient.post<ImageIds>(this.serverURL, body).subscribe(data => resolve(data));
    });
  }

}
