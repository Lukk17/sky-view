import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private RECEIVED_MESSAGES_URL = AuthService.BASIC_ADDRESS + "/message/received";
  private SENT_MESSAGES_URL = AuthService.BASIC_ADDRESS + "/message/sent";
  private SEND_MESSAGE_URL = AuthService.BASIC_ADDRESS + "/message/send";

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.error.error.message);
  }

  private static handleResponse(respData: Message[]) {
    const messages: Message[] = [];
    for (const key in respData) {
      messages.push(respData[key])
    }
    console.log(messages);
    return messages;
  }

  private static buildOffer(messageForm: NgForm) {
    return new Message(
      messageForm.value.text,
      messageForm.value.receiver,
    );

  }

  getReceived() {
    return this.http.get(this.RECEIVED_MESSAGES_URL,
      {
        headers: this.auth.getAuthHeader()
      }).pipe(
      catchError(MessageService.handleError),
      tap(MessageService.handleResponse)
    );
  }

  getSent() {
    return this.http.get(this.SENT_MESSAGES_URL,
      {
        headers: this.auth.getAuthHeader()
      }).pipe(
      catchError(MessageService.handleError),
      tap(MessageService.handleResponse)
    );
  }

  sentMessage(messageForm: NgForm) {
    const message = MessageService.buildOffer(messageForm);
    return this.http.post(this.SEND_MESSAGE_URL,
      message,
      {
        headers: this.auth.getAuthHeader()
      })
  }
}

export class Message {

  "id": number;
  "text": string;
  "receiverEmail": string;
  "senderEmail": string;
  "createdTime": string;
  "read": boolean;

  constructor(text: string, receiverEmail: string) {
    this.text = text;
    this.receiverEmail = receiverEmail;
  }
}
