import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams }
	from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SQLResultSet {
	result: Array<Array<string>>;
}

export interface NewMessage {
	message: string;
	last_msg_id: number;
}

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	constructor(private httpClient: HttpClient) {}


	getMessages(chatId: string) {

		return this.httpClient.get('/chat/${chatId}')
			.pipe(catchError(this.handleError));
	}


	getContactsInfo() {

		return this.httpClient.get<SQLResultSet>('/contacts')
			.pipe(catchError(this.handleError));
	}


	sendMessage(msg: string, chatName: string) {

		const body = new HttpParams()
			.set('chat', chatName)
			.set('content', msg);

		return this.httpClient.post('/chat/${chatName}/send-message', body, {
			headers: new HttpHeaders()
				.set('Content-Type', 'application/x-www-form-urlencoded'),
			responseType: 'text' as const
		})
			.pipe(catchError(this.handleError));
	}


	/**
	 * Error handler function
	 */
	handleError(err: HttpErrorResponse) {

		if (err.status === 0) {
			// A client-side or network error occured.
			console.error('Error:', err.error);

		} else if (err.status !== 200) {
			console.error(`Server responded with ${err.status}\nbody: ${err.error}`)

		} else {
			console.error(`Server responded with ${err.status}
body: ${err.error.text}\n${err.error.error.stack}`);
		}

		return throwError('Something bad happened');
	}
}
